import { ArrowRight } from 'lucide-react'
import UrgencyBadge from '@/components/shared/UrgencyBadge'
import { Button } from '@/components/ui/button'
import { ComplianceItem } from '@/lib/types'

interface ComplianceCardProps {
  item: ComplianceItem
  onCtaClick?: () => void
}

const borderStateMap = {
  CRITICAL: 'border-state-critical',
  AT_RISK: 'border-state-at-risk',
  ENROLLED: 'border-state-enrolled',
  COMPLIANT: 'border-state-compliant',
  EXPIRED: 'border-state-expired',
} as const

const textStateMap = {
  CRITICAL: 'text-destructive-default',
  AT_RISK: 'text-warning-default',
  ENROLLED: 'text-primary-default',
  COMPLIANT: 'text-success-default',
  EXPIRED: 'text-muted',
} as const

export default function ComplianceCard({ item, onCtaClick }: ComplianceCardProps) {
  const progress =
    item.creditsRequired && item.creditsEarned !== undefined
      ? Math.min(100, Math.round((item.creditsEarned / item.creditsRequired) * 100))
      : 0

  return (
    <article className={`rounded-xl border border-wire-border border-l-4 bg-level-2 p-5 ${borderStateMap[item.state]}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <UrgencyBadge state={item.state} />
        <span className="font-mono type-caption text-muted">{item.expiryDate}</span>
      </div>

      <h3 className="mb-3 font-heading type-title-sm font-semibold text-default">{item.title}</h3>

      {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && (
        <div className="mb-4 space-y-2">
          {item.daysRemaining !== null && (
            <p className={`font-mono type-body font-bold ${textStateMap[item.state]}`}>
              {item.daysRemaining} days remaining
            </p>
          )}
          <p className="type-body-sm italic text-muted">{item.consequence}</p>
        </div>
      )}

      {item.state === 'ENROLLED' && (
        <p className="mb-4 type-body-sm font-semibold text-primary-default">In Progress — Session on {item.expiryDate}</p>
      )}

      {item.state === 'COMPLIANT' && <p className="mb-4 type-body-sm font-semibold text-success-default">Valid until {item.expiryDate}</p>}

      {item.creditsRequired && item.creditsEarned !== undefined && (
        <div className="mb-4 space-y-2">
          <p className="type-body-sm text-muted">
            {item.creditsEarned} / {item.creditsRequired} credits earned
          </p>
          <div className="h-2 rounded-full bg-wire-border">
            <div className="h-2 rounded-full bg-brand-amber" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && onCtaClick && (
        <Button
          withIcon="after"
          onClick={onCtaClick}
          className="w-full rounded-lg bg-brand-amber px-4 py-2.5 font-semibold text-contrast hover:bg-warning-strong"
        >
          Find a Course
          <ArrowRight size={14} />
        </Button>
      )}
    </article>
  )
}
