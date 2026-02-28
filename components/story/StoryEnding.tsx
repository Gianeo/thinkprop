'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StoryEnding() {
  return (
    <section className="relative -mt-24 ml-[calc(50%-50vw)] min-h-[calc(100vh+6rem)] w-screen overflow-hidden pb-72 animate-fade-in md:pb-64">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/welcome6.jpg')" }}
      />
      <div className="fixed inset-0 bg-level-0/70 backdrop-blur-[1px]" />

      <div className="pointer-events-none fixed inset-y-0 right-0 z-0 w-1/2 bg-white/90 backdrop-blur-md" />

      <div className="relative z-10 grid min-h-[calc(100vh+6rem)] grid-cols-1 gap-1 px-4 py-12 md:grid-cols-12">
        <div className="md:col-start-2 md:col-span-4 md:self-center">
          <p className="type-title-upper text-muted">The Result</p>
          <h2 className="type-display mt-4">One system. Two people. Zero compliance failures.</h2>
          <p className="type-body mt-6">
            Reem never missed a renewal again. Tariq stopped chasing people on WhatsApp. And Prestige
            Properties Dubai went from 74% compliance to consistently above 90% without changing how
            people work, only what they can see.
          </p>
        </div>

        <div className="md:col-start-7 md:col-span-6 md:self-center">
          <div className="border border-admin-border bg-admin-card/90 p-6 backdrop-blur-sm">
            <p className="type-title-upper text-muted">The Business Case</p>
            <p className="type-title mt-2">What changes when the system works.</p>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="border border-admin-border bg-admin-surface p-4">
                <p className="type-title-upper text-muted">Completion</p>
                <p className="type-title mt-2 text-destructive">62% → 88%</p>
                <p className="type-body-sm mt-2 text-calm">
                  More agents renew on time. Fewer lapses.
                </p>
              </div>

              <div className="border border-admin-border bg-admin-surface p-4">
                <p className="type-title-upper text-muted">Alert to Enroll</p>
                <p className="type-title mt-2 text-destructive">11d → 3d</p>
                <p className="type-body-sm mt-2 text-calm">
                  Frictionless path closes the risk window.
                </p>
              </div>

              <div className="border border-admin-border bg-admin-surface p-4">
                <p className="type-title-upper text-muted">Admin Time</p>
                <p className="type-title mt-2 text-destructive">6h → &lt;1h</p>
                <p className="type-body-sm mt-2 text-calm">
                  The dashboard replaces manual chasing.
                </p>
              </div>
            </div>

            <p className="type-caption mt-4 text-muted">
              Figures based on baseline estimates from ThinkProp platform analytics and UAE compliance
              research.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-admin-border bg-white/90 p-4 backdrop-blur-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <article className="border border-admin-border bg-admin-card/80 p-3 md:col-start-2 md:col-span-5">
            <div className="grid grid-cols-[96px_1fr] gap-3">
              <div className="relative h-24 w-24 overflow-hidden border border-admin-border">
                <Image src="/images/Reem-success.png" alt="Reem success" fill className="object-cover" />
              </div>
              <div>
                <p className="type-title-upper text-muted">Learner Experience</p>
                <p className="type-title mt-1">Reem&apos;s Journey</p>
                <div className="mt-2 space-y-1">
                  {[
                    'Saw the alert immediately',
                    'Found the right course in seconds',
                    'Enrolled with one click',
                    'License renewed on time',
                  ].map((item) => (
                    <p key={item} className="type-body-sm flex items-center gap-2 text-default">
                      <CheckCircle size={14} className="text-success" />
                      {item}
                    </p>
                  ))}
                </div>
                <Button asChild className="mt-3">
                  <Link href="/learner/dashboard">Open Learner Prototype</Link>
                </Button>
              </div>
            </div>
          </article>

          <article className="border border-admin-border bg-admin-card/80 p-3 md:col-span-5">
            <div className="grid grid-cols-[96px_1fr] gap-3">
              <div className="relative h-24 w-24 overflow-hidden border border-admin-border">
                <Image src="/images/Tariq-success.png" alt="Tariq success" fill className="object-cover" />
              </div>
              <div>
                <p className="type-title-upper text-muted">Admin Experience</p>
                <p className="type-title mt-1">Tariq&apos;s Journey</p>
                <div className="mt-2 space-y-1">
                  {[
                    'Saw at-risk agents instantly',
                    'Sent reminders in seconds',
                    'Status updated in real time',
                    'Closed the week at 88%',
                  ].map((item) => (
                    <p key={item} className="type-body-sm flex items-center gap-2 text-default">
                      <CheckCircle size={14} className="text-success" />
                      {item}
                    </p>
                  ))}
                </div>
                <Button asChild className="mt-3">
                  <Link href="/admin/compliance">Open Admin Prototype</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
