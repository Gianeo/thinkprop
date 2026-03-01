'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarPlus,
  CheckCircle,
  Clock,
  Lightbulb,
  Lock,
  SendHorizontal,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import ComplianceCard from '@/components/shared/ComplianceCard'
import SidebarNav from '@/components/shared/SidebarNav'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { complianceItems } from '@/lib/mockData'
import { ComplianceState } from '@/lib/types'

const STORAGE_KEY = 'thinkprop_enrollment_state'
const SESSION_DATE_KEY = 'thinkprop_enrollment_session_date'

const assistantResponses = {
  q1: `Based on your profile, these three courses all count toward your RERA CPD Credits requirement: Property Valuation Fundamentals (8 credits), Real Estate Market Trends 2026 (6 credits), and RERA Regulations Update 2026 (4 credits). You need 9 more credits before 15 Mar 2026.`,
  q2: `The fastest path: enroll in Property Valuation Fundamentals (8 credits, next session 15 Mar) and RERA Regulations Update (4 credits, next session 20 Mar). Together they cover your full 15-credit requirement with 2 days to spare. Both are covered by your organisation.`,
  q3: `If your RERA license expires, you will be unable to legally transact property in Dubai until it is renewed. This typically takes 2–4 weeks to resolve and may affect active deals. Your organisation is also notified. The good news: you have 18 days — enough time to complete at least one qualifying course before the deadline.`,
} as const

