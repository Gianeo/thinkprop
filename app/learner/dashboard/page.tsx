'use client'

import { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Bell } from 'lucide-react'
import ComplianceCard from '@/components/shared/ComplianceCard'
import SidebarNav from '@/components/shared/SidebarNav'
import { Button } from '@/components/ui/button'
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

  return (
    <div className="min-h-screen bg-level-0">
      <SidebarNav variant="learner" activePath="/learner/dashboard" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="space-y-8 p-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading type-title-sm font-bold text-default">Good morning, {learnerProfile.firstName}</h1>
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
              <Button variant="outline" size="icon" className="rounded-lg border border-wire-border bg-level-1 p-2.5 text-muted">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy type-body-sm font-semibold text-muted">
                {learnerProfile.initials}
              </div>
            </div>
          </header>

          {criticalCount > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-state-critical bg-state-critical-bg p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive-default" />
                <p className="type-body-sm text-default">
                  <span className="font-semibold">Action Required:</span> 1 certification expires in 18 days. Your RERA broker
                  license may be at risk.
                </p>
              </div>
              <Button
                variant="link"
                onClick={() => router.push('/learner/compliance/rera-cpd')}
                className="h-auto p-0 type-body-sm font-semibold text-primary-loud hover:no-underline"
              >
                View Details →
              </Button>
            </section>
          )}

          <section>
            <h2 className="mb-4 font-heading type-title-sm font-semibold text-default">Your Compliance</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <h2 className="mb-4 font-heading type-title-sm font-semibold text-default">Your Learning Pathway</h2>
            <div className="rounded-xl border border-wire-border bg-level-1 p-6">
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
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border type-body-sm font-semibold ${
                        item.state === 'done'
                          ? 'border-brand-navy bg-brand-navy text-muted'
                          : item.state === 'progress'
                            ? 'border-brand-amber bg-brand-amber text-contrast'
                            : 'border-wire-border bg-level-1 text-muted'
                      }`}
                    >
                      {item.state === 'done' ? '✓' : item.step}
                    </div>
                    <p className="mt-3 type-body-sm font-semibold text-default">{item.label}</p>
                    <p className={`type-caption ${item.state === 'progress' ? 'text-warning-loud' : 'text-muted'}`}>{item.helper}</p>
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
