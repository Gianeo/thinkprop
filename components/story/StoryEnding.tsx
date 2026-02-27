'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CheckCircle,
  RefreshCw,
  Shield,
  User,
  Zap,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function StoryEnding() {
  const router = useRouter()

  return (
    <section className="mx-auto w-full max-w-3xl animate-fade-in py-12">
      <div className="text-center">
        <p className="type-title-upper mb-3">The Result</p>

        <div className="mb-6 flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-admin-border bg-border" />
          <div className="h-2 w-2 rotate-45 bg-primary-base" />
          <div className="h-px flex-1 bg-admin-border bg-border" />
        </div>

        <h2 className="type-display mb-4 mt-4">
          One system. Two people. Zero compliance failures.
        </h2>
        <p className="type-body mx-auto mb-10 max-w-xl">
          Reem never missed a renewal again. Tariq stopped chasing people on WhatsApp. And Prestige
          Properties Dubai went from 74% compliance to consistently above 90% — without anyone changing
          how they work, just what they could see.
        </p>
      </div>

      <div className="mb-10 rounded-3xl border border-admin-border border-border bg-admin-card bg-card p-8 shadow-card shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-xl border-2 border-state-enrolled/20 bg-state-enrolled-bg text-state-enrolled">
                <AvatarFallback className="h-10 w-10 rounded-xl border-2 border-state-enrolled/20 bg-state-enrolled-bg font-display font-bold text-state-enrolled">
                  RA
                </AvatarFallback>
              </Avatar>
              <h3 className="font-display text-sm font-semibold text-admin-heading text-loud">Reem&apos;s Experience</h3>
            </div>
            {[
              'Saw the alert immediately',
              'Found the right course in seconds',
              'Enrolled with one click — no payment',
              'License renewed on time',
            ].map((item) => (
              <p key={item} className="flex items-center gap-2 py-2 text-sm text-admin-body text-default">
                <CheckCircle size={14} className="text-state-compliant" />
                {item}
              </p>
            ))}
          </div>

          <Separator orientation="vertical" className="hidden self-stretch bg-admin-border bg-border md:block" />
          <Separator orientation="horizontal" className="block bg-admin-border bg-border md:hidden" />

          <div>
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-xl border-2 border-primary-base/20 bg-primary-weaker text-primary-default">
                <AvatarFallback className="h-10 w-10 rounded-xl border-2 border-primary-base/20 bg-primary-weaker font-display font-bold text-primary-default">
                  TH
                </AvatarFallback>
              </Avatar>
              <h3 className="type-body-sm">Tariq&apos;s Experience</h3>
            </div>
            {[
              'Saw 7 at-risk agents instantly',
              'Sent reminders without leaving the page',
              'Watched status update in real time',
              'Closed the week at 88% compliance',
            ].map((item) => (
              <p key={item} className="flex items-center gap-2 py-2 text-sm text-admin-body text-default">
                <CheckCircle size={14} className="text-state-compliant" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── METRICS STRIP ─────────────────────────────── */}
      <div className="mb-10 rounded-3xl border border-admin-border bg-admin-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-admin-faint">
            The Business Case
          </span>
          <p className="mt-2 font-display text-base font-semibold text-admin-heading">
            What changes when the system works.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border border-admin-border bg-admin-surface p-5 text-center">
            <span className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-admin-faint">
              Compliance Completion
            </span>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-state-critical">
                62%
              </span>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-6 bg-admin-border" />
                <span className="font-mono text-[10px] text-admin-faint">
                  before
                </span>
              </div>
              <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0 text-brand-amber">
                <path
                  d="M0 6h16M12 1l6 5-6 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-6 bg-admin-border" />
                <span className="font-mono text-[10px] text-admin-faint">
                  after
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-state-compliant">
                88%
              </span>
            </div>
            <span className="text-xs leading-relaxed text-admin-muted">
              More agents renew on time. Fewer license lapses. Less legal exposure.
            </span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-admin-border bg-admin-surface p-5 text-center">
            <span className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-admin-faint">
              Days to Enroll After Alert
            </span>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-state-critical">
                11d
              </span>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-6 bg-admin-border" />
                <span className="font-mono text-[10px] text-admin-faint">
                  before
                </span>
              </div>
              <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0 text-brand-amber">
                <path
                  d="M0 6h16M12 1l6 5-6 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-6 bg-admin-border" />
                <span className="font-mono text-[10px] text-admin-faint">
                  after
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-state-compliant">
                3d
              </span>
            </div>
            <span className="text-xs leading-relaxed text-admin-muted">
              Urgency signals and frictionless enrollment close the gap before it becomes a crisis.
            </span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-admin-border bg-admin-surface p-5 text-center">
            <span className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-admin-faint">
              Admin Time on Compliance
            </span>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-state-critical">
                6h
              </span>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-6 bg-admin-border" />
                <span className="font-mono text-[10px] text-admin-faint">
                  before
                </span>
              </div>
              <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0 text-brand-amber">
                <path
                  d="M0 6h16M12 1l6 5-6 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-6 bg-admin-border" />
                <span className="font-mono text-[10px] text-admin-faint">
                  after
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-state-compliant">
                &lt;1h
              </span>
            </div>
            <span className="text-xs leading-relaxed text-admin-muted">
              Tariq stops chasing. The dashboard does the work. He focuses on strategy, not admin.
            </span>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-admin-faint">
          Figures based on baseline estimates from ThinkProp platform analytics
          and UAE real estate compliance research.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-admin-border border-border bg-admin-card bg-card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-state-critical-bg text-state-critical">
            <Zap size={16} />
          </div>
          <h4 className="mb-1 font-display text-sm font-semibold text-admin-heading text-loud">Urgency by design</h4>
          <p className="text-xs leading-relaxed text-admin-muted text-calm">
            Critical information is the first thing you see, not the last.
          </p>
        </div>
        <div className="rounded-2xl border border-admin-border border-border bg-admin-card bg-card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-state-compliant-bg text-state-compliant">
            <Shield size={16} />
          </div>
          <h4 className="mb-1 font-display text-sm font-semibold text-admin-heading text-loud">Zero payment friction</h4>
          <p className="text-xs leading-relaxed text-admin-muted text-calm">
            The company covers the cost. The learner just acts.
          </p>
        </div>
        <div className="rounded-2xl border border-admin-border border-border bg-admin-card bg-card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-weaker text-primary-default">
            <RefreshCw size={16} />
          </div>
          <h4 className="mb-1 font-display text-sm font-semibold text-admin-heading text-loud">Real-time truth</h4>
          <p className="text-xs leading-relaxed text-admin-muted text-calm">
            When one person acts, the other sees it immediately.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="type-title mb-2">
          Ready to explore the prototype?
        </h3>
        <p className="type-body-sm mb-8">Choose a journey and experience it yourself.</p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild className="h-12 gap-2 rounded-xl bg-state-enrolled px-8 font-semibold text-white transition-all duration-150 hover:bg-blue-700">
            <Link href="/learner/dashboard">
              <User size={16} />
              Try Reem&apos;s Journey →
            </Link>
          </Button>
          <Button asChild className="h-12 gap-2 rounded-xl bg-primary px-8 font-semibold text-white transition-all duration-150 hover:bg-primary-strong">
            <Link href="/admin/compliance">
              <Shield size={16} />
              Try Tariq&apos;s Journey →
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="mt-6 text-xs text-admin-faint text-muted transition-colors hover:text-admin-muted hover:text-calm"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            router.push('/story')
          }}
        >
          ← Back to story start
        </button>
      </div>
    </section>
  )
}
