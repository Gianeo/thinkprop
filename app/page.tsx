'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Shield, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
  },
]

export default function Page() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-level-0 p-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-amber">
            <span className="font-display type-body-sm font-bold text-contrast">T</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="type-title-sm type-title-sm">ThinkProp</span>
            <span className="type-caption font-bold uppercase tracking-[0.2em] text-warning-loud">LMS</span>
          </div>
        </div>
        <p className="mt-2 font-mono type-body-sm uppercase tracking-widest text-muted">Prototype Navigator</p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
        {personas.map((persona) => {
          const Icon = persona.icon

          return (
            <div
              key={persona.name}
              onClick={() => router.push(persona.href)}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
              <Card>
                <CardContent className="p-8">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${persona.iconWrapClass}`}>
                    <Icon size={22} className={persona.iconClass} />
                  </div>

                  <h2 className="font-display type-title-sm font-bold text-loud">{persona.name}</h2>
                  <p className="mt-0.5 type-body-sm text-calm">{persona.subtitle}</p>
                  <p className="mt-3 type-body-sm leading-relaxed text-calm">{persona.description}</p>

                  <Button
                    variant="ghost"
                    className={`mt-6 h-auto p-0 type-body-sm font-semibold hover:bg-transparent ${persona.ctaClass}`}
                  >
                    {persona.cta}
                    <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </main>
  )
}
