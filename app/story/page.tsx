'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BookOpen, PlayCircle } from 'lucide-react'
import StoryEnding from '@/components/story/StoryEnding'
import StoryShell from '@/components/story/StoryShell'
import StoryStep from '@/components/story/StoryStep'
import { Button } from '@/components/ui/button'

interface StoryStepData {
  id: string
  act: 1 | 2 | 3
  layout: 'intro' | 'narrative' | 'screen'
  stepLabel: string
  headline: string
  body: string
  insight?: string
  mockupId?: string
  mockupCaption?: string
  characterData?: {
    name: string
    role: string
    company: string
    initials: string
    colorScheme: 'blue' | 'amber'
    quote: string
    details: string[]
  }
}

const STORY_STEPS: StoryStepData[] = [
  {
    id: 'act1-intro',
    act: 1,
    layout: 'narrative',
    stepLabel: 'The Setup',
    headline: "In Dubai's real estate market, your license is your livelihood.",
    body: "Every agent, broker, and property manager in Dubai operates under strict regulations enforced by RERA — the Real Estate Regulatory Agency. To keep their license valid, professionals must complete a set number of CPD credits every single year.\n\nMiss the deadline? Your license is suspended. You can't transact. Your deals fall through. Your clients go elsewhere.\n\nThis is the world our two characters live in.",
    insight: "CPD stands for Continuing Professional Development. Think of it as annual homework that keeps your job legal. It's not optional. It's not flexible. And the clock never stops.",
  },
  {
    id: 'act1-tariq',
    act: 1,
    layout: 'intro',
    stepLabel: 'Meet Character 1',
    headline: "Meet Tariq. He's responsible for all 40 of them.",
    body: "Tariq is the Training & Compliance Manager at Prestige Properties Dubai. His job is to ensure every single agent on his team maintains valid credentials at all times.\n\nRight now, his tools are a spreadsheet, a lot of WhatsApp messages, and a constant low-level anxiety that someone's license is about to lapse without him knowing.",
    characterData: {
      name: 'Tariq Hamdan',
      role: 'Training & Compliance Manager',
      company: 'Prestige Properties Dubai',
      initials: 'TH',
      colorScheme: 'amber',
      quote: "I always find out too late. By the time someone tells me there's a problem, it's already a crisis.",
      details: ['40 agents to monitor', 'Spreadsheet-based tracking', 'Reactive, not proactive', 'Spends 6hrs/week chasing'],
    },
  },
  {
    id: 'act1-reem',
    act: 1,
    layout: 'intro',
    stepLabel: 'Meet Character 2',
    headline: "Meet Reem. She's busy, she's good at her job, and she has 18 days.",
    body: "Reem is a senior real estate agent at Prestige Properties Dubai. She's managing six active client files, showing apartments three days a week, and closing deals that make her one of the top performers on her team.\n\nThe last thing on her mind is an admin deadline hiding in a platform she barely logs into. She doesn't even know the clock is ticking.",
    characterData: {
      name: 'Reem Al Mansoori',
      role: 'Senior Real Estate Agent',
      company: 'Prestige Properties Dubai',
      initials: 'RA',
      colorScheme: 'blue',
      quote: "I know I need to do the CPD training. I just keep thinking I'll do it next week.",
      details: ['6 active client files', 'RERA license holder', '18 days until expiry', "Doesn't know yet"],
    },
  },
  {
    id: 'act2-step1',
    act: 2,
    layout: 'screen',
    stepLabel: 'Tariq — Step 1 of 4',
    headline: 'Tariq opens his dashboard. The whole picture in one glance.',
    body: `Tariq logs into the admin side of ThinkProp. Four numbers tell him everything he needs to know about his team's compliance health right now — without running a single report, opening a spreadsheet, or sending a single message.\n\n74% compliance. 7 at risk. 3 expiring this week. He knows exactly where to look.`,
    insight: 'The KPI strip is designed to answer one question: "Do I have a problem today?" If any of those four numbers looks wrong, Tariq knows before anyone has to tell him.',
    mockupId: 'admin-overview',
    mockupCaption: 'Admin compliance overview — live org-wide status',
  },
  {
    id: 'act2-step2',
    act: 2,
    layout: 'screen',
    stepLabel: 'Tariq — Step 2 of 4',
    headline: 'He sees exactly who needs help. He clicks Remind.',
    body: `Below the KPI strip, the priority risk list shows him the five people who need immediate attention — ranked by urgency. Priya Nair has 6 days left and hasn't enrolled. That's a fire.\n\nHe clicks "Remind" next to Reem. A focused modal appears. He reviews the pre-written message, confirms, and sends. It takes less than 30 seconds.`,
    insight: "Tariq's old workflow was: export data → cross-reference → figure out who to chase → type a WhatsApp message. This replaces all of that. The work is done for him. He just decides and acts.",
    mockupId: 'reminder-modal',
    mockupCaption: 'Reminder modal — pre-written message ready to send',
  },
  {
    id: 'act2-step3',
    act: 2,
    layout: 'narrative',
    stepLabel: 'Tariq — Step 3 of 4',
    headline: "Sent. Now it's Reem's turn.",
    body: `Tariq clicks Send. The modal closes. A green confirmation toast appears at the corner of his screen: "Reminder sent to Reem Al Mansoori."\n\nHe moves on to the next name on the list. He'll come back later to check who has acted.\n\nMeanwhile, across the office, a notification just landed in Reem's inbox.`,
    insight: "Before ThinkProp, the average time between a compliance alert and a learner enrolling was 11 days. A frictionless reminder plus a one-click enrollment path brings that to under 3. In an 18-day window, that 8-day saving is the difference between compliant and lapsed.",
  },
  {
    id: 'act2-step4',
    act: 2,
    layout: 'narrative',
    stepLabel: 'Tariq — Step 4 of 4',
    headline: "From reactive to proactive. That's the whole product.",
    body: "Before ThinkProp, Tariq spent approximately 6 hours every week chasing compliance status across his team. He found out about problems when they became crises. He had no visibility until something broke.\n\nNow he opens one screen. He sees everything. He acts in seconds. The feedback loop closes itself.\n\nBut the loop isn't closed yet. Reem still needs to enroll. Let's follow her.",
    insight: 'The admin compliance dashboard is the primary enterprise sales surface. When Tariq shows this screen to his COO in a quarterly review, it\'s the moment the company decides whether to renew the ThinkProp contract.',
  },
  {
    id: 'act3-step1',
    act: 3,
    layout: 'screen',
    stepLabel: 'Reem — Step 1 of 5',
    headline: 'The reminder arrives. She opens the app.',
    body: "Reem receives a notification from ThinkProp: her RERA CPD Credits expire in 18 days. She's heard this vaguely in the back of her mind, but seeing it in writing — with a date — makes it real.\n\nShe opens the app. And this time, the platform meets her exactly where she is.",
    insight: "This is the moment the two journeys connect. Tariq's action is what brought Reem here. Without the reminder, she might not have logged in for another two weeks.",
    mockupId: 'learner-dashboard',
    mockupCaption: "Reem's dashboard — compliance cards sorted by urgency",
  },
  {
    id: 'act3-step2',
    act: 3,
    layout: 'screen',
    stepLabel: 'Reem — Step 2 of 5',
    headline: 'She clicks. Only the courses that count appear.',
    body: `Reem clicks "Find a Course" on the RERA CPD card. She doesn't land on a catalogue of hundreds of courses. She lands on a list of three — all pre-filtered to only show courses that satisfy her specific requirement.\n\nNo guessing. No reading the fine print. No calling support.`,
    insight: 'The biggest source of learner drop-off in compliance training is confusion about which courses actually count. We eliminate that question entirely before it can be asked.',
    mockupId: 'course-discovery',
    mockupCaption: 'Course list pre-filtered for RERA CPD Credits',
  },
  {
    id: 'act3-step3',
    act: 3,
    layout: 'screen',
    stepLabel: 'Reem — Step 3 of 5',
    headline: 'She picks a session. The enroll button changes.',
    body: `Reem selects Property Valuation Fundamentals — 8 credits gets her more than halfway to her annual requirement. She sees three available sessions with dates, formats, and seat counts.\n\nShe picks Session A. The enroll button activates. It doesn't say "AED 600." It says something much better.`,
    insight: "Showing seat availability creates genuine urgency — Session B only has 4 seats left. That's not a design trick. That's real information that helps Reem make a better decision.",
    mockupId: 'session-picker',
    mockupCaption: 'Session picker — Session A selected, enroll button active',
  },
  {
    id: 'act3-step4',
    act: 3,
    layout: 'screen',
    stepLabel: 'Reem — Step 4 of 5',
    headline: 'She enrolls. The company covers the cost. It takes 10 seconds.',
    body: `Reem clicks Enroll. A brief spinner. Then a confirmation screen.\n\nThe course fee — AED 600 — is covered by Prestige Properties Dubai's training account. Reem never saw a payment form. There was no checkout. The one thing that could have made her hesitate simply wasn't there.`,
    insight: 'Under our Model B payment assumption, the company pre-authorises a training budget. When Reem enrolls, the cost is charged automatically to that account. No approval needed. No friction. The most important design decision we made was choosing what NOT to show.',
    mockupId: 'enrollment-confirmation',
    mockupCaption: 'Enrollment confirmed — payment covered by organisation',
  },
  {
    id: 'act3-step5',
    act: 3,
    layout: 'screen',
    stepLabel: 'Reem — Step 5 of 5',
    headline: "She's enrolled. And Tariq already knows.",
    body: `Reem clicks "Return to Dashboard." The critical red card has transformed into a calm blue one: "RERA CPD — Enrolled · Session 15 Mar."\n\nAt the same moment, without any manual update, without a message, without a report — Tariq's dashboard reflects the change. Her row in his risk table is no longer red.\n\nThe loop is closed.`,
    mockupId: 'dashboard-updated',
    mockupCaption: 'Dashboard updated — RERA CPD now shows Enrolled state',
  },
]

