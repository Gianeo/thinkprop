'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AlertTriangle, ArrowRight, ChevronRight } from 'lucide-react'
import SidebarNav from '@/components/shared/SidebarNav'
import UrgencyBadge from '@/components/shared/UrgencyBadge'
import { Button } from '@/components/ui/button'
import { complianceItems } from '@/lib/mockData'

export default function ComplianceDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const item = useMemo(() => complianceItems.find((entry) => entry.id === params.id), [params.id])

  if (!item) {
    return (
      <div className="min-h-screen bg-level-0 p-8">
        <p className="type-body-sm text-muted">Compliance item not found.</p>
      </div>
    )
  }

  const stateIsCritical = item.state === 'CRITICAL'
  const panelClasses = stateIsCritical
    ? 'bg-state-critical-bg border-state-critical'
    : 'bg-state-at-risk-bg border-state-at-risk'

  const countdownClass = stateIsCritical ? 'text-destructive-default' : 'text-warning-default'

  return (
    <div className="min-h-screen bg-level-0">
      <SidebarNav variant="learner" activePath="/learner/dashboard" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="space-y-8 p-8">
          <nav className="flex items-center gap-1 type-body-sm text-muted">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Compliance</span>
            <ChevronRight className="h-4 w-4" />
            <span>{item.title}</span>
          </nav>

          <section>
            <UrgencyBadge state={item.state} />
            <h1 className="mt-3 font-heading type-title-sm font-bold text-default">{item.title}</h1>
            {item.daysRemaining !== null && (
              <p className={`mt-4 font-mono text-6xl font-bold ${countdownClass}`}>{item.daysRemaining} days remaining</p>
            )}
            <p className="mt-2 type-body-sm text-muted">Expires on {item.expiryDate}</p>
          </section>

          <section className={`rounded-xl border p-6 ${panelClasses}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`h-5 w-5 ${countdownClass}`} />
              <p className="type-body-sm text-default">{item.consequence}</p>
            </div>

            {item.id === 'rera-cpd' && item.creditsRequired && item.creditsEarned !== undefined && (
              <table className="mt-4 w-full max-w-md border border-wire-border type-body-sm">
                <tbody>
                  <tr className="border-b border-wire-border">
                    <td className="bg-level-0 px-3 py-2 font-semibold text-muted">Requirement</td>
                    <td className="bg-level-0 px-3 py-2 font-semibold text-muted">Value</td>
                  </tr>
                  <tr className="border-b border-wire-border">
                    <td className="px-3 py-2 text-default">Credits Required</td>
                    <td className="px-3 py-2 text-default">{item.creditsRequired}</td>
                  </tr>
                  <tr className="border-b border-wire-border">
                    <td className="px-3 py-2 text-default">Credits Earned</td>
                    <td className="px-3 py-2 text-default">{item.creditsEarned}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-default">Credits Needed</td>
                    <td className="px-3 py-2 text-default">{item.creditsRequired - item.creditsEarned}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </section>

          <p className="type-body-sm text-muted">Issued by: {item.requirementBody}</p>

          <Button
            withIcon="after"
            onClick={() => router.push(`/learner/courses?requirement=${item.id}`)}
            className="rounded-xl bg-brand-amber px-8 py-4 type-title-sm font-semibold text-contrast hover:bg-warning-strong"
          >
            Browse Qualifying Courses
            <ArrowRight size={16} />
          </Button>
        </div>
      </main>
    </div>
  )
}
