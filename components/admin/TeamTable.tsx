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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              placeholder="Search team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-52 rounded-xl border-neutral-weaker bg-level-0 pl-9 type-body-sm placeholder:text-muted focus-visible:ring-brand-amber/30"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            withIcon="before"
            className="h-9 gap-2 rounded-xl border-neutral-weaker font-medium text-calm hover:border-neutral-weak hover:text-loud"
          >
            <Download size={13} />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-level-0">
          <TableRow className="border-neutral-weaker hover:bg-transparent">
            <TableHead className="h-11 px-6 type-caption font-semibold uppercase tracking-wider text-muted">
              <Button
                variant="ghost"
                size="sm"
                withIcon="after"
                onClick={() => handleSort('name')}
                className={`h-auto p-0 type-caption font-semibold uppercase tracking-wider hover:bg-transparent hover:text-calm ${
                  sortKey === 'name' ? 'text-loud' : ''
                }`}
              >
                TEAM MEMBER
                {renderSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead className="h-11 px-6 type-caption font-semibold uppercase tracking-wider text-muted">ROLE</TableHead>
            <TableHead className="h-11 px-6 type-caption font-semibold uppercase tracking-wider text-muted">DEPARTMENT</TableHead>
            <TableHead className="h-11 px-6 type-caption font-semibold uppercase tracking-wider text-muted">
              <Button
                variant="ghost"
                size="sm"
                withIcon="after"
                onClick={() => handleSort('score')}
                className={`h-auto p-0 type-caption font-semibold uppercase tracking-wider hover:bg-transparent hover:text-calm ${
                  sortKey === 'score' ? 'text-loud' : ''
                }`}
              >
                COMPLIANCE SCORE
                {renderSortIcon('score')}
              </Button>
            </TableHead>
            <TableHead className="h-11 px-6 type-caption font-semibold uppercase tracking-wider text-muted">AT RISK</TableHead>
            <TableHead className="h-11 px-6 type-caption font-semibold uppercase tracking-wider text-muted">LAST ACTIVE</TableHead>
            <TableHead className="h-11 px-6 text-right type-caption font-semibold uppercase tracking-wider text-muted">ACTIONS</TableHead>
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
                      className="type-caption"
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="type-body-sm font-medium text-loud">{member.name}</span>
                </div>
              </TableCell>

              <TableCell>
                <span className="type-body-sm text-calm">{member.role}</span>
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