export default function LearnerDashboardPage() {
  const router = useRouter()
  const [activeQuestion, setActiveQuestion] = useState<keyof typeof assistantResponses | null>(null)
  const [enrollmentContext, setEnrollmentContext] = useState<{
    state: Record<string, ComplianceState>
    sessionDate: string | null
  }>(() => {
    const initialState = complianceItems.reduce<Record<string, ComplianceState>>((acc, item) => {
      acc[item.id] = item.state
      return acc
    }, {})

    return {
      state: initialState,
      sessionDate: null,
    }
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

  const reraItem = datedItems.find((item) => item.id === 'rera-cpd')
  const isReraEnrolled = reraItem?.state === 'ENROLLED'
  const nextComplianceItems = datedItems.filter((item) =>
    item.id === 'rera-cpd' ? item.state === 'ENROLLED' : true,
  ).slice(0, 2)

  const coursesForYou = [
    {
      id: 'property-valuation',
      relevance: 'Covers 9 of your 15 required credits',
      credits: 8,
      title: 'Property Valuation Fundamentals',
      provider: 'ThinkProp Academy · Sarah Al Mansoori, MRICS',
      format: 'Virtual + Classroom',
      nextDate: '15 Mar 2026',
    },
    {
      id: 'market-trends-2026',
      relevance: 'Popular with agents in your role',
      credits: 6,
      title: 'Real Estate Market Trends 2026',
      provider: 'ThinkProp Academy · Dr. Khalid Al Hammadi',
      format: 'Virtual',
      nextDate: '18 Mar 2026',
    },
    {
      id: 'rera-regulations',
      relevance: 'Required for your license renewal',
      credits: 4,
      title: 'RERA Regulations Update 2026',
      provider: 'ThinkProp Academy · Fatima Al Zaabi',
      format: 'Virtual',
      nextDate: '20 Mar 2026',
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav variant="learner" activePath="/learner/dashboard" />

      <div className="flex flex-1 overflow-hidden pt-16 md:ml-60 md:pt-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mx-auto w-full space-y-8 pr-8 py-8">
            <header className="flex items-start justify-between">
              <div className=''>
                <p className="mb-6 type-caption text-muted">
                  Learner Dashboard
                </p>
                <h1 className="type-title">Good morning, Reem.</h1>
                <p className="mt-0.5 type-caption text-muted">Saturday, 28 Feb 2026</p>
              </div>

              <button type="button" className="relative cursor-pointer text-admin-muted transition-colors hover:text-admin-heading" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-state-critical" />
              </button>
            </header>

            {!isReraEnrolled ? (
              <section className="animate-fade-in flex items-center gap-3 rounded-lg border border-state-critical/20 bg-state-critical-bg p-4">
                <AlertTriangle size={16} className="shrink-0 text-state-critical" />
                <div className="flex-1">
                  <p className="type-body-sm text-state-critical">
                    <span className="font-semibold">Action Required:</span>{' '}
                    1 certification is now in critical window.
                  </p>
                  <p className="mt-0.5 type-caption text-state-critical/70">Earliest deadline in 18 days.</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto gap-1 rounded-xl type-caption font-semibold text-state-critical hover:bg-state-critical/10 hover:text-state-critical"
                  onClick={() => router.push('/learner/compliance/rera-cpd')}
                >
                  View Details
                  <ArrowRight size={12} />
                </Button>
              </section>
            ) : null}

            <section className="space-y-3">
              <h2 className="type-body font-semibold">Today&apos;s Focus</h2>

              {isReraEnrolled ? (
                <Card className="animate-fade-in shadow-md">
                  <CardContent className="p-6 pt-5">
                    <div className="mb-2 flex items-center gap-3">
                      <CheckCircle size={20} className="text-state-enrolled" />
                      <p className="type-title-sm text-state-enrolled">You&apos;re enrolled in Property Valuation Fundamentals.</p>
                    </div>

                    {/* <p className="mb-1 type-body-sm text-loud">You&apos;re enrolled in Property Valuation Fundamentals.</p> */}
                    <p className="mb-4 type-body">Session on 15 Mar 2026 · Virtual (Zoom) - <span className='text-calm italic'>Link sent to your email.</span></p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="secondary">
                        <CalendarPlus />
                        Add to Calendar
                      </Button>
                      <Button
                        variant="ghost"
                        className="gap-2 rounded-xl"
                        onClick={() => router.push('/learner/courses/property-valuation')}
                      >
                        <BookOpen />
                        View Enrolled Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="animate-fade-in shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-0 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-state-critical" />
                        <p className="type-title-upper text-state-critical">Top Priority</p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-state-critical-bg px-3 py-1">
                        <Clock size={11} className="text-state-critical" />
                        <span className="type-data text-state-critical">18 days left</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <h3 className="type-title-sm">RERA CPD Credits</h3>
                        <p className="mb-4 type-body-sm">
                          Your RERA broker license may be suspended if not completed by 15 Mar 2026.
                        </p>
                        <div className='max-w-sm space-y-4'>
                          <div>
                            <div className="mb-1.5 flex items-center justify-between">
                              <p className="type-caption text-calm">Credits Progress: <span className="text-loud font-semibold">6 / 15 credits</span></p>
                            </div>
                            <div className="h-2 w-full rounded-full bg-primary-weaker">
                              <div className="h-full rounded-full bg-primary" style={{ width: '40%' }} />
                            </div>
                          </div>
                          <div>
                            <p className="py-2 type-title-upper text-loud">Why this matters</p>
                            {[
                              'License valid for all transactions',
                              'Required by RERA regulations',
                              'Covered by your organisation',
                            ].map((item) => (
                              <div key={item} className="flex items-center gap-2">
                                <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                                <p className="type-body-sm text-calm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-end">
                        <Button
                          onClick={() => router.push('/learner/compliance/rera-cpd')}
                        >
                          Find a Course Now
                          <ArrowRight size={15} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>

            <section className="space-y-3">
              <div className="flex flex-col">
                <h2 className="type-body font-semibold">Next for your Compliance</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {nextComplianceItems.map((item) => (
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

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="type-body font-semibold">Your Path</h2>
                <div className="rounded-full border border-admin-border bg-admin-card px-3 py-1 type-caption text-muted">
                  1 of 4 milestones completed
                </div>
              </div>

              <Card className="">
                <CardContent className="p-6">
                  <div className="relative hidden items-start justify-between md:flex">
                    <div className="absolute left-0 right-0 top-5 z-0 h-px bg-admin-border" />
                    <div className="relative z-10 flex w-1/4 flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-navy bg-brand-navy">
                        <CheckCircle size={18} className="text-white" />
                      </div>
                      <p className="mt-3 type-body-sm text-loud">Mandatory Training</p>
                      <p className="mt-0.5 type-caption text-state-compliant">Done ✓</p>
                    </div>

                    <div className="relative z-10 flex w-1/4 flex-col items-center text-center">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary">
                        <span className="type-body-sm font-bold text-white">2</span>
                        <span className="absolute inset-0 animate-ping rounded-full border-2 border-primary/40" />
                      </div>
                      <p className="mt-3 type-body-sm text-primary">RERA CPD Credits</p>
                      <p className="mt-0.5 type-caption text-primary">In Progress</p>
                    </div>

                    <div className="relative z-10 flex w-1/4 flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-admin-border bg-admin-surface">
                        <Lock size={16} className="text-admin-faint" />
                      </div>
                      <p className="mt-3 type-body-sm text-muted">Specialisation Elective</p>
                      <p className="mt-0.5 type-caption text-muted">Locked</p>
                      <p className="mt-0.5 type-data text-muted">~Q3 2026</p>
                    </div>

                    <div className="relative z-10 flex w-1/4 flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-admin-border bg-admin-surface">
                        <Lock size={16} className="text-admin-faint" />
                      </div>
                      <p className="mt-3 type-body-sm text-muted">Senior Agent Certification</p>
                      <p className="mt-0.5 type-caption text-muted">Locked</p>
                      <p className="mt-0.5 type-data text-muted">~Q3 2026</p>
                    </div>
                  </div>

                  <div className="space-y-4 md:hidden">
                    {[
                      { title: 'Mandatory Training', status: 'Done ✓', done: true },
                      { title: 'RERA CPD Credits', status: 'In Progress', active: true },
                      { title: 'Specialisation Elective', status: 'Locked', eta: '~Q3 2026' },
                      { title: 'Senior Agent Certification', status: 'Locked', eta: '~Q3 2026' },
                    ].map((step, index) => (
                      <div key={step.title} className="flex items-start gap-3">
                        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-admin-border bg-admin-surface">
                          {step.done ? (
                            <CheckCircle size={14} className="text-state-compliant" />
                          ) : step.active ? (
                            <span className="type-caption font-bold text-primary">{index + 1}</span>
                          ) : (
                            <Lock size={14} className="text-admin-faint" />
                          )}
                        </div>
                        <div>
                          <p className={`type-body-sm ${step.active ? 'text-primary' : step.done ? 'text-loud' : 'text-muted'}`}>
                            {step.title}
                          </p>
                          <p className={`type-caption ${step.active ? 'text-primary' : step.done ? 'text-state-compliant' : 'text-muted'}`}>
                            {step.status}
                          </p>
                          {step.eta ? <p className="type-data text-muted">{step.eta}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-admin-border pt-5">
                    <Lightbulb size={14} className="shrink-0 text-primary" />
                    <p className="type-caption text-muted">
                      Complete your RERA CPD Credits to unlock the Specialisation Elective and move one step closer to Senior Agent Certification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-4 pb-6">
              <div className="flex items-center justify-between">
                <h2 className="type-body font-semibold">Courses For You</h2>
                <Button
                  variant="link"
                  className="h-auto gap-1 p-0 type-body-sm font-semibold text-state-enrolled"
                  onClick={() => router.push('/learner/courses?requirement=rera-cpd')}
                >
                  Browse all
                  <ArrowRight size={12} />
                </Button>
              </div>

              <div className="space-y-3">
                {coursesForYou.map((course) => (
                  <Card
                    key={course.id}
                    className="cursor-pointer transition-shadow duration-200 shadow-sm hover:shadow-md"
                    onClick={() => router.push(`/learner/courses/${course.id}`)}
                  >
                    <CardContent className="p-5">
                      <div className="mb-3 flex items-start justify-between">
                        <span className="rounded-full border border-state-enrolled/20 bg-state-enrolled-bg px-2.5 py-1 type-caption font-semibold text-state-enrolled">
                          {course.relevance}
                        </span>
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 type-caption font-semibold text-primary">
                          {course.credits} CPD Credits
                        </span>
                      </div>

                      <h3 className="mb-1 type-title-sm">{course.title}</h3>
                      <p className="type-caption text-muted">{course.provider}</p>

                      <div className="mt-3 flex items-center justify-between border-t border-admin-border pt-3">
                        <div className="flex items-center gap-3">
                          <span className="rounded-md border border-admin-border bg-admin-surface px-2 py-0.5 type-caption text-default">
                            {course.format}
                          </span>
                          <span className="type-data text-muted">{course.nextDate}</span>
                        </div>
                        <span className="type-caption font-semibold text-state-enrolled">View Details →</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto border-l border-admin-border xl:flex">
          <div className="shrink-0 border-b border-admin-border px-5 py-5">
            <p className="type-title-sm">Reem&apos;s Assistant</p>
            <p className="mt-0.5 type-caption text-muted">Personalised to your compliance status</p>
          </div>

          <div className="border-b border-admin-border px-5 py-5">
            <p className="mb-4 type-title-upper text-muted">Your Goal</p>
            <div className="rounded-lg border border-admin-border bg-admin-surface p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Target size={16} className="text-primary" />
                </div>
                <div>
                  <p className="type-body-sm text-loud">Senior Agent Certification</p>
                  <p className="mt-0.5 type-data text-muted">Target: Q4 2026</p>
                </div>
              </div>

              <div className="mb-1 flex items-center justify-between">
                <p className="type-title-upper text-muted">Overall Progress</p>
                <p className="type-data">25%</p>
              </div>
              <div className="h-1.5 w-full rounded-full bg-admin-border">
                <div className="h-full w-1/4 rounded-full bg-primary transition-all duration-700" />
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 type-caption text-muted line-through">
                  <CheckCircle size={11} className="text-state-compliant" />
                  Mandatory Training
                </div>
                <div className="flex items-center gap-2 type-caption font-medium text-loud">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-primary/20" />
                  RERA CPD Credits
                </div>
                <div className="flex items-center gap-2 type-caption text-muted">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-admin-border" />
                  Specialisation Elective
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-b border-admin-border px-5 py-5">
            <p className="mb-4 type-title-upper text-muted">Today&apos;s Agenda</p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => router.push('/learner/compliance/rera-cpd')}
                className="flex w-full items-start gap-3 rounded-xl border border-admin-border bg-admin-surface p-3 text-left"
              >
                <div className={`mt-1.5 size-2 shrink-0 rounded-full ${isReraEnrolled ? 'bg-state-at-risk' : 'animate-pulse bg-state-critical'}`} />
                <div className="flex-1">
                  <p className="type-body-sm text-loud">Enroll in a RERA CPD course</p>
                  <p className="mt-0.5 type-caption text-muted">18 days remaining · AED 600 covered</p>
                </div>
                <ArrowRight size={11} className="self-center text-admin-faint" />
              </button>

              <div className="flex items-start gap-3 rounded-xl border border-admin-border bg-admin-surface p-3">
                <div className="mt-1.5 size-2 shrink-0 rounded-full bg-state-at-risk" />
                <div className="flex-1">
                  <p className="type-body-sm text-loud">Complete AML Certificate renewal</p>
                  <p className="mt-0.5 type-caption text-muted">27 days remaining · Review options</p>
                </div>
              </div>

              {isReraEnrolled ? (
                <div className="flex items-start gap-3 rounded-xl border border-admin-border bg-admin-surface p-3">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-state-compliant" />
                  <div className="flex-1">
                    <p className="type-body-sm text-loud">RERA CPD enrollment confirmed</p>
                    <p className="mt-0.5 type-caption text-muted">Session on 15 Mar 2026 · Zoom link sent</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div> */}

          <div className="flex-1 px-5 py-5">
            <p className="mb-1 type-title-upper text-muted">Ask ThinkProp</p>
            <p className="mb-4 type-caption text-muted">Your compliance questions, answered.</p>

            <div>
              {[
                { id: 'q1', label: 'Which courses count toward my RERA CPD renewal?' },
                { id: 'q2', label: "What's the fastest way to complete my requirements?" },
                { id: 'q3', label: 'What happens if my license expires?' },
              ].map((question) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setActiveQuestion(question.id as keyof typeof assistantResponses)}
                  className="mb-2 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2.5 text-left type-body-sm text-default transition-colors hover:border-admin-border-strong hover:text-loud"
                >
                  {question.label}
                </button>
              ))}
            </div>

            {activeQuestion ? (
              <div className="animate-fade-in mt-3 rounded-xl border border-admin-border bg-admin-surface p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={13} className="text-primary" />
                  <p className="type-body-sm text-loud">ThinkProp AI</p>
                  <p className="type-caption text-muted">· Based on your profile</p>
                </div>

                <p className="type-body-sm text-default">{assistantResponses[activeQuestion]}</p>

                <div className="mt-3 flex items-center gap-2 border-t border-admin-border pt-3">
                  <p className="type-caption text-muted">Was this helpful?</p>
                  <div className="flex items-center gap-2 text-admin-faint">
                    <ThumbsUp size={11} className="cursor-pointer transition-colors hover:text-admin-heading" />
                    <ThumbsDown size={11} className="cursor-pointer transition-colors hover:text-admin-heading" />
                  </div>
                </div>
              </div>
            ) : null}

            <form
              className="mt-4 border-t border-admin-border pt-4"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <div className="relative">
                <Input
                  placeholder="Ask a compliance question..."
                  className="h-10 rounded-xl border-admin-border bg-admin-surface py-3 pl-4 pr-10 type-body-sm placeholder:text-admin-faint focus-visible:ring-primary/30"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg bg-primary"
                  aria-label="Send"
                >
                  <SendHorizontal size={11} className="text-white" />
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div >
  )
}
