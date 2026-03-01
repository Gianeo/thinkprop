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
        style={{ backgroundImage: "url('/images/welcome.webp')" }}
      />
      <div className="pointer-events-none fixed inset-0 bg-linear-to-b from-transparent from-20% to-neutral-weakest/95 to-75%" />

      <div className="relative z-10 grid grid-cols-1 gap-1 pb-10 md:grid-cols-12">
        <div className="md:col-span-12 flex justify-end md:pr-6">
          <Link
            href="https://www.figma.com/design/cvLU2Suz0OS1NsAxgAEA0S/ThinkProp?node-id=4-2&t=LC0wIDxXZVn5oN6p-1"
            target="_blank"
            rel="noopener noreferrer"
            className="type-caption text-primary hover:underline"
          >
            View Figma file
          </Link>
        </div>

        <div className="md:col-start-2 md:col-span-4 md:pr-4">
          <p className="type-title-upper text-primary">The Result</p>
          <h2 className="type-display mt-4">One system. <br />Zero compliance failures.</h2>
          <p className="type-body mt-6 max-w-sm">
            Reem never missed a renewal again. Tariq stopped chasing people on WhatsApp. And Prestige
            Properties Dubai went from 74% compliance to consistently above 90% without changing how
            people work, only what they can see.
          </p>

          <div className="mt-16">
            <p className="type-title-sm">The Business Case</p>
            <p className="type-body text-calm">What changes when the system works.</p>
            <div className="mt-4 space-y-4">
              <div className="">
                <p className="type-body-sm text-strong font-bold">Completion</p>
                <p className="type-title mt-0.5 text-primary">62% → 88%</p>
                <p className="type-body-sm text-calm">
                  More agents renew on time. Fewer lapses.
                </p>
              </div>
              <div className="">
                <p className="type-body-sm text-strong font-bold">Alert to Enroll</p>
                <p className="type-title mt-0.5 text-primary">11d → 3d</p>
                <p className="type-body-sm text-calm">
                  Frictionless path closes the risk window.
                </p>
              </div>
              <div className="">
                <p className="type-body-sm text-strong font-bold">Admin Time</p>
                <p className="type-title mt-0.5 text-primary">6h → &lt;1h</p>
                <p className="type-body-sm text-calm">
                  The dashboard replaces manual chasing.
                </p>
              </div>
            </div>
            <p className="type-caption mt-4 text-cald italic max-w-xs">
              Figures based on baseline estimates from ThinkProp platform analytics and UAE compliance
              research.
            </p>
          </div>
        </div>

        <div className="grid grid-rows-2 md:col-start-7 md:col-span-6 shadow-lg rounded-l-xl">

          <article className="group relative transition-all duration-200 bg-white/60 backdrop-blur-xl flex justify-between gap-8 rounded-tl-xl">
            <div className="flex flex-col h-full gap-8 p-8">
              <div className="type-title-upper text-muted">01</div>
              <div className="mt-6 flex h-full items-stretch justify-between gap-10">
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
                  <Button asChild className="mt-8">
                    <Link href="/admin/compliance" target="_blank" rel="noopener noreferrer">Open Admin Prototype</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative h-full w-1/2 overflow-hidden">
              <Image
                src="/images/Tariq-profile.webp"
                alt="Tariq success"
                fill
                className="object-cover"
              />
            </div>
          </article>
          <article className="group relative transition-all duration-200 bg-white/60 backdrop-blur-xl flex justify-between gap-8 rounded-bl-xl">
            <div className="flex flex-col h-full items-stretch justify-between gap-8 p-8">
              <div className="type-title-upper text-muted">02</div>
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
                  <Button asChild className="mt-8">
                    <Link href="/learner/dashboard" target="_blank" rel="noopener noreferrer">Open Learner Prototype</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative h-full w-1/2 overflow-hidden">
              <Image
                src="/images/Reem-profile.webp"
                alt="Reem success"
                fill
                className="object-cover"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
