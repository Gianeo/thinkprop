'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface ActDividerProps {
  actNumber: 1 | 2 | 3
  actTitle: string
  actSubtitle: string
  character?: 'reem' | 'tariq'
}

export default function ActDivider({
  actNumber,
  actTitle,
  actSubtitle,
  character,
}: ActDividerProps) {
  return (
    <section className="grid w-full animate-fade-in grid-cols-1 py-12 md:grid-cols-12">
      <div className="flex flex-col items-center text-center md:col-span-8 md:col-start-3">
      <p className="type-title-upper mb-3">ACT {actNumber}</p>

      <div className="mb-6 flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-admin-border bg-border" />
        <div className="h-2 w-2 rotate-45 bg-primary-base" />
        <div className="h-px flex-1 bg-admin-border bg-border" />
      </div>

      <h2 className="type-title mb-2">{actTitle}</h2>
      <p className="type-body mb-6">{actSubtitle}</p>

      {character && (
        <div className="space-y-2">
          <Avatar
            className={`mx-auto h-16 w-16 rounded-2xl border-2 ${
              character === 'reem'
                ? 'border-state-enrolled/20 bg-state-enrolled-bg text-state-enrolled'
                : 'border-primary-base/20 bg-primary-weaker text-primary-default'
            }`}
          >
            <AvatarFallback
              className={`h-16 w-16 rounded-2xl font-display text-xl font-bold ${
                character === 'reem'
                  ? 'border-state-enrolled/20 bg-state-enrolled-bg text-state-enrolled'
                  : 'border-primary-base/20 bg-primary-weaker text-primary-default'
              }`}
            >
              {character === 'reem' ? 'RA' : 'TH'}
            </AvatarFallback>
          </Avatar>
          <p className="type-body-sm">
            {character === 'reem' ? "Reem Al Mansoori" : "Tariq Hamdan"}
          </p>
          <p className="type-caption">
            {character === 'reem' ? 'Senior Real Estate Agent' : 'Training & Compliance Manager'}
          </p>
        </div>
      )}
      </div>
    </section>
  )
}
