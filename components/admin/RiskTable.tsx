'use client'

import { Bell, BookOpen, CheckCircle, MoreHorizontal } from 'lucide-react'
import type { AtRiskPerson } from '@/lib/types'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface RiskTableProps {
  data: AtRiskPerson[]
  onRemind: (person: AtRiskPerson) => void
  remindedIds: string[]
}

function getUrgencyColor(daysLeft: number, status: string) {
  if (status === 'Enrolled') return 'enrolled'
  if (daysLeft <= 14) return 'critical'
  return 'at-risk'
}

function getRowBg(daysLeft: number, status: string) {
  if (status === 'Enrolled') return ''
  if (daysLeft <= 14) return 'bg-state-critical-bg/30'
  return 'bg-state-at-risk-bg/20'
}

export default function RiskTable({ data, onRemind, remindedIds }: RiskTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-admin-border bg-admin-card shadow-card">
      <div className="flex items-center justify-between border-b border-admin-border px-6 py-4">
        <div>
          <h3 className="font-display text-[15px] font-semibold text-admin-heading">Immediate Attention Required</h3>
          <p className="mt-0.5 text-sm text-admin-muted">Credentials expiring soon — action required</p>
        </div>

        <Badge className="rounded-full border-state-critical/20 bg-state-critical-bg px-3 py-1 text-xs font-semibold text-state-critical">
          {data.length} members
        </Badge>
      </div>

      <Table>
        <TableHeader className="bg-admin-surface">
          <TableRow className="border-admin-border hover:bg-transparent">
            {['TEAM MEMBER', 'DEPARTMENT', 'CREDENTIAL', 'DAYS LEFT', 'STATUS', 'ACTIONS'].map((header) => (
              <TableHead
                key={header}
                className="h-10 text-[11px] font-semibold uppercase tracking-wider text-admin-faint"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => {
            const urgency = getUrgencyColor(row.daysLeft, row.status)
            const isReminded = remindedIds.includes(row.id)

            return (
              <TableRow
                key={row.id}
                className={`border-admin-border transition-colors duration-100 ${getRowBg(row.daysLeft, row.status)}`}
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarFallback
                        className={
                          urgency === 'enrolled'
                            ? 'border-state-enrolled/20 bg-state-enrolled-bg font-display text-xs font-semibold text-state-enrolled'
                            : 'border-state-critical/20 bg-state-critical-bg font-display text-xs font-semibold text-state-critical'
                        }
                      >
                        {row.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-admin-heading">{row.name}</span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className="rounded-md border-admin-border bg-admin-surface px-2.5 py-0.5 text-xs font-medium text-admin-body"
                  >
                    {row.department}
                  </Badge>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <div className="text-sm text-admin-body">{row.credential}</div>
                  <div className="mt-0.5 text-xs text-admin-faint">RERA · Mandatory</div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <div
                    className={`font-mono text-sm font-bold ${
                      urgency === 'enrolled'
                        ? 'text-state-enrolled'
                        : urgency === 'critical'
                          ? 'text-state-critical'
                          : 'text-state-at-risk'
                    }`}
                  >
                    {row.status === 'Enrolled' ? 'Enrolled' : `${row.daysLeft}`}
                    {row.status !== 'Enrolled' && (
                      <span className="ml-1 text-xs font-normal text-admin-faint">days</span>
                    )}
                  </div>
                  {row.status !== 'Enrolled' && (
                    <div className="mt-1.5 h-1 w-16 overflow-hidden rounded-full bg-admin-border">
                      <div
                        className={`h-full rounded-full ${
                          urgency === 'critical' ? 'bg-state-critical' : 'bg-state-at-risk'
                        }`}
                        style={{ width: `${Math.min(((30 - row.daysLeft) / 30) * 100, 100)}%` }}
                      />
                    </div>
                  )}
                </TableCell>

                <TableCell className="px-6 py-4">
                  {row.status === 'Not Enrolled' ? (
                    <Badge
                      variant="outline"
                      className="rounded-full border-admin-border bg-transparent px-3 py-0.5 text-xs font-medium text-admin-muted"
                    >
                      ● Not Enrolled
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="rounded-full border-state-enrolled/20 bg-state-enrolled-bg px-3 py-0.5 text-xs font-medium text-state-enrolled"
                    >
                      <BookOpen className="mr-1" size={10} />
                      Enrolled
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="px-6 py-4">
                  {isReminded ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-score-high">
                      <CheckCircle size={12} />
                      Reminded
                    </span>
                  ) : row.status === 'Enrolled' ? (
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs font-semibold text-state-enrolled hover:no-underline"
                    >
                      View Progress →
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-lg border-admin-sidebar px-3 text-xs font-semibold text-admin-sidebar transition-colors duration-150 hover:bg-admin-sidebar hover:text-white"
                        onClick={() => onRemind(row)}
                      >
                        <Bell size={11} className="mr-1.5" />
                        Remind
                      </Button>

                      <Button
                        size="sm"
                        className="h-7 rounded-lg bg-brand-amber px-3 text-xs font-semibold text-white transition-colors duration-150 hover:bg-amber-600"
                      >
                        Enroll
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-md border border-admin-border p-1.5 text-admin-faint hover:text-admin-body">
                          <MoreHorizontal size={12} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Escalate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
