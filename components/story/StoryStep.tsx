'use client'

import Image from 'next/image'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CharacterCard from '@/components/story/CharacterCard'
import ScreenMockup from '@/components/story/ScreenMockup'
import { Badge } from '../ui/badge'

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
  storyImages?: string[]
  imagePosition?: 'left' | 'right'
  characterData?: {
    name: string
    role: string
    company: string
    initials: string
    colorScheme: 'blue' | 'amber'
    quote: string
    details: string[]
    image?: string
    description?: string
  }
  secondaryCharacterData?: {
    name: string
    role: string
    company: string
    initials: string
    colorScheme: 'blue' | 'amber'
    quote: string
    details: string[]
    image?: string
    description?: string
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
    <div className='space-y-6 py-16'>
      <Badge variant="primary">{step.stepLabel}</Badge>

      <h2 className="type-display">{step.headline}</h2>

      <div className="space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-body">
            {paragraph}
          </p>
        ))}
      </div>

      {step.insight && (
        <div className="my-12 flex items-start gap-3">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-primary-default" />
          <p className="type-body-sm text-calm italic">{step.insight}</p>
        </div>
      )}

      <Button
        onClick={onContinue}
        className="md:hidden"
      >
        {isLastStep ? 'See the Resolution' : 'Continue'}
        <ArrowRight size={14} />
      </Button>
    </div>
  )
}

function StoryImageRail({
  images,
}: {
  images: string[]
}) {
  if (!images.length) return null

  return (
    <div className="grid gap-3">
      {images.map((img, idx) => (
        <div key={`${img}-${idx}`} className="relative min-h-48 overflow-hidden rounded-xl border border-admin-border border-border bg-level-1">
          <Image src={img} alt="Story visual" fill className="object-cover" />
        </div>
      ))}
    </div>
  )
}

export default function StoryStep({
  step,
  onContinue,
  isLastStep = false,
}: StoryStepProps) {
  if (step.layout === 'intro' && step.characterData) {
    const twoCards = Boolean(step.secondaryCharacterData)
    return (
      <section className="grid w-full animate-fade-in grid-cols-1 md:grid-cols-10">
        <div className={`${twoCards ? 'md:col-span-12' : 'md:col-span-5'}`}>
          <NarrativeBlock step={step} onContinue={onContinue} isLastStep={isLastStep} />
        </div>
        <div className={`${twoCards ? 'md:col-span-6' : 'md:col-span-7'}`}>
          <CharacterCard {...step.characterData} />
        </div>
        {step.secondaryCharacterData && (
          <div className="md:col-span-6">
            <CharacterCard {...step.secondaryCharacterData} />
          </div>
        )}
      </section>
    )
  }

  if (step.layout === 'screen' && step.mockupId) {
    const hasImages = Boolean(step.storyImages?.length)
    const isLeft = step.imagePosition === 'left'

    return (
      <section className="grid w-full animate-fade-in grid-cols-1 items-start md:grid-cols-12">
        {hasImages && isLeft && (
          <div className="md:col-span-3">
            <StoryImageRail images={step.storyImages ?? []} />
          </div>
        )}
        <div className={`${hasImages ? 'md:col-span-4' : 'md:col-span-4'}`}>
          <NarrativeBlock step={step} onContinue={onContinue} isLastStep={isLastStep} />
        </div>
        <div className={`${hasImages ? 'md:col-span-5' : 'md:col-span-8'}`}>
          <ScreenMockup mockupId={step.mockupId} caption={step.mockupCaption} />
        </div>
        {hasImages && !isLeft && (
          <div className="md:col-span-3">
            <StoryImageRail images={step.storyImages ?? []} />
          </div>
        )}
      </section>
    )
  }

  return (
    <section className="grid w-full animate-fade-in grid-cols-1 md:grid-cols-10">
      <div className="md:col-start-2 md:col-span-4">
        <NarrativeBlock step={step} onContinue={onContinue} isLastStep={isLastStep} />
      </div>
    </section>
  )
}
