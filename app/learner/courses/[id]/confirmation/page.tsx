'use client'

import { useEffect, useMemo } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CalendarPlus, CheckCircle } from 'lucide-react'
import SidebarNav from '@/components/shared/SidebarNav'
import ComplianceCard from '@/components/shared/ComplianceCard'
import { Button } from '@/components/ui/button'
import { complianceItems, courses } from '@/lib/mockData'
import { ComplianceItem, ComplianceState } from '@/lib/types'

const STORAGE_KEY = 'thinkprop_enrollment_state'
const SESSION_DATE_KEY = 'thinkprop_enrollment_session_date'

export default function ConfirmationPage() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()

  const course = useMemo(() => courses.find((entry) => entry.id === params.id), [params.id])
  const sessionId = searchParams.get('session')
  const selectedSession = course?.sessions.find((session) => session.id === sessionId) ?? course?.sessions[0]

  useEffect(() => {
    if (!selectedSession) {
      return
    }

    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY)
      const parsed = rawState ? (JSON.parse(rawState) as Record<string, ComplianceState>) : {}
      parsed['rera-cpd'] = 'ENROLLED'
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
      window.localStorage.setItem(SESSION_DATE_KEY, selectedSession.date)
    } catch {
      // Ignore storage errors.
    }
  }, [selectedSession])

  if (!course || !selectedSession) {
    return (
      <div className="min-h-screen bg-level-0 p-8">
        <p className="type-body-sm text-muted">Enrollment summary unavailable.</p>
      </div>
    )
  }

  const reraItem = complianceItems.find((item) => item.id === 'rera-cpd')
  const enrolledPreview: ComplianceItem | null =
    reraItem
      ? {
          ...reraItem,
          state: 'ENROLLED',
          expiryDate: selectedSession.date,
        }
      : null

  return (
    <div className="min-h-screen bg-level-0">
      <SidebarNav variant="learner" activePath="/learner/courses" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="mx-auto max-w-2xl space-y-6 p-8">
          <section className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-success-default" />
            <h1 className="mt-4 font-heading type-title-sm font-bold text-default">You&apos;re enrolled!</h1>
            <p className="mt-2 type-body-sm text-muted">We&apos;ll send your joining instructions to your email.</p>
          </section>

          <section className="rounded-xl border border-wire-border bg-level-2 p-6">
            <div className="space-y-2 type-body-sm">
              <p>
                <span className="text-muted">Course:</span> <span className="text-default">{course.title}</span>
              </p>
              <p>
                <span className="text-muted">Session:</span>{' '}
                <span className="text-default">
                  {selectedSession.date} at {selectedSession.time}
                </span>
              </p>
              <p>
                <span className="text-muted">Format:</span>{' '}
                <span className="text-default">
                  {selectedSession.format} · {selectedSession.location}
                </span>
              </p>
              <p>
                <span className="text-muted">Price:</span> <span className="text-default">AED {course.price}</span>
              </p>
            </div>
          </section>

          <Button
            variant="outline"
            withIcon="before"
            className="inline-flex items-center gap-2 rounded-lg border border-wire-border bg-level-2 px-4 py-2.5 type-body-sm font-semibold text-default"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to Calendar
          </Button>

          <section>
            <h2 className="mb-3 font-heading type-title-sm font-semibold text-default">Your compliance status has been updated</h2>
            {enrolledPreview && <ComplianceCard item={enrolledPreview} />}
          </section>

          <Button variant="link" withIcon="before" onClick={() => router.push('/learner/dashboard')} className="h-auto p-0 type-body-sm font-semibold text-primary-loud hover:no-underline">
            <ArrowLeft size={14} />
            Return to Dashboard
          </Button>
        </div>
      </main>
    </div>
  )
}
