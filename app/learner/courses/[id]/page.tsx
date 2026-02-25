'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Check, ChevronRight, LoaderCircle } from 'lucide-react'
import SidebarNav from '@/components/shared/SidebarNav'
import SessionPicker from '@/components/learner/SessionPicker'
import { complianceItems, courses } from '@/lib/mockData'

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const course = useMemo(() => courses.find((entry) => entry.id === params.id), [params.id])

  if (!course) {
    return (
      <div className="min-h-screen bg-wire-bg p-8">
        <p className="text-sm text-wire-label">Course not found.</p>
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
    <div className="min-h-screen bg-wire-bg">
      <SidebarNav variant="learner" activePath="/learner/courses" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="space-y-6 p-8">
          <nav className="flex items-center gap-1 text-sm text-wire-label">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Compliance</span>
            <ChevronRight className="h-4 w-4" />
            <span>{requirementTitle}</span>
            <ChevronRight className="h-4 w-4" />
            <span>{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            <section className="md:col-span-3 rounded-xl border border-wire-border bg-white p-6">
              <h1 className="font-heading text-2xl font-bold text-wire-text">{course.title}</h1>
              <p className="mt-2 text-sm text-wire-label">
                {course.provider} · Instructor: {course.instructor}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-brand-amber px-2.5 py-1 font-semibold text-white">{course.credits} CPD Credits</span>
                <span className="rounded-full border border-wire-border px-2.5 py-1 text-wire-text">AED {course.price}</span>
                {course.format.map((entry) => (
                  <span key={entry} className="rounded-full border border-wire-border px-2.5 py-1 text-wire-label">
                    {entry}
                  </span>
                ))}
              </div>

              <div className="my-5 border-t border-wire-border" />

              <h2 className="font-heading text-lg font-semibold text-wire-text">About this course</h2>
              <p className="mt-2 text-sm text-wire-text">{course.description}</p>

              <h3 className="mt-5 font-heading text-lg font-semibold text-wire-text">What you&apos;ll learn</h3>
              <ul className="mt-2 space-y-2">
                {course.learningOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-wire-text">
                    <Check className="mt-0.5 h-4 w-4 text-state-compliant" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>

            <aside className="md:col-span-2 md:sticky md:top-8 md:self-start rounded-xl border border-wire-border bg-white p-6">
              <h2 className="mb-4 font-heading text-lg font-semibold text-wire-text">Select a Session</h2>
              <SessionPicker sessions={course.sessions} selectedId={selectedSession} onSelect={setSelectedSession} />

              <div className="mt-4">
                {loading ? (
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-wire-border bg-white py-3 text-sm font-semibold text-wire-label">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={!selectedSession}
                    className={`w-full rounded-xl py-3 font-semibold ${
                      selectedSession
                        ? 'bg-brand-amber text-white'
                        : 'cursor-not-allowed bg-wire-border text-wire-muted'
                    }`}
                  >
                    Enroll Now — AED {course.price}
                  </button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
