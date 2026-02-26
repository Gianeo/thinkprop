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
    <div className="overflow-hidden rounded-xl bg-level-1 shadow">
      <div className="flex items-center justify-between shadow px-6 py-4">
        <div>
          <h3 className="type-title-sm">Immediate Attention Required</h3>
          <p className="type-caption">Credentials expiring soon — action required</p>
        </div>

        <Badge variant="destructive">
          {data.length} members
        </Badge>
      </div>

      <Table>
        <TableHeader className="bg-level-0">
          <TableRow className="border-neutral-weaker hover:bg-transparent">
            {['TEAM MEMBER', 'DEPARTMENT', 'CREDENTIAL', 'DAYS LEFT', 'STATUS', 'ACTIONS'].map((header) => (
              <TableHead
                key={header}
                className="h-10 text-[11px] font-semibold uppercase tracking-wider text-muted"
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
                className={`border-neutral-weaker transition-colors duration-100 ${getRowBg(row.daysLeft, row.status)}`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback
                        variant={
                          urgency === 'enrolled'
                            ? 'primary'
                            : urgency === 'critical'
                              ? 'destructive'
                              : 'warning'
                        }
                        className="text-xs"
                      >
                        {row.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="type-body text-default">{row.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="default">
                    {row.department}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="type-body-sm text-calm">{row.credential}</div>
                  <div className="mt-0.5 type-caption text-muted">RERA · Mandatory</div>
                </TableCell>

                <TableCell>
                  <div
                    className={`font-mono text-sm font-bold ${
                      urgency === 'enrolled'
                        ? 'text-primary-default'
                        : urgency === 'critical'
                          ? 'text-destructive-default'
                          : 'text-warning-default'
                    }`}
                  >
                    {row.status === 'Enrolled' ? 'Enrolled' : `${row.daysLeft}`}
                    {row.status !== 'Enrolled' && (
                      <span className="ml-1 text-xs font-normal text-muted">days</span>
                    )}
                  </div>
                  {row.status !== 'Enrolled' && (
                    <div className="mt-1.5 h-1 w-16 overflow-hidden rounded-full bg-neutral-weaker">
                      <div
                        className={`h-full rounded-full ${
                          urgency === 'critical' ? 'bg-state-critical' : 'bg-state-at-risk'
                        }`}
                        style={{ width: `${Math.min(((30 - row.daysLeft) / 30) * 100, 100)}%` }}
                      />
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {row.status === 'Not Enrolled' ? (
                    <Badge variant="default">
                      ● Not Enrolled
                    </Badge>
                  ) : (
                    <Badge variant="primary">
                      <BookOpen className="mr-1" size={10} />
                      Enrolled
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  {isReminded ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-success-default">
                      <CheckCircle size={12} />
                      Reminded
                    </span>
                  ) : row.status === 'Enrolled' ? (
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs font-semibold text-primary-default hover:no-underline"
                    >
                      View Progress →
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className=""
                        onClick={() => onRemind(row)}
                      >
                        <Bell size={11} className="mr-1.5" />
                        Remind
                      </Button>

                      <Button
                        size="sm"
                      >
                        Enroll
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
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
