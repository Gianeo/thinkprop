'use client'

import { ArrowRight, Bell, Check, CheckCircle, MoreVertical } from 'lucide-react'
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
import { Card } from '@/components/ui/card'
import DepartmentFilter from '@/components/admin/DepartmentFilter'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface RiskTableProps {
  data: AtRiskPerson[]
  selectedFilter: string
  onFilterChange: (filter: string) => void
  onRemind: (person: AtRiskPerson) => void
  remindedIds: string[]
}

function getUrgencyColor(daysLeft: number, status: string) {
  if (status === 'Enrolled') return 'enrolled'
  if (daysLeft < 14) return 'critical'
  return 'at-risk'
}

function getRowBg(daysLeft: number, status: string) {
  if (status === 'Enrolled') return ''
  if (daysLeft < 14) return 'bg-destructive-weaker/30'
  return ''
}

export default function RiskTable({
  data,
  selectedFilter,
  onFilterChange,
  onRemind,
  remindedIds,
}: RiskTableProps) {
  const sortedRows = [...data].sort((a, b) => {
    const aEnrolled = a.status === 'Enrolled'
    const bEnrolled = b.status === 'Enrolled'

    if (aEnrolled && !bEnrolled) return 1
    if (!aEnrolled && bEnrolled) return -1
    return a.daysLeft - b.daysLeft
  })

  return (
    <Card overTitle="Priority Risk List" className="overflow-hidden rounded-xl bg-level-2 shadow-sm">
      <div className="flex items-center justify-between shadow px-6 pt-2 pb-4">
        <div>
          <h3 className="type-title-sm">Immediate Attention Required</h3>
          <p className="type-caption">Credentials expiring soon — action required</p>
        </div>

        <DepartmentFilter selected={selectedFilter} onChange={onFilterChange} />
      </div>

      <div className="space-y-3 p-4 md:hidden">
        {sortedRows.map((row) => {
          const urgency = getUrgencyColor(row.daysLeft, row.status)
          const statusBadgeVariant =
            urgency === 'enrolled'
              ? 'success'
              : urgency === 'critical'
                ? 'destructive'
                : 'warning'
          const isReminded = remindedIds.includes(row.id)

          return (
            <div key={row.id} className={`rounded-xl border border-weak bg-level-2 p-4 ${getRowBg(row.daysLeft, row.status)}`}>
              <div className="flex items-start justify-between gap-3">
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
                      className="type-caption"
                    >
                      {row.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="type-body font-medium text-loud">{row.name}</p>
                    <p className="type-caption text-muted">{row.department}</p>
                  </div>
                </div>
                <Badge variant={statusBadgeVariant} size="sm">
                  {row.status === 'Enrolled' && <Check className="mr-1 size-4" />}
                  {row.status}
                </Badge>
              </div>

              <div className="mt-3 space-y-1">
                <p className="type-body-sm text-loud">{row.credential}</p>
                <p className="type-caption text-muted">RERA · Mandatory</p>
              </div>

              <div className="mt-3">
                {row.status === 'Enrolled' ? (
                  <p className="type-body-sm text-muted">No days left</p>
                ) : (
                  <>
                    <p
                      className={`type-body-sm font-medium ${
                        urgency === 'critical' ? 'text-destructive-default' : 'text-warning-default'
                      }`}
                    >
                      {row.daysLeft} days left
                    </p>
                    <div className="mt-1.5 h-1 w-20 overflow-hidden rounded-full bg-neutral-weaker">
                      <div
                        className={`h-full rounded-full ${
                          urgency === 'critical' ? 'bg-state-critical' : 'bg-state-at-risk'
                        }`}
                        style={{ width: `${Math.min(((30 - row.daysLeft) / 30) * 100, 100)}%` }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4">
                {isReminded ? (
                  <div className="flex items-center gap-1.5 type-body-sm text-success-default">
                    <CheckCircle size={16} />
                    Reminded
                  </div>
                ) : row.status === 'Enrolled' ? (
                  <Button variant="link" withIcon="after" size="sm" className="h-auto p-0">
                    View Progress
                    <ArrowRight />
                  </Button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" withIcon="before" size="sm" onClick={() => onRemind(row)}>
                      <Bell />
                      Remind
                    </Button>
                    <Button size="sm">Enroll</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" withIcon="only">
                          <MoreVertical size={12} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Escalate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {['TEAM MEMBER', 'DEPARTMENT', 'CREDENTIAL', 'DAYS LEFT', 'STATUS', 'ACTIONS'].map((header) => (
                <TableHead
                  key={header}
                  className={header === 'ACTIONS' ? 'text-right' : undefined}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedRows.map((row) => {
              const urgency = getUrgencyColor(row.daysLeft, row.status)
              const statusBadgeVariant =
                urgency === 'enrolled'
                  ? 'success'
                  : urgency === 'critical'
                    ? 'destructive'
                    : 'warning'
              const isReminded = remindedIds.includes(row.id)

              return (
                <TableRow
                  key={row.id}
                  className={` ${getRowBg(row.daysLeft, row.status)}`}
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
                          className="type-caption"
                        >
                          {row.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-loud'>{row.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="type-body-sm text-calm">{row.department}</span>
                  </TableCell>

                  <TableCell>
                    <div className="type-body">{row.credential}</div>
                    <div className="type-caption text-muted">RERA · Mandatory</div>
                  </TableCell>

                  <TableCell>
                    {row.status === 'Enrolled' ? (
                      <span className="type-body text-muted">—</span>
                    ) : (
                      <div
                        className={`type-body font-medium ${
                          urgency === 'critical'
                            ? 'text-destructive-default'
                            : 'text-warning-default'
                        }`}
                      >
                        {row.daysLeft}
                        <span className="ml-1 type-caption">days</span>
                      </div>
                    )}
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
                    <Badge variant={statusBadgeVariant}>
                      {row.status === 'Enrolled' && <Check className="mr-1 size-4" />}
                      {row.status}
                    </Badge>
                  </TableCell>

                  <TableCell className='flex justify-end items-center py-4'>
                    {isReminded ? (
                      <div className="flex items-center gap-1.5 type-body text-success-default mt-1 px-4">
                        <CheckCircle size={16} />
                        Reminded
                      </div>
                    ) : row.status === 'Enrolled' ? (
                      <Button
                        variant="link"
                        withIcon="after"
                      >
                        View Progress
                        <ArrowRight />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          withIcon="before"
                          onClick={() => onRemind(row)}
                        >
                          <Bell />
                          Remind
                        </Button>

                        <Button>
                          Enroll
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" withIcon="only">
                              <MoreVertical size={12} />
                            </Button>
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
    </Card>
  )
}
