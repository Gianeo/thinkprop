'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Shield, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const personas = [
  {
    name: 'Reem Al Mansoori',
    subtitle: 'Real Estate Agent · Learner Journey',
    description: 'Follow Reem through a compliance alert and the full enrollment flow.',
    cta: 'Enter Learner View',
    href: '/learner/dashboard',
    icon: User,
    iconWrapClass: 'bg-state-enrolled-bg',
    iconClass: 'text-primary-default',
    ctaClass: 'text-primary-default',
    index: '01',
  },
  {
    name: 'Tariq Hamdan',
    subtitle: 'Training Manager · Admin Journey',
    description: 'Manage team compliance, send reminders, and monitor risk in real time.',
    cta: 'Enter Admin View',
    href: '/admin/compliance',
    icon: Shield,
    iconWrapClass: 'bg-brand-amber/10',
    iconClass: 'text-warning-default',
    ctaClass: 'text-warning-loud',
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
      <div className="pointer-events-none absolute left-8 top-8 h-0.5 w-32 bg-warning-base md:left-12 md:top-12 md:w-48" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <section className="flex flex-col justify-between p-8 md:p-12 lg:p-16">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="type-title-sm">ThinkProp</span>
              <span className="type-caption font-bold uppercase tracking-[0.2em] text-warning-loud">LMS</span>
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
          <p className="max-w-sm type-body-sm text-calm">
            Select a perspective to explore the product flow. Learner and Admin experiences are split as two clear tracks.
          </p>
        </section>

        <section className="grid min-h-[60vh] grid-rows-2 lg:min-h-screen">
        {personas.map((persona) => {
          const Icon = persona.icon

          return (
            <div
              key={persona.name}
              onClick={() => router.push(persona.href)}
              className="group relative cursor-pointer transition-all duration-200"
            >
              <div className="relative h-full overflow-hidden border-y border-l border-strong bg-transparent text-card-foreground shadow">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
                <div className="relative flex h-full flex-col justify-between space-y-5 p-7">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${persona.iconWrapClass}`}>
                      <Icon size={22} className={persona.iconClass} />
                    </div>
                    <span className="type-title-upper text-weak">{persona.index}</span>
                  </div>

                  <div>
                    <h2 className="font-display type-title-sm font-bold text-loud">{persona.name}</h2>
                    <p className="mt-0.5 type-body-sm text-calm">{persona.subtitle}</p>
                  </div>

                  <p className="type-body-sm leading-relaxed text-calm">{persona.description}</p>

                  <Button
                    variant="ghost"
                    withIcon="after"
                    className={`h-auto p-0 type-body-sm font-semibold hover:bg-transparent ${persona.ctaClass}`}
                  >
                    {persona.cta}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-warning-base/0 via-warning-base/50 to-warning-base/0" />
              </div>
            </div>
          )
        })}
        </section>
      </div>
    </main>
  )
}
