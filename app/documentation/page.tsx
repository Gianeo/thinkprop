import fs from 'node:fs'
import path from 'node:path'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Block =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'heading3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'code'; lines: string[] }

type DocSection = {
  id: string
  title: string
  content: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function stripNumericPrefix(value: string) {
  return value.replace(/^\d+\.\s+/, '').trim()
}

function parseSections(markdown: string): DocSection[] {
  const chunks = markdown.split(/^##\s+/gm)
  return chunks
    .slice(1)
    .map((chunk) => {
      const [titleLine, ...rest] = chunk.split('\n')
      const title = titleLine.trim()
      const cleanTitle = stripNumericPrefix(title)
      return {
        id: slugify(cleanTitle),
        title: cleanTitle,
        content: rest.join('\n').trim(),
      }
    })
}

function parseTableRows(lines: string[]) {
  return lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'))
    .map((line) => line.slice(1, -1).split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.length > 0)
}

function parseBlocks(content: string): Block[] {
  const lines = content.split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line || line === '---') {
      i += 1
      continue
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i += 1
      }
      i += 1
      blocks.push({ type: 'code', lines: codeLines })
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'heading3', text: line.replace(/^###\s+/, '').trim() })
      i += 1
      continue
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i += 1
      }
      const rows = parseTableRows(tableLines)
      const cleaned = rows.filter((row) => !row.every((cell) => /^-+$/.test(cell.replace(/:/g, ''))))
      blocks.push({ type: 'table', rows: cleaned })
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    const paragraphLines: string[] = []
    while (i < lines.length) {
      const current = lines[i].trim()
      if (!current || current.startsWith('|') || current.startsWith('- ') || current.startsWith('```') || current === '---') {
        break
      }
      paragraphLines.push(lines[i])
      i += 1
    }
    blocks.push({ type: 'paragraph', lines: paragraphLines })
  }

  return blocks
}

function renderInline(text: string) {
  const strongRegex = /\*\*(.*?)\*\*/g
  const parts: Array<string | { strong: string }> = []
  let lastIndex = 0
  let match: RegExpExecArray | null = strongRegex.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push({ strong: match[1] })
    lastIndex = strongRegex.lastIndex
    match = strongRegex.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.map((part, index) =>
    typeof part === 'string' ? <span key={index}>{part}</span> : <strong key={index}>{part.strong}</strong>,
  )
}

export default function DocumentationPage() {
  const filePath = path.join(process.cwd(), 'app', 'documentation', 'product-experience.md')
  const markdown = fs.readFileSync(filePath, 'utf8')
  const mainTitle = markdown.match(/^#\s+(.+)$/m)?.[1] ?? 'Documentation'
  const subtitle = markdown.match(/^\*\*(.+)\*\*$/m)?.[1] ?? ''
  const author = markdown.match(/^\*Prepared by(.+)\*$/m)?.[0]?.replace(/\*/g, '') ?? ''
  const sections = parseSections(markdown)

  return (
    <main className="min-h-screen bg-level-0">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="space-y-2">
          <p className="type-title-upper text-primary">Documentation</p>
          <h1 className="type-display">{mainTitle}</h1>
          {subtitle ? <p className="type-body text-calm">{subtitle}</p> : null}
          {author ? <p className="type-body-sm text-muted">{author}</p> : null}
        </header>

        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-xl border border-weak bg-level-2 p-4 md:sticky md:top-6">
            <p className="type-title-upper text-muted">Sections</p>
            <nav className="mt-3 space-y-2">
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`} className="block type-body-sm text-default hover:text-primary">
                  {index + 1}. {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-10">
            {sections.map((section) => {
              const blocks = parseBlocks(section.content)
              return (
                <section id={section.id} key={section.id} className="scroll-mt-16 space-y-3">
                  <h2 className="type-title">{section.title}</h2>
                  {blocks.map((block, blockIndex) => {
                    if (block.type === 'heading3') {
                      return (
                        <h3 key={`${section.id}-h3-${blockIndex}`} className="type-title-sm pt-4">
                          {block.text}
                        </h3>
                      )
                    }

                    if (block.type === 'paragraph') {
                      const paragraph = block.lines.join('\n').trim()
                      if (!paragraph) return null
                      return (
                        <p key={`${section.id}-p-${blockIndex}`} className="type-body text-default whitespace-pre-line">
                          {renderInline(paragraph)}
                        </p>
                      )
                    }

                    if (block.type === 'list') {
                      return (
                        <ul key={`${section.id}-l-${blockIndex}`} className="space-y-2">
                          {block.items.map((item, itemIndex) => (
                            <li key={`${section.id}-li-${itemIndex}`} className="flex gap-2 type-body text-default">
                              <span className="text-primary">•</span>
                              <span>{renderInline(item)}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    if (block.type === 'code') {
                      return (
                        <pre
                          key={`${section.id}-c-${blockIndex}`}
                          className="overflow-x-auto rounded-xl border border-weak bg-level-2 p-4"
                        >
                          <code className="type-body-sm text-default whitespace-pre">{block.lines.join('\n')}</code>
                        </pre>
                      )
                    }

                    if (!block.rows.length) return null
                    const [header, ...rows] = block.rows
                    return (
                      <div key={`${section.id}-t-${blockIndex}`} className="rounded-xl border border-weak bg-level-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {header.map((cell) => (
                                <TableHead key={cell}>{cell}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rows.map((row, rowIndex) => (
                              <TableRow key={`${section.id}-row-${rowIndex}`}>
                                {row.map((cell, cellIndex) => (
                                  <TableCell key={`${section.id}-cell-${rowIndex}-${cellIndex}`} className="type-body-sm">
                                    {renderInline(cell)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )
                  })}
                </section>
              )
            })}
          </article>
        </div>
      </div>
    </main>
  )
}
