'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
} from 'lucide-react'
import type { TeamMember } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface TeamTableProps {
  data: TeamMember[]
}

type SortKey = 'name' | 'score' | null

type SortDir = 'asc' | 'desc'

export default function TeamTable({ data }: TeamTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const filteredAndSorted = useMemo(() => {
    const filtered = data.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    )

    if (!sortKey) return filtered

    return [...filtered].sort((a, b) => {
      if (sortKey === 'name') {
        const result = a.name.localeCompare(b.name)
        return sortDir === 'asc' ? result : -result
      }

      const result = a.score - b.score
      return sortDir === 'asc' ? result : -result
    })
  }, [data, searchQuery, sortDir, sortKey])

  const handleSort = (key: Exclude<SortKey, null>) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDir('asc')
  }

  const renderSortIcon = (key: Exclude<SortKey, null>) => {
    if (sortKey !== key) return null
    return sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-weaker bg-level-1 shadow">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-weaker px-6 py-4">
        <div>
          <h3 className="type-title-sm">Team Compliance</h3>
          <p className="type-caption">Full compliance status for all team members</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-base"
            />
            <Input
              placeholder="Search team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-52 rounded-xl border-neutral-weaker bg-level-0 pl-9 text-sm placeholder:text-neutral-base focus-visible:ring-brand-amber/30"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-xl border-neutral-weaker font-medium text-neutral-strong hover:border-neutral-weak hover:text-neutral-strongest"
          >
            <Download size={13} />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-level-0">
          <TableRow className="border-neutral-weaker hover:bg-transparent">
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-base">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('name')}
                className={`h-auto p-0 text-[11px] font-semibold uppercase tracking-wider hover:bg-transparent hover:text-neutral-strong ${
                  sortKey === 'name' ? 'text-neutral-strongest' : ''
                }`}
              >
                TEAM MEMBER
                {renderSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-base">ROLE</TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-base">DEPARTMENT</TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-base">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('score')}
                className={`h-auto p-0 text-[11px] font-semibold uppercase tracking-wider hover:bg-transparent hover:text-neutral-strong ${
                  sortKey === 'score' ? 'text-neutral-strongest' : ''
                }`}
              >
                COMPLIANCE SCORE
                {renderSortIcon('score')}
              </Button>
            </TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-base">AT RISK</TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-base">LAST ACTIVE</TableHead>
            <TableHead className="h-11 px-6 text-right text-[11px] font-semibold uppercase tracking-wider text-neutral-base">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredAndSorted.map((member) => (
            <TableRow
              key={member.id}
              className="border-neutral-weaker transition-colors duration-100 hover:bg-level-0/60"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback
                      variant={member.status === 'Compliant' ? 'success' : 'destructive'}
                      className="text-[11px]"
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-neutral-strongest">{member.name}</span>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm text-neutral-strong">{member.role}</span>
              </TableCell>

              <TableCell>
                <Badge variant="default">
                  {member.department}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-weaker">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        member.score >= 80
                          ? 'bg-score-high'
                          : member.score >= 60
                            ? 'bg-score-mid'
                            : 'bg-score-low'
                      }`}
                      style={{ width: `${member.score}%` }}
                    />
                  </div>
                  <span
                    className={`font-mono text-sm font-bold ${
                      member.score >= 80
                        ? 'text-score-high'
                        : member.score >= 60
                          ? 'text-score-mid'
                          : 'text-score-low'
                    }`}
                  >
                    {member.score}%
                  </span>
                </div>
              </TableCell>

              <TableCell>
                {member.atRisk === 0 ? (
                  <span className="text-sm text-neutral-base">—</span>
                ) : (
                  <span className="text-sm font-medium text-state-critical">
                    {member.atRisk} credential{member.atRisk > 1 ? 's' : ''}
                  </span>
                )}
              </TableCell>

              <TableCell>
                <span className="font-mono text-sm text-neutral-strong">{member.lastActivity}</span>
              </TableCell>

              <TableCell className="px-6 py-4 text-right">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-semibold text-state-enrolled hover:no-underline"
                >
                  View →
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredAndSorted.length === 0 && (
        <div className="flex items-center gap-2 px-6 py-5 text-sm text-neutral-strong">
          <AlertTriangle size={14} className="text-score-mid" />
          No team members match your search.
        </div>
      )}

      <div className="sr-only">
        <CheckCircle size={1} />
      </div>
    </div>
  )
}
