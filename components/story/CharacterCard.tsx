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
    <div className="animate-scale-in mr-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden">
          <div className="absolute inset-x-0 -bottom-px z-10">
            <div className="space-y-0 bg-white/50 px-4 py-3 backdrop-blur-md">
              <h3 className="type-title-sm leading-[1.3]">{name}</h3>
              <p className="type-body-sm">{role}</p>
              {/* <p className="type-caption">{company}</p> */}
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

        <div className="flex flex-col">

          <div className="w-full bg-white/40 p-8">
            <p className="type-body italic">{quote}</p>
          </div>

          {description && (
            <div className='p-8'>
              {description.split('\n\n').map((paragraph) => (
                <p key={paragraph} className="type-body-sm mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* <div className="flex flex-wrap gap-2">
          {details.map((detail) => (
            <Badge
              key={detail}
            >
              {detail}
            </Badge>
          ))}
        </div> */}
        </div>
      </div>
    </div>
  )
}
