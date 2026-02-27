'use client'

import { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  Flame,
} from 'lucide-react'
import ComplianceCard from '@/components/shared/ComplianceCard'
import SidebarNav from '@/components/shared/SidebarNav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { complianceItems, learnerProfile } from '@/lib/mockData'
import { ComplianceState } from '@/lib/types'

const STORAGE_KEY = 'thinkprop_enrollment_state'
const SESSION_DATE_KEY = 'thinkprop_enrollment_session_date'

export default function LearnerDashboardPage() {
  const router = useRouter()
  const [enrollmentContext, setEnrollmentContext] = useState<{
    state: Record<string, ComplianceState>
    sessionDate: string | null
  }>(() => {
    const initialState = complianceItems.reduce<Record<string, ComplianceState>>((acc, item) => {
      acc[item.id] = item.state
      return acc
    }, {})
    return { state: initialState, sessionDate: null }
  })

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const rawState = window.localStorage.getItem(STORAGE_KEY)
        const rawSessionDate = window.localStorage.getItem(SESSION_DATE_KEY)
        const sessionDate = rawSessionDate ?? null

        if (!rawState) {
          if (sessionDate) {
            setEnrollmentContext((prev) => ({ ...prev, sessionDate }))
          }
          return
        }

        const parsed = JSON.parse(rawState) as Record<string, ComplianceState>
        setEnrollmentContext((prev) => ({
          state: { ...prev.state, ...parsed },
          sessionDate,
        }))
      } catch {
        // Ignore storage parse errors.
      }
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  const datedItems = useMemo(
    () =>
      complianceItems.map((item) => ({
        ...item,
        state: enrollmentContext.state[item.id] ?? item.state,
        expiryDate:
          item.id === 'rera-cpd' &&
          (enrollmentContext.state[item.id] ?? item.state) === 'ENROLLED' &&
          enrollmentContext.sessionDate
            ? enrollmentContext.sessionDate
            : item.expiryDate,
      })),
    [enrollmentContext],
  )

  const criticalCount = datedItems.filter((item) => item.state === 'CRITICAL').length
  const atRiskCount = datedItems.filter((item) => item.state === 'AT_RISK').length
  const compliantCount = datedItems.filter((item) => item.state === 'COMPLIANT').length
  const enrolledCount = datedItems.filter((item) => item.state === 'ENROLLED').length

  const totalCreditsRequired = datedItems.reduce((sum, item) => sum + (item.creditsRequired ?? 0), 0)
  const totalCreditsEarned = datedItems.reduce((sum, item) => sum + (item.creditsEarned ?? 0), 0)
  const progressPercent =
    totalCreditsRequired > 0 ? Math.round((totalCreditsEarned / totalCreditsRequired) * 100) : 0

  const nextDue = datedItems
    .filter((item) => item.daysRemaining !== null && (item.state === 'CRITICAL' || item.state === 'AT_RISK'))
    .sort((a, b) => (a.daysRemaining ?? Number.POSITIVE_INFINITY) - (b.daysRemaining ?? Number.POSITIVE_INFINITY))[0]

  const streakDays = 9
  const attentionCount = criticalCount + atRiskCount

  return (
    <div className="min-h-screen bg-level-0">
      <SidebarNav variant="learner" activePath="/learner/dashboard" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="space-y-6 p-6 md:p-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="type-title-upper text-primary-default">Learner Dashboard</p>
              <h1 className="type-title">Good morning, {learnerProfile.firstName}.</h1>
              <p className="mt-1 type-body-sm text-muted">
                {new Intl.DateTimeFormat('en-AE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }).format(new Date())}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" withIcon="only" className="rounded-lg border border-wire-border bg-level-2 p-2.5 text-muted">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full type-body-sm text-muted">
                {learnerProfile.initials}
              </div>
            </div>
          </header>

          {criticalCount > 0 && (
            <section className="flex flex-col gap-3 rounded-lg bg-destructive pl-4 pr-2 py-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 size-4 text-contrast" />
                <p className="type-body-sm text-contrast">
                  <span className="font-semibold">Action Required:</span> {criticalCount} certification
                  {criticalCount > 1 ? 's are' : ' is'} now in critical window.
                  {nextDue?.daysRemaining ? ` Earliest deadline in ${nextDue.daysRemaining} days.` : ''}
                </p>
              </div>
              <Button
                variant="link"
                withIcon="after"
                onClick={() => router.push('/learner/compliance/rera-cpd')}
                className="text-contrast"
              >
                View Details
                <ArrowRight size={14} />
              </Button>
            </section>
          )}

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <Card className="xl:col-span-2">
              <CardContent className="p-6 pt-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="type-title-sm text-loud">Compliance health: {progressPercent}%</h2>
                    <p className="mt-1 type-body-sm text-calm">
                      {totalCreditsEarned} of {totalCreditsRequired} required credits completed
                    </p>
                  </div>
                  <Badge variant={attentionCount > 0 ? 'warning' : 'success'} size="base">
                    {attentionCount > 0 ? `${attentionCount} need attention` : 'All on track'}
                  </Badge>
                </div>

                <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-neutral-weaker">
                  <div className="h-full bg-primary-strong transition-all" style={{ width: `${progressPercent}%` }} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-lg border border-weak bg-level-1 p-3">
                    <p className="type-title-upper">Critical</p>
                    <p className="mt-1 type-title-sm text-destructive-default">{criticalCount}</p>
                  </div>
                  <div className="rounded-lg border border-weak bg-level-1 p-3">
                    <p className="type-title-upper">At Risk</p>
                    <p className="mt-1 type-title-sm text-warning-default">{atRiskCount}</p>
                  </div>
                  <div className="rounded-lg border border-weak bg-level-1 p-3">
                    <p className="type-title-upper">Enrolled</p>
                    <p className="mt-1 type-title-sm text-primary-default">{enrolledCount}</p>
                  </div>
                  <div className="rounded-lg border border-weak bg-level-1 p-3">
                    <p className="type-title-upper">Compliant</p>
                    <p className="mt-1 type-title-sm text-success-default">{compliantCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

              <Card>
                <CardContent className="p-5">
                  <p className="type-title-upper">Next Action</p>
                  <h3 className="mt-2 type-title-sm text-loud">
                    {nextDue ? `${nextDue.title} due soon` : 'No urgent compliance action'}
                  </h3>
                  <p className="mt-2 type-body-sm text-calm">
                    {nextDue?.daysRemaining !== null && nextDue?.daysRemaining !== undefined
                      ? `${nextDue.daysRemaining} days remaining.`
                      : 'Focus on elective progress this week.'}
                  </p>
                  <Button
                    className="mt-4 w-full"
                    withIcon="after"
                    onClick={() => router.push('/learner/compliance/rera-cpd')}
                  >
                    Continue
                    <ArrowRight size={14} />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="type-title-upper">Streak</p>
                      <p className="mt-2 type-title-sm text-loud">{streakDays} days</p>
                      <p className="mt-1 type-caption text-muted">Keep 1 learning action per week</p>
                    </div>
                    <Flame className="h-4 w-4 text-warning-default" />
                  </div>
                </CardContent>
              </Card>
          </section>

          <section className='p-8 pt-6 bg-level-1'>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="type-title-sm">Your Compliance</h2>
              <p className="type-caption text-muted">Prioritized by urgency</p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {datedItems.map((item) => (
                <ComplianceCard
                  key={item.id}
                  item={item}
                  onCtaClick={
                    item.id === 'rera-cpd' && (item.state === 'CRITICAL' || item.state === 'AT_RISK')
                      ? () => router.push('/learner/compliance/rera-cpd')
                      : undefined
                  }
                />
              ))}
            </div>
          </section>

          <section className="hidden md:block">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="type-title-sm">Your Learning Pathway</h2>
              <Badge variant="primary" size="base" className="gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                1 of 4 milestones completed
              </Badge>
            </div>
            <div className="rounded-lg border border-wire-border bg-level-2 p-6">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { step: '1', label: 'Complete Mandatory Training', state: 'done', helper: 'Done ✓' },
                  { step: '2', label: 'RERA CPD Credits', state: 'progress', helper: 'In Progress' },
                  { step: '3', label: 'Specialisation Elective', state: 'locked', helper: 'Locked' },
                  { step: '4', label: 'Senior Agent Certification', state: 'locked', helper: 'Locked' },
                ].map((item, index) => (
                  <div key={item.step} className="relative">
                    {index < 3 && <div className="absolute left-[55%] top-5 h-0.5 w-full bg-wire-border" />}
                    <div
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border type-body-sm ${
                        item.state === 'done'
                          ? 'border-primary text-primary'
                          : item.state === 'progress'
                            ? 'border-primary-weak bg-primary-weaker text-primary-default'
                            : 'border-border bg-level-2 text-muted'
                      }`}
                    >
                      {item.state === 'done' ? '✓' : item.step}
                    </div>
                    <p className="mt-3 type-body-sm">{item.label}</p>
                    <p className={`type-caption ${item.state === 'progress' ? 'text-primary-loud' : 'text-muted'}`}>{item.helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
