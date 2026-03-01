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
  headerAction?: React.ReactNode
  children: React.ReactNode
  backgroundImage?: string
}

export default function StoryShell({
  currentStep,
  totalSteps,
  currentAct: _currentAct,
  actLabel,
  onBack,
  onNext,
  headerAction,
  children,
  backgroundImage,
}: StoryShellProps) {
  const maxIndex = Math.max(totalSteps - 1, 1)
  const safeStep = Math.max(0, Math.min(currentStep, maxIndex))
  const progress = (safeStep / maxIndex) * 100

  return (
    <div className="min-h-screen bg-level-0 font-body" data-act={_currentAct}>
      {backgroundImage && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="pointer-events-none fixed inset-0 z-0 bg-white/60 backdrop-blur-2xl" />
        </>
      )}
      {/* <div className="pointer-events-none fixed inset-0 z-20 hidden md:block">
        <div className="grid h-full w-full grid-cols-12 gap-0">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="h-full bg-primary-base/8" />
          ))}
        </div>
      </div> */}
      <div className="fixed left-0 right-0 top-0 z-60 h-0.5 bg-transparent">
        <div
          className="h-full bg-primary-base transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 h-14">
        <div className="flex h-full items-center justify-between px-6">
          <ThinkPropLogo />

          {/* <div className={`rounded-full px-3 py-1 ${actPillClassMap[currentAct]}`}>
            <p className="type-caption">{resolvedActLabel}</p>
          </div> */}

          {headerAction ? (
            headerAction
          ) : actLabel !== 'The Resolution' ? (
            <div className="type-caption text-default">
              Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
            </div>
          ) : (
            <div />
          )}
        </div>
      </header>

      <main className="relative min-h-screen grid grid-cols-12 gap-1 py-24">
        <div className="col-span-10 md:col-start-2 md:col-span-10">
          {children}
        </div>
      </main>

      <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
        <div className="grid h-full w-full grid-cols-12">
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