export default function StoryPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)

  const currentStep = useMemo(
    () => (currentStepIndex >= 0 && currentStepIndex < STORY_STEPS.length ? STORY_STEPS[currentStepIndex] : null),
    [currentStepIndex],
  )

  const isLastStep = currentStepIndex === STORY_STEPS.length - 1

  const currentAct = useMemo(() => {
    if (currentStepIndex < 0) return 1
    if (!currentStep) return 3
    return currentStep.act
  }, [currentStepIndex, currentStep])

  const actLabel = useMemo(() => {
    if (currentStepIndex >= STORY_STEPS.length) return 'The Resolution'
    if (currentAct === 1) return 'Act 1 — The Problem'
    if (currentAct === 2) return "Act 2 — Tariq's Journey"
    return "Act 3 — Reem's Journey"
  }, [currentAct, currentStepIndex])

  const handleContinue = () => {
    if (!currentStep) return

    const nextIndex = currentStepIndex + 1
    if (nextIndex >= STORY_STEPS.length) {
      setCurrentStepIndex(STORY_STEPS.length)
      return
    }

    const nextStep = STORY_STEPS[nextIndex]
    const actChanging = nextStep.act !== currentStep.act
    if (actChanging && currentStep.act === 1 && nextStep.act === 2) {
      setCurrentStepIndex(nextIndex)
      return
    }
    setCurrentStepIndex(nextIndex)
  }

  if (currentStepIndex < 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-admin-surface bg-level-0 px-6 py-20">
        <div className="mb-12 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-base">
            <span className="font-display text-xs font-bold text-white">T</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="type-body-sm">ThinkProp</span>
            <span className="type-caption ml-0.5 text-primary-default">LMS</span>
          </div>
        </div>

        <span className="mb-6 inline-block rounded-full border border-primary-base/20 bg-primary-weaker px-4 py-1.5">
          <span className="type-caption text-primary-default">An Interactive Story</span>
        </span>

        <h1 className="type-display mb-4 max-w-2xl text-center">
          Don&apos;t Lose Your License
        </h1>
        <p className="type-body mb-3 max-w-xl text-center">
          Two people. One platform. A compliance deadline that could end a career.
        </p>

        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-3 rounded-2xl border border-admin-border border-border bg-admin-card bg-card px-5 py-4 shadow-card shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-primary-base/20 bg-primary-weaker font-display font-bold text-primary-default">
              TH
            </div>
            <div>
              <p className="type-body-sm">Tariq Hamdan</p>
              <p className="type-caption font-mono">40 agents to monitor</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-admin-border border-border bg-admin-card bg-card px-5 py-4 shadow-card shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-state-enrolled/20 bg-state-enrolled-bg font-display font-bold text-state-enrolled">
              RA
            </div>
            <div>
              <p className="type-body-sm">Reem Al Mansoori</p>
              <p className="type-caption font-mono text-state-critical">18 days to renewal</p>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-col items-center gap-8 rounded-2xl border border-admin-border bg-admin-card px-8 py-5 shadow-card sm:flex-row sm:gap-12">
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-3xl font-bold text-state-critical">
              6 hrs
            </span>
            <span className="mt-1 text-xs uppercase tracking-wide text-admin-faint">
              lost per week
            </span>
            <span className="mt-0.5 text-xs text-admin-muted">
              chasing compliance manually
            </span>
          </div>

          <div className="hidden h-10 w-px bg-admin-border sm:block" />

          <div className="flex flex-col items-center text-center">
            <span className="font-display text-3xl font-bold text-state-at-risk">
              11 days
            </span>
            <span className="mt-1 text-xs uppercase tracking-wide text-admin-faint">
              average delay
            </span>
            <span className="mt-0.5 text-xs text-admin-muted">
              from alert to enrollment
            </span>
          </div>

          <div className="hidden h-10 w-px bg-admin-border sm:block" />

          <div className="flex flex-col items-center text-center">
            <span className="font-display text-3xl font-bold text-state-compliant">
              AED 50k
            </span>
            <span className="mt-1 text-xs uppercase tracking-wide text-admin-faint">
              max fine per violation
            </span>
            <span className="mt-0.5 text-xs text-admin-muted">
              per RERA regulations
            </span>
          </div>
        </div>

        <Button
          onClick={() => setCurrentStepIndex(0)}
          className="h-12 gap-2 rounded-xl bg-primary px-10 font-semibold text-white transition-all duration-150 active:scale-[0.98] hover:bg-primary-strong"
        >
          <PlayCircle size={18} />
          Begin the Story
        </Button>

        <p className="type-caption mb-3 mt-5">Or jump straight to:</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/learner/dashboard" className="type-caption text-state-enrolled hover:underline">
            Learner Prototype →
          </Link>
          <Link href="/admin/compliance" className="type-caption text-primary-default hover:underline">
            Admin Prototype →
          </Link>
          <Link href="/" className="type-caption inline-flex items-center gap-1 hover:underline">
            <BookOpen size={12} />
            Navigator
          </Link>
        </div>
      </main>
    )
  }

  if (currentStepIndex >= STORY_STEPS.length) {
    return (
      <StoryShell
        currentStep={STORY_STEPS.length}
        totalSteps={STORY_STEPS.length}
        currentAct={3}
        actLabel="The Resolution"
        onBack={() => setCurrentStepIndex(STORY_STEPS.length - 1)}
      >
        <StoryEnding />
      </StoryShell>
    )
  }

  if (!currentStep) return null

  return (
    <StoryShell
      currentStep={currentStepIndex}
      totalSteps={STORY_STEPS.length}
      currentAct={currentAct}
      actLabel={actLabel}
      onBack={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
    >
      <StoryStep
        key={currentStep.id}
        step={currentStep}
        onContinue={handleContinue}
        isLastStep={isLastStep}
      />
    </StoryShell>
  )
}
