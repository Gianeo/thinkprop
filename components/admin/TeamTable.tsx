'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
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
    if (sortKey !== key) return <ChevronDown size={13} />
    return sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-weak bg-level-2 shadow">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-weak px-6 py-4">
        <div>
          <h3 className="type-title-sm">Team Compliance</h3>
          <p className="type-caption">Full compliance status for all team members</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              placeholder="Search team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-52 rounded-xl pl-9"
            />
          </div>

          <Button
            variant="outline"
            withIcon="before"
          >
            <Download size={13} />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-level-0">
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                withIcon="after"
                onClick={() => handleSort('name')}
                className="h-auto rounded-none p-0 text-xs font-semibold tracking-wider leading-none uppercase text-inherit hover:bg-transparent hover:text-inherit focus-visible:ring-0"
              >
                TEAM MEMBER
                {renderSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>DEPARTMENT</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                withIcon="after"
                onClick={() => handleSort('score')}
                className="h-auto rounded-none p-0 text-xs font-semibold tracking-wider leading-none uppercase text-inherit hover:bg-transparent hover:text-inherit focus-visible:ring-0"
              >
                COMPLIANCE SCORE
                {renderSortIcon('score')}
              </Button>
            </TableHead>
            <TableHead>AT RISK</TableHead>
            <TableHead>LAST ACTIVE</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredAndSorted.map((member) => (
            <TableRow
              key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback
                      variant={member.status === 'Compliant' ? 'success' : 'destructive'}
                      className="type-caption"
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-loud">{member.name}</span>
                </div>
              </TableCell>

              <TableCell>
                <span className="type-body-sm text-calm">{member.role}</span>
              </TableCell>

              <TableCell>
                <span className="type-body-sm text-calm">{member.department}</span>
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
                    className={`font-mono type-body-sm font-bold ${
                      member.score >= 80
                        ? 'text-success-default'
                        : member.score >= 60
                          ? 'text-warning-default'
                          : 'text-destructive-default'
                    }`}
                  >
                    {member.score}%
                  </span>
                </div>
              </TableCell>

              <TableCell>
                {member.atRisk === 0 ? (
                  <span className="type-body-sm text-muted">—</span>
                ) : (
                  <span className="type-body-sm font-medium text-destructive-default">
                    {member.atRisk} credential{member.atRisk > 1 ? 's' : ''}
                  </span>
                )}
              </TableCell>

              <TableCell>
                <span className="font-mono type-body-sm text-calm">{member.lastActivity}</span>
              </TableCell>

              <TableCell className="px-6 py-4 text-right">
                <Button
                  variant="link"
                  withIcon="after"
                  className="h-auto p-0 type-caption font-semibold text-primary-default hover:no-underline"
                >
                  View
                  <ArrowRight size={12} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredAndSorted.length === 0 && (
        <div className="flex items-center gap-2 px-6 py-5 type-body-sm text-calm">
          <AlertTriangle size={14} className="text-warning-default" />
          No team members match your search.
        </div>
      )}

      <div className="sr-only">
        <CheckCircle size={1} />
      </div>
    </div>
  )
}
