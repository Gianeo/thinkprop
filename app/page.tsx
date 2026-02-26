'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const personas = [
  {
    name: 'Tariq Hamdan',
    subtitle: 'Training Manager · Admin Journey',
    description: 'Manage team compliance, send reminders, and monitor risk in real time.',
    cta: 'Enter Admin',
    href: '/admin/compliance',
    ctaClass: 'text-primary-default',
    image: '/images/Tariq.png',
    index: '01',
  },
  {
    name: 'Reem Al Mansoori',
    subtitle: 'Real Estate Agent · Learner Journey',
    description: 'Follow Reem through a compliance alert and the full enrollment flow.',
    cta: 'Enter Learner',
    href: '/learner/dashboard',
    ctaClass: 'text-primary-default',
    image: '/images/Reem.png',
    index: '02',
  },
]

export default function Page() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen overflow-hidden bg-level-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/welcome6.jpg')" }}
      />
      <div className="absolute inset-0 bg-level-0/60" />
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-400 grid-cols-1 lg:grid-cols-2">
        <section className="flex flex-col justify-between p-8 md:p-12 lg:p-16 relative">
          <div className="pointer-events-none absolute left-0 top-0 h-0.5 w-32 bg-warning-base md:top-12 md:w-48" />
          <div>
            <div className="flex items-baseline gap-1">
              <span className="type-title-sm">ThinkProp</span>
              <span className="type-caption font-bold uppercase text-warning-loud">LMS</span>
            </div>
            <div className="mt-8 space-y-2">
              <p className="type-title-upper text-calm">Prototype Navigator</p>
              <h1 className="type-display leading-none">
                Compliance
                <br />
                Journeys
              </h1>
            </div>
          </div>
          <p className="max-w-xs type-body-sm text-calm">
            Select a perspective to explore the product flow. Learner and Admin experiences are split as two clear tracks.
          </p>
          <div />
        </section>

        <section className="grid min-h-[60vh] grid-rows-2 gap-px lg:min-h-screen p-8">
          {personas.map((persona, index) => {
            const cornerClass = index === 0 ? 'rounded-t-xl' : 'rounded-b-xl'

            return (
              <div
                key={persona.name}
                onClick={() => router.push(persona.href)}
                className="group relative cursor-pointer transition-all duration-200 hover:shadow-lg"
              >
                <div className={`relative h-full overflow-hidden bg-transparent text-card-foreground shadow ${cornerClass}`}>
                  <div className={`absolute inset-0 bg-white/50 backdrop-blur-md ${cornerClass}`} />
                  <div className="relative flex h-full flex-col justify-between space-y-5 p-8 pr-0">
                    <div className="flex items-center justify-between">
                      <span className="type-title text-white">{persona.index}</span>
                    </div>

                    <div className='flex gap-16 justify-between items-start'>
                      <div>
                        <h1 className="type-title-upper text-muted mb-3">Persona</h1>
                        <h2 className="type-title font-bold text-loud">{persona.name}</h2>
                        <p className="mt-0.5 type-body text-default">{persona.subtitle}</p>
                      </div>
                      <div className="overflow-hidden mt-2">
                        <Image
                          src={persona.image}
                          alt={persona.name}
                          width={120}
                          height={120}
                          className="size-30 object-cover"
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Button
                        variant="ghost"
                        className={`h-auto justify-start p-0 type-body-sm font-semibold hover:bg-transparent ${persona.ctaClass}`}
                      >
                        {persona.cta}
                      </Button>
                      <p className="type-body-sm leading-relaxed text-calm max-w-xs pr-8">{persona.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}
