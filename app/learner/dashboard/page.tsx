'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarPlus,
  Check,
  CheckCircle,
  Clock,
  LoaderCircle,
  Lock,
  SendHorizontal,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import SessionPicker from '@/components/learner/SessionPicker'
import SidebarNav from '@/components/shared/SidebarNav'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { complianceItems, courses } from '@/lib/mockData'
import { ComplianceState } from '@/lib/types'

const STORAGE_KEY = 'thinkprop_enrollment_state'
const SESSION_DATE_KEY = 'thinkprop_enrollment_session_date'

const assistantResponses = {
  q1: `Based on your profile, these three courses all count toward your RERA CPD Credits requirement: Property Valuation Fundamentals (8 credits), Real Estate Market Trends 2026 (6 credits), and RERA Regulations Update 2026 (4 credits). You need 9 more credits before 15 Mar 2026.`,
  q2: `The fastest path: enroll in Property Valuation Fundamentals (8 credits, next session 15 Mar) and RERA Regulations Update (4 credits, next session 20 Mar). Together they cover your full 15-credit requirement with 2 days to spare. Both are covered by your organisation.`,
  q3: `If your RERA license expires, you will be unable to legally transact property in Dubai until it is renewed. This typically takes 2–4 weeks to resolve and may affect active deals. Your organisation is also notified. The good news: you have 18 days — enough time to complete at least one qualifying course before the deadline.`,
} as const

type ComplianceTableRow = {
  id: string
  status: string
  statusVariant: 'default' | 'destructive' | 'warning' | 'primary' | 'success'
  credential: string
  deadline: string
  actionLabel: string
  actionVariant?: 'neutral' | 'default'
  onClick: () => void
}

