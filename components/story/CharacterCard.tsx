'use client'

import Image from 'next/image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

interface CharacterCardProps {
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

export default function CharacterCard({
  name,
  role,
  company,
  initials,
  colorScheme,
  quote,
  details,
  image,
  description,
}: CharacterCardProps) {
  const avatarClass =
    colorScheme === 'blue'
      ? 'bg-state-enrolled-bg text-state-enrolled border-2 border-state-enrolled/20'
      : 'bg-primary-weaker text-primary-default border-2 border-primary-base/20'

  return (
    <Card className="animate-scale-in border-admin-border border-border shadow-card shadow-sm">
      <CardContent className="grid gap-4 p-6">
        {image && (
          <div className="relative h-44 w-full overflow-hidden rounded-xl border border-admin-border border-border bg-level-1">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        )}
        <div className="mb-4 flex items-center gap-4">
          <Avatar className={`h-14 w-14 rounded-2xl ${avatarClass}`}>
          <AvatarFallback className={`h-14 w-14 rounded-2xl font-display text-lg font-bold ${avatarClass}`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="type-title-sm">{name}</h3>
            <p className="type-body-sm">{role}</p>
            <p className="type-caption mt-0.5">{company}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-admin-border border-border bg-admin-surface bg-level-0 p-4">
          <span className="mb-1 block font-display text-3xl leading-none text-primary-default">&ldquo;</span>
          <p className="type-body-sm italic">{quote}</p>
        </div>

        {description && (
          <div className="mb-4">
            {description.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="type-body-sm mb-2">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {details.map((detail) => (
            <span
              key={detail}
              className="type-caption rounded-full border border-admin-border border-border bg-admin-surface bg-level-0 px-3 py-1"
            >
              {detail}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
