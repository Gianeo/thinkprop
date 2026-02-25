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
    <div className="overflow-hidden rounded-2xl border border-admin-border bg-admin-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-admin-border px-6 py-4">
        <div>
          <h3 className="font-display text-[15px] font-semibold text-admin-heading">Team Compliance</h3>
          <p className="mt-0.5 text-sm text-admin-muted">Full compliance status for all team members</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-faint"
            />
            <Input
              placeholder="Search team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-52 rounded-xl border-admin-border bg-admin-surface pl-9 text-sm placeholder:text-admin-faint focus-visible:ring-brand-amber/30"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-xl border-admin-border font-medium text-admin-body hover:border-admin-border-strong hover:text-admin-heading"
          >
            <Download size={13} />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-admin-surface">
          <TableRow className="border-admin-border hover:bg-transparent">
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-admin-faint">
              <button
                type="button"
                onClick={() => handleSort('name')}
                className={`flex select-none items-center gap-1.5 transition-colors hover:text-admin-body ${
                  sortKey === 'name' ? 'text-admin-heading' : ''
                }`}
              >
                TEAM MEMBER
                {renderSortIcon('name')}
              </button>
            </TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-admin-faint">ROLE</TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-admin-faint">DEPARTMENT</TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-admin-faint">
              <button
                type="button"
                onClick={() => handleSort('score')}
                className={`flex select-none items-center gap-1.5 transition-colors hover:text-admin-body ${
                  sortKey === 'score' ? 'text-admin-heading' : ''
                }`}
              >
                COMPLIANCE SCORE
                {renderSortIcon('score')}
              </button>
            </TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-admin-faint">AT RISK</TableHead>
            <TableHead className="h-11 px-6 text-[11px] font-semibold uppercase tracking-wider text-admin-faint">LAST ACTIVE</TableHead>
            <TableHead className="h-11 px-6 text-right text-[11px] font-semibold uppercase tracking-wider text-admin-faint">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredAndSorted.map((member) => (
            <TableRow
              key={member.id}
              className="border-admin-border transition-colors duration-100 hover:bg-admin-surface/60"
            >
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback
                      className={
                        member.status === 'Compliant'
                          ? 'border-score-high/20 bg-score-high-bg font-display text-[11px] font-semibold text-score-high'
                          : 'border-score-low/20 bg-score-low-bg font-display text-[11px] font-semibold text-score-low'
                      }
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-admin-heading">{member.name}</span>
                </div>
              </TableCell>

              <TableCell className="px-6 py-4">
                <span className="text-sm text-admin-body">{member.role}</span>
              </TableCell>

              <TableCell className="px-6 py-4">
                <Badge
                  variant="outline"
                  className="rounded-md border-admin-border bg-admin-surface px-2.5 py-0.5 text-xs font-medium text-admin-body"
                >
                  {member.department}
                </Badge>
              </TableCell>

              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-admin-border">
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

              <TableCell className="px-6 py-4">
                {member.atRisk === 0 ? (
                  <span className="text-sm text-admin-faint">—</span>
                ) : (
                  <span className="text-sm font-medium text-state-critical">
                    {member.atRisk} credential{member.atRisk > 1 ? 's' : ''}
                  </span>
                )}
              </TableCell>

              <TableCell className="px-6 py-4">
                <span className="font-mono text-sm text-admin-muted">{member.lastActivity}</span>
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
        <div className="flex items-center gap-2 px-6 py-5 text-sm text-admin-muted">
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
