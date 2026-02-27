'use client'

import { ArrowRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CharacterCard from '@/components/story/CharacterCard'
import ScreenMockup from '@/components/story/ScreenMockup'

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

interface StoryStepProps {
  step: StoryStepData
  onContinue: () => void
  isLastStep?: boolean
}

function NarrativeBlock({
  step,
  onContinue,
  isLastStep,
}: StoryStepProps) {
  const paragraphs = step.body.split('\n\n')

  return (
    <div>
      <p className="type-title-upper mb-3">{step.stepLabel}</p>

      <h2 className="type-title mb-4">{step.headline}</h2>

      <div className="mb-6">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-body mb-3">
            {paragraph}
          </p>
        ))}
      </div>

      {step.insight && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-admin-border border-border bg-admin-card bg-card p-4">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-primary-default" />
          <p className="type-body-sm italic">{step.insight}</p>
        </div>
      )}

      <Button
        onClick={onContinue}
        className="h-11 gap-2 rounded-xl bg-primary px-6 font-semibold text-white transition-all duration-150 active:scale-[0.98] hover:bg-primary-strong"
      >
        {isLastStep ? 'See the Resolution' : 'Continue'}
        <ArrowRight size={14} />
      </Button>
    </div>
  )
}

export default function StoryStep({
  step,
  onContinue,
  isLastStep = false,
}: StoryStepProps) {
  if (step.layout === 'intro' && step.characterData) {
    return (
      <section className="mx-auto grid w-full max-w-3xl animate-fade-in grid-cols-1 gap-6 md:grid-cols-2">
        <NarrativeBlock step={step} onContinue={onContinue} isLastStep={isLastStep} />
        <CharacterCard {...step.characterData} />
      </section>
    )
  }

  if (step.layout === 'screen' && step.mockupId) {
    return (
      <section className="mx-auto grid w-full max-w-5xl animate-fade-in grid-cols-1 items-center gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <NarrativeBlock step={step} onContinue={onContinue} isLastStep={isLastStep} />
        </div>
        <div className="md:col-span-3">
          <ScreenMockup mockupId={step.mockupId} caption={step.mockupCaption} />
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-2xl animate-fade-in">
      <NarrativeBlock step={step} onContinue={onContinue} isLastStep={isLastStep} />
    </section>
  )
}
