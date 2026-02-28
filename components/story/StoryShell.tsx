'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import ThinkPropLogo from '@/components/story/ThinkPropLogo'
import { Button } from '@/components/ui/button'

interface StoryShellProps {
  currentStep: number
  totalSteps: number
  currentAct: 1 | 2 | 3
  actLabel: string
  onBack: () => void
  onNext?: () => void
  children: React.ReactNode
  backgroundImage?: string
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
  onNext,
  children,
  backgroundImage,
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
    <div className="min-h-screen bg-level-0 font-body">
      {backgroundImage && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="pointer-events-none fixed inset-0 z-0 bg-white/60 backdrop-blur-2xl" />
        </>
      )}
      <div className="pointer-events-none fixed inset-0 z-20 hidden md:block">
        <div className="grid h-full w-full grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="h-full bg-primary-base/8" />
          ))}
        </div>
      </div>
      <div className="fixed left-0 right-0 top-0 z-60 h-0.5 bg-transparent">
        <div
          className="h-full bg-primary-base transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 h-14 bg-admin-card/90 bg-card/90 backdrop-blur-sm">
        <div className="flex h-full items-center justify-between px-6">
          <ThinkPropLogo />

          <div className={`rounded-full px-3 py-1 ${actPillClassMap[currentAct]}`}>
            <p className="type-caption">{resolvedActLabel}</p>
          </div>

          <div className="type-caption">
            Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
          </div>
        </div>
      </header>

      <main className="relative grid min-h-screen grid-cols-12 gap-1 py-24">
        <div className="col-span-12 md:col-start-2 md:col-span-10">
          {children}
        </div>
      </main>

      <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
        <div className="grid h-full w-full grid-cols-12 gap-1 px-1">
          <div className="col-span-1 flex items-center justify-center">
            {currentStep >= 0 ? (
              <Button
                variant="outline"
                size="icon"
                withIcon="only"
                onClick={onBack}
                className="pointer-events-auto h-14 w-14 rounded-full border-admin-border border-border shadow-card shadow-sm"
              >
                <ChevronLeft size={30} />
              </Button>
            ) : null}
          </div>

          <div className="col-span-10" />

          <div className="col-span-1 flex items-center justify-center">
            {onNext ? (
              <Button
                variant="default"
                size="icon"
                withIcon="only"
                onClick={onNext}
                className="pointer-events-auto h-14 w-14 rounded-full"
              >
                <ChevronRight size={30} />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
