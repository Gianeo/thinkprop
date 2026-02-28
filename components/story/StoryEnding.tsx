'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StoryEnding() {
  return (
    <section className="relative ml-[calc(50%-50vw)] w-screen overflow-hidden animate-fade-in">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/welcome6.jpg')" }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-1 pb-10 md:grid-cols-12">
        <div className="md:col-start-2 md:col-span-4 md:pr-4">
          <p className="type-title-upper text-primary">The Result</p>
          <h2 className="type-display mt-4">One system. <br />Zero compliance failures.</h2>
          <p className="type-body mt-6 max-w-sm">
            Reem never missed a renewal again. Tariq stopped chasing people on WhatsApp. And Prestige
            Properties Dubai went from 74% compliance to consistently above 90% without changing how
            people work, only what they can see.
          </p>

          <div className="mt-16">
            <p className="type-title-upper text-primary">The Business Case</p>
            <p className="type-title-sm mt-2">What changes when the system works.</p>
            <div className="mt-4">
              <div className="">
                <p className="type-title-upper text-muted">Completion</p>
                <p className="type-title mt-2 text-destructive">62% → 88%</p>
                <p className="type-body-sm mt-2 text-calm">
                  More agents renew on time. Fewer lapses.
                </p>
              </div>
              <div className="">
                <p className="type-title-upper text-muted">Alert to Enroll</p>
                <p className="type-title mt-2 text-destructive">11d → 3d</p>
                <p className="type-body-sm mt-2 text-calm">
                  Frictionless path closes the risk window.
                </p>
              </div>
              <div className="">
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

        <div className="grid grid-rows-2 gap-px md:col-start-8 md:col-span-5">

          <article className="group relative transition-all duration-200 bg-white/50 backdrop-blur-xl flex justify-between gap-8">
            <div className="flex flex-col h-full items-stretch justify-between gap-8 p-8">
              <div className="flex items-center justify-between">
                <span className="type-title-upper text-muted">01</span>
              </div>
              <div>
                <p className="type-title-upper text-muted">Admin Experience</p>
                <h3 className="type-title mt-2">Tariq&apos;s Journey</h3>
                <div className="mt-3 space-y-1">
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
                <Button asChild className="mt-16">
                  <Link href="/admin/compliance">Open Admin Prototype</Link>
                </Button>
              </div>
            </div>
            <div className="w-1/2 h-full overflow-hidden">
              <Image
                src="/images/Tariq-profile.png"
                alt="Tariq success"
                width={180}
                height={180}
                className="h-full w-full object-cover"
              />
            </div>
          </article>
          <article className="group relative transition-all duration-200 bg-white/50 backdrop-blur-xl flex justify-between gap-8">
            <div className="flex flex-col h-full items-stretch justify-between gap-8 p-8">
              <div className="flex items-center justify-between">
                <span className="type-title-upper text-muted">02</span>
              </div>
              <div className="mt-6 flex h-full items-stretch justify-between gap-10">
                <div>
                  <p className="type-title-upper text-muted">Learner Experience</p>
                  <h3 className="type-title mt-2">Reem&apos;s Journey</h3>
                  <div className="mt-3 space-y-1">
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
                  <Button asChild className="mt-16">
                    <Link href="/learner/dashboard">Open Learner Prototype</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full overflow-hidden">
              <Image
                src="/images/Reem-profile.png"
                alt="Reem success"
                width={180}
                height={180}
                className="h-full w-auto object-cover"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