export default function LearnerDashboardPage() {
  const router = useRouter()
  const [activeQuestion, setActiveQuestion] = useState<keyof typeof assistantResponses | null>(null)
  const [isCourseDrawerOpen, setIsCourseDrawerOpen] = useState(false)
  const [selectedDrawerSession, setSelectedDrawerSession] = useState<string | null>(null)
  const [isDrawerEnrolling, setIsDrawerEnrolling] = useState(false)
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
  const isActionRequired = reraItem?.state === 'CRITICAL'
  const reraRegulationsCourse = courses.find((course) => course.id === 'rera-regulations')

  const handleDrawerEnroll = () => {
    if (!reraRegulationsCourse || !selectedDrawerSession) {
      return
    }

    setIsDrawerEnrolling(true)
    window.setTimeout(() => {
      setIsDrawerEnrolling(false)
      setIsCourseDrawerOpen(false)
      router.push(`/learner/courses/${reraRegulationsCourse.id}/confirmation?session=${selectedDrawerSession}`)
    }, 1500)
  }
  const primaryNextItem =
    (isReraEnrolled
      ? datedItems.find((item) => item.id === 'rera-cpd' && item.state === 'ENROLLED')
      : datedItems.find((item) => item.id === 'aml-cert')) ??
    datedItems.find((item) => item.id !== 'prop-mgmt')

  const nextComplianceRows: ComplianceTableRow[] = []

  if (primaryNextItem) {
    nextComplianceRows.push({
      id: primaryNextItem.id,
      credential: primaryNextItem.title,
      status:
        primaryNextItem.state === 'CRITICAL'
          ? 'Critical'
          : primaryNextItem.state === 'AT_RISK'
            ? 'At Risk'
            : primaryNextItem.state === 'ENROLLED'
              ? 'Enrolled'
              : 'Compliant',
      statusVariant:
        primaryNextItem.state === 'CRITICAL'
          ? 'destructive'
          : primaryNextItem.state === 'AT_RISK'
            ? 'warning'
            : primaryNextItem.state === 'ENROLLED'
              ? 'primary'
              : 'success',
      deadline:
        primaryNextItem.state === 'ENROLLED'
          ? `Session ${primaryNextItem.expiryDate}`
          : primaryNextItem.daysRemaining !== null
            ? `${primaryNextItem.daysRemaining} days left`
            : `Due ${primaryNextItem.expiryDate}`,
      actionLabel:
        primaryNextItem.state === 'ENROLLED' ? 'View Course' : 'Take Action',
      actionVariant:
        primaryNextItem.state === 'ENROLLED' ? 'neutral' : 'default',
      onClick:
        primaryNextItem.state === 'ENROLLED'
          ? () => router.push('/learner/courses/property-valuation')
          : () => router.push('/learner/compliance/rera-cpd'),
    })
  }

  nextComplianceRows.push({
    id: 'prop-mgmt-upcoming',
    credential: 'Property Management License',
    status: 'Upcoming',
    statusVariant: 'default',
    deadline: 'Due 1 Jun 2026 (in 3 months)',
    actionLabel: 'View Requirement',
    actionVariant: 'neutral',
    onClick: () => router.push('/learner/compliance/prop-mgmt'),
  })

  nextComplianceRows.push({
    id: 'ethics-cpd-upcoming',
    status: 'Upcoming',
    statusVariant: 'default',
    credential: 'Ethics CPD Refresher',
    deadline: 'Due 15 Jul 2026 (in 4.5 months)',
    actionLabel: 'View Requirement',
    actionVariant: 'neutral',
    onClick: () => router.push('/learner/courses?requirement=rera-cpd'),
  })

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

      <div className="flex flex-1 overflow-hidden pt-16 md:ml-56 md:pt-0">
        <div className="flex-1 w-full overflow-y-auto px-8 mr-4 shadow bg-white/75">
          <div className="w-full space-y-8 py-8">
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
              <section className="animate-fade-in flex items-center gap-3 rounded-lg border border-state-critical/20 bg-state-critical-bg p-4 md:hidden">
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
                  className="h-auto gap-1 rounded-lg type-caption font-semibold text-state-critical hover:bg-state-critical/10 hover:text-state-critical"
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
                        className="gap-2 rounded-lg"
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
                        <p className="type-title-upper font-bold text-state-critical">Top Priority</p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-state-critical-bg px-3 py-1">
                        <Clock size={11} className="text-state-critical" />
                        <span className="type-data text-state-critical">18 days left</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <h3 className="type-title-sm">RERA CPD Credits</h3>
                        <p className="mb-4 type-body">
                          Your RERA broker license may be suspended if not completed by 15 Mar 2026.
                        </p>
                        <div className='max-w-sm space-y-4'>
                          <div>
                            <div className="mb-1.5 flex items-center justify-between">
                              <p className="type-body-sm text-muted">Credits Progress: <span className="text-loud font-semibold">6 / 15 credits</span></p>
                            </div>
                            <div className="h-2 w-full rounded-full bg-primary-weaker">
                              <div className="h-full rounded-full bg-primary" style={{ width: '40%' }} />
                            </div>
                          </div>
                          <div className='space-y-1'>
                            <p className="py-1 type-body-sm text-muted">Why this matters:</p>
                            {[
                              'License valid for all transactions',
                              'Required by RERA regulations',
                              'Covered by your organisation',
                            ].map((item) => (
                              <div key={item} className="flex items-center gap-2">
                                <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                                <p className="type-body-sm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-end">
                        <Button
                          onClick={() => {
                            setSelectedDrawerSession(null)
                            setIsCourseDrawerOpen(true)
                          }}
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
                <p className="type-caption text-muted">
                  Typical annual compliance load: 9-12 CE hours (about 2-4 courses/year).
                </p>
              </div>
              <Card className="shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>STATUS</TableHead>
                      <TableHead>CREDENTIAL</TableHead>
                      <TableHead>DEADLINE</TableHead>
                      <TableHead className="text-right" aria-label="Actions" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nextComplianceRows.map((row) => (
                      <TableRow key={row.id} className={row.status === 'At Risk' ? 'bg-warning-weaker' : undefined}>
                        <TableCell>
                          <Badge variant={row.statusVariant} size="sm">
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="type-body-sm text-loud">{row.credential}</TableCell>
                        <TableCell className="type-body-sm text-calm">{row.deadline}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="link"
                            size="sm"
                            className={`h-auto p-0 type-body-sm ${row.actionVariant === 'neutral'
                                ? 'text-muted hover:text-default'
                                : ''
                              }`}
                            onClick={row.onClick}
                          >
                            {row.actionLabel}
                            <ArrowRight size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </section>

            <section className="space-y-2 pb-6">
              <div className="flex items-center justify-between">
                <h2 className="type-body font-semibold">Courses For You</h2>
                <Button
                  variant="link"
                  size="sm"
                  className=""
                  onClick={() => router.push('/learner/courses?requirement=rera-cpd')}
                >
                  Browse all
                  <ArrowRight />
                </Button>
              </div>

              <div className="space-y-3">
                {coursesForYou.map((course) => (
                  <Card
                    key={course.id}
                    className="cursor-pointer transition-shadow duration-200 shadow-sm hover:shadow-md"
                    onClick={() => router.push(`/learner/courses/${course.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 flex gap-2 items-start">
                        <Badge size="sm" variant="primary">
                          {course.relevance}
                        </Badge>
                        <Badge size="sm">
                          {course.credits} CPD Credits
                        </Badge>
                      </div>

                      <h3 className="mb-1 type-title-sm">{course.title}</h3>
                      <p className="type-body-sm text-calm">{course.provider}</p>

                      <div className="mt-3 flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <span className="type-body-sm text-default">
                            {course.format}
                          </span>
                          <span className="type-body-sm text-muted">{course.nextDate}</span>
                        </div>
                        <span className="type-body-sm font-semibold text-state-enrolled">View Details →</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto xl:flex pr-4">
          <div className="shrink-0 p-4 pt-6">
            <p className="type-title-sm">Reem&apos;s Assistant</p>
            <p className="type-caption text-muted">Personalised to your compliance status</p>
          </div>

          <div className="p-4 pt-0">
            <p className="mb-2 type-body font-semibold">Notifications</p>
            <Card className="shadow-sm">
              <CardContent className="space-y-4 p-4">
                {!isReraEnrolled ? (
                  <div className="flex items-start gap-2 rounded-md bg-destructive-weaker p-2">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-destructive-default" />
                    <div>
                      <p className="type-body-sm text-destructive-default">Action Required</p>
                      <p className="type-caption text-default mt-0.5">
                        RERA CPD deadline is in 18 days. Start now to stay compliant.
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-2">
                  <Bell className={`mt-0.5 size-3.5 shrink-0 ${isReraEnrolled ? 'text-success-default' : 'text-warning-default'}`} />
                  <div>
                    <p className={`type-body-sm ${isReraEnrolled ? 'text-success-default' : 'text-warning-default'}`}>
                      {isReraEnrolled ? 'Enrollment confirmed' : 'License renewal reminder'}
                    </p>
                    <p className="type-caption text-muted mt-0.5">
                      {isReraEnrolled
                        ? 'Session booked for 15 Mar 2026. Calendar invite sent.'
                        : 'You have enough time to complete your requirement this month.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="type-body font-semibold">Your Path</p>
              {/* <span className="rounded-full border border-admin-border bg-admin-surface px-2 py-0.5 type-caption text-muted">
                1 / 4
              </span> */}
            </div>

            <Card className="shadow-sm">
              <CardContent className="space-y-6 p-4">
                {[
                  { title: 'Mandatory Training', status: 'Done', done: true },
                  {
                    title: 'RERA CPD Credits',
                    status: isActionRequired ? 'Action required' : 'In Progress',
                    active: true,
                    actionRequired: isActionRequired,
                  },
                  { title: 'Specialisation Elective', status: '', eta: '~Q3 2026' },
                  { title: 'Senior Agent Certification', status: '', eta: '~Q4 2026' },
                ].map((step, index) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex size-7 items-center justify-center rounded-full ${step.done
                        ? 'border-success bg-success'
                        : step.active
                          ? step.actionRequired
                            ? 'text-destructive-default bg-destructive-weaker'
                            : 'text-primary bg-primary-weaker'
                          : 'bg-neutral-weaker'
                      }`}>
                      {step.done ? (
                        <CheckCircle className="size-5 text-weak" />
                      ) : step.active ? (
                        <span className={`type-body-sm ${step.actionRequired ? 'text-destructive-default' : 'text-primary'}`}>
                          {index + 1}
                        </span>
                      ) : (
                        <Lock className="size-3.5 text-admin-faint" />
                      )}
                    </div>
                    <div>
                      <p className={`type-body-sm ${step.done
                          ? 'text-default'
                          : step.active
                            ? step.actionRequired
                              ? 'text-destructive-default'
                              : 'text-primary'
                            : 'text-muted'
                        }`}>
                        {step.title}
                      </p>
                      <p className={`type-caption ${step.done
                          ? 'text-default'
                          : step.active
                            ? step.actionRequired
                              ? 'text-destructive-default'
                              : 'text-primary'
                            : 'text-muted'
                        }`}>
                        {step.status}
                      </p>
                      {step.eta ? <p className="type-caption text-muted">{step.eta}</p> : null}
                    </div>
                  </div>
                ))}

                <div className="border-t border-admin-border pt-3">
                  <p className="type-caption text-muted">
                    Complete RERA CPD to unlock the next milestone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-auto border-t border-admin-border p-4">
            <p className="mb-0.5 type-body font-semibold">Ask ThinkProp</p>
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
                  className="mb-2 w-full rounded-lg border border-admin-border bg-admin-surface px-3 py-2.5 text-left type-body-sm text-default transition-colors hover:border-admin-border-strong hover:text-loud"
                >
                  {question.label}
                </button>
              ))}
            </div>

            {activeQuestion ? (
              <div className="animate-fade-in mt-3 rounded-lg border border-admin-border bg-admin-surface p-4">
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
                  className="h-12 bg-white placeholder:text-admin-faint"
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

      <Drawer open={isCourseDrawerOpen} onOpenChange={setIsCourseDrawerOpen}>
        <DrawerContent className="overflow-y-auto rounded-none p-0">
          <div className="border-b border-admin-border p-6">
            <DrawerHeader className="space-y-2 text-left">
              <p className="type-title-upper text-muted">Recommended Course</p>
              <DrawerTitle className="type-title-sm text-loud">
                RERA Regulations Update 2026
              </DrawerTitle>
            </DrawerHeader>
            <p className="type-body-sm text-muted">
              This is the fastest way to reduce compliance risk in your current 18-day window.
            </p>
          </div>

          {reraRegulationsCourse ? (
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" size="sm">{reraRegulationsCourse.credits} CPD Credits</Badge>
                  {reraRegulationsCourse.format.map((entry) => (
                    <Badge key={entry} variant="default" size="sm">{entry}</Badge>
                  ))}
                </div>

                <div>
                  <p className="type-caption text-muted mb-0.5">Provider</p>
                  <p className="type-body font-semibold text-default">{reraRegulationsCourse.provider} · {reraRegulationsCourse.instructor}</p>
                </div>

                <div>
                  <p className="type-caption text-muted mb-0.5">About this course</p>
                  <p className="type-body">{reraRegulationsCourse.description}</p>
                </div>

                <div>
                  <p className="type-caption text-muted mb-0.5">What you&apos;ll learn</p>
                  <ul className="mt-2 space-y-2">
                    {reraRegulationsCourse.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2 type-body-sm text-default">
                        <Check className="mt-0.5 size-4" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="type-caption text-muted mb-0.5">Price</p>
                  <p className="type-body font-semibold text-default">AED {reraRegulationsCourse.price}</p>
                </div>
              </div>

              <div className="space-y-2 mt-8 mb-6">
                <p className="type-title-upper text-muted">Available Sessions</p>
                <SessionPicker
                  sessions={reraRegulationsCourse.sessions}
                  selectedId={selectedDrawerSession}
                  onSelect={setSelectedDrawerSession}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                {isDrawerEnrolling ? (
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-wire-border bg-level-2 py-3 type-body-sm font-semibold text-muted">
                    <LoaderCircle className="size-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <Button
                    onClick={handleDrawerEnroll}
                    disabled={!selectedDrawerSession}
                    className={`w-full rounded-xl py-3 font-semibold ${selectedDrawerSession
                        ? 'bg-primary text-contrast hover:bg-primary-stronger'
                        : 'cursor-not-allowed bg-wire-border text-muted'
                      }`}
                  >
                    Enroll Now — Covered by your organisation
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setIsCourseDrawerOpen(false)
                    router.push('/learner/courses?requirement=rera-cpd')
                  }}
                >
                  Browse all courses
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <p className="type-body-sm text-muted">Course details unavailable.</p>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div >
  )
}
