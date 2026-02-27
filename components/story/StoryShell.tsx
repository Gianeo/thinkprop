'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StoryShellProps {
  currentStep: number
  totalSteps: number
  currentAct: 1 | 2 | 3
  actLabel: string
  onBack: () => void
  children: React.ReactNode
}

const actPillClassMap: Record<1 | 2 | 3, string> = {
  1: 'bg-state-critical-bg text-state-critical',
  2: 'bg-state-enrolled-bg text-state-enrolled',
  3: 'bg-primary-weaker text-primary-default',
}

export default function StoryShell({
  currentStep,
  totalSteps,
  currentAct,
  actLabel,
  onBack,
  children,
}: StoryShellProps) {
  const maxIndex = Math.max(totalSteps - 1, 1)
  const safeStep = Math.max(0, Math.min(currentStep, maxIndex))
  const progress = (safeStep / maxIndex) * 100
  const resolvedActLabel =
    actLabel === 'The Resolution'
      ? actLabel
      : currentAct === 1
        ? 'Act 1 — The Problem'
        : currentAct === 2
          ? "Act 2 — Tariq's Journey"
          : "Act 3 — Reem's Journey"

  return (
    <div className="min-h-screen bg-admin-surface bg-level-0 font-body">
      <header className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-admin-border border-border bg-admin-card/90 bg-card/90 backdrop-blur-sm">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-base">
              <span className="font-display text-xs font-bold text-white">T</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="type-body-sm">ThinkProp</span>
              <span className="type-caption ml-0.5">LMS</span>
            </div>
          </div>

          <div className={`rounded-full px-3 py-1 ${actPillClassMap[currentAct]}`}>
            <p className="type-caption">{resolvedActLabel}</p>
          </div>

          <div className="font-mono type-caption">
            Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
          </div>
        </div>
      </header>

      <div className="fixed left-0 right-0 top-14 z-40 h-0.5 bg-admin-border bg-border">
        <div
          className="h-full bg-primary-base transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex min-h-screen items-center justify-center px-6 pb-24 pt-20">
        {children}
      </main>

      {currentStep > 0 && (
        <Button
          variant="outline"
          onClick={onBack}
          className="fixed bottom-6 left-6 gap-2 rounded-xl border-admin-border border-border shadow-card shadow-sm"
        >
          <ArrowLeft size={14} />
          Back
        </Button>
      )}
    </div>
  )
}
