'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Check, ChevronRight, LoaderCircle } from 'lucide-react'
import SidebarNav from '@/components/shared/SidebarNav'
import SessionPicker from '@/components/learner/SessionPicker'
import { Button } from '@/components/ui/button'
import { complianceItems, courses } from '@/lib/mockData'

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const course = useMemo(() => courses.find((entry) => entry.id === params.id), [params.id])

  if (!course) {
    return (
      <div className="min-h-screen bg-level-0 p-8">
        <p className="type-body-sm text-muted">Course not found.</p>
      </div>
    )
  }

  const requirementTitle =
    complianceItems.find((item) => item.id === course.satisfiesRequirement[0])?.title ?? 'Requirement'

  const handleEnroll = () => {
    if (!selectedSession) {
      return
    }

    setLoading(true)
    window.setTimeout(() => {
      router.push(`/learner/courses/${course.id}/confirmation?session=${selectedSession}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-level-0">
      <SidebarNav variant="learner" activePath="/learner/courses" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="space-y-6 p-8">
          <nav className="flex items-center gap-1 type-body-sm text-muted">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Compliance</span>
            <ChevronRight className="h-4 w-4" />
            <span>{requirementTitle}</span>
            <ChevronRight className="h-4 w-4" />
            <span>{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            <section className="md:col-span-3 rounded-xl border border-wire-border bg-level-2 p-6">
              <h1 className="font-heading type-title-sm font-bold text-default">{course.title}</h1>
              <p className="mt-2 type-body-sm text-muted">
                {course.provider} · Instructor: {course.instructor}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 type-body-sm">
                <span className="rounded-full bg-brand-amber px-2.5 py-1 font-semibold text-contrast">{course.credits} CPD Credits</span>
                <span className="rounded-full border border-wire-border px-2.5 py-1 text-default">AED {course.price}</span>
                {course.format.map((entry) => (
                  <span key={entry} className="rounded-full border border-wire-border px-2.5 py-1 text-muted">
                    {entry}
                  </span>
                ))}
              </div>

              <div className="my-5 border-t border-wire-border" />

              <h2 className="font-heading type-title-sm font-semibold text-default">About this course</h2>
              <p className="mt-2 type-body-sm text-default">{course.description}</p>

              <h3 className="mt-5 font-heading type-title-sm font-semibold text-default">What you&apos;ll learn</h3>
              <ul className="mt-2 space-y-2">
                {course.learningOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 type-body-sm text-default">
                    <Check className="mt-0.5 h-4 w-4 text-success-default" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>

            <aside className="md:col-span-2 md:sticky md:top-8 md:self-start rounded-xl border border-wire-border bg-level-2 p-6">
              <h2 className="mb-4 font-heading type-title-sm font-semibold text-default">Select a Session</h2>
              <SessionPicker sessions={course.sessions} selectedId={selectedSession} onSelect={setSelectedSession} />

              <div className="mt-4">
                {loading ? (
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-wire-border bg-level-2 py-3 type-body-sm font-semibold text-muted">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <Button
                    onClick={handleEnroll}
                    disabled={!selectedSession}
                    className={`w-full rounded-xl py-3 font-semibold ${
                      selectedSession
                        ? 'bg-primary text-contrast hover:bg-primary-stronger'
                        : 'cursor-not-allowed bg-wire-border text-muted'
                    }`}
                  >
                    Enroll Now — AED {course.price}
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
