'use client'

import Image from 'next/image'
import { Badge } from '../ui/badge'

interface CharacterCardProps {
  name: string
  role: string
  company: string
  quote: string
  details: string[]
  image?: string
  description?: string
}

export default function CharacterCard({
  name,
  role,
  company,
  quote,
  details,
  image,
  description,
}: CharacterCardProps) {
  return (
    <div className="animate-scale-in">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="space-y-0.5 bg-white/50 p-3 backdrop-blur-md">
              <h3 className="type-title-sm">{name}</h3>
              <p className="type-body-sm">{role}</p>
              <p className="type-caption">{company}</p>
            </div>
          </div>

          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-level-1">
              <span className="type-caption">Image</span>
            </div>
          )}
        </div>

        <div className="-ml-16 mt-8 max-w-48 flex flex-col items-end">
          <div className="w-full rounded-lg bg-white/80 p-4 backdrop-blur-md">
            <p className="type-body italic">{quote}</p>
          </div>
        </div>

      <div className="space-y-4">

        {description && (
          <div>
            {description.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="type-body-sm max-w-sm mb-2">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {details.map((detail) => (
            <Badge
              key={detail}
            >
              {detail}
            </Badge>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
