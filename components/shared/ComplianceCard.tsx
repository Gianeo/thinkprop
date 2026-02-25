import UrgencyBadge from '@/components/shared/UrgencyBadge'
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
  CRITICAL: 'text-state-critical',
  AT_RISK: 'text-state-at-risk',
  ENROLLED: 'text-state-enrolled',
  COMPLIANT: 'text-state-compliant',
  EXPIRED: 'text-state-expired',
} as const

export default function ComplianceCard({ item, onCtaClick }: ComplianceCardProps) {
  const progress =
    item.creditsRequired && item.creditsEarned !== undefined
      ? Math.min(100, Math.round((item.creditsEarned / item.creditsRequired) * 100))
      : 0

  return (
    <article className={`rounded-xl border border-wire-border border-l-4 bg-wire-card p-5 ${borderStateMap[item.state]}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <UrgencyBadge state={item.state} />
        <span className="font-mono text-xs text-wire-muted">{item.expiryDate}</span>
      </div>

      <h3 className="mb-3 font-heading text-lg font-semibold text-wire-text">{item.title}</h3>

      {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && (
        <div className="mb-4 space-y-2">
          {item.daysRemaining !== null && (
            <p className={`font-mono text-base font-bold ${textStateMap[item.state]}`}>
              {item.daysRemaining} days remaining
            </p>
          )}
          <p className="text-sm italic text-wire-label">{item.consequence}</p>
        </div>
      )}

      {item.state === 'ENROLLED' && (
        <p className="mb-4 text-sm font-semibold text-state-enrolled">In Progress — Session on {item.expiryDate}</p>
      )}

      {item.state === 'COMPLIANT' && <p className="mb-4 text-sm font-semibold text-state-compliant">Valid until {item.expiryDate}</p>}

      {item.creditsRequired && item.creditsEarned !== undefined && (
        <div className="mb-4 space-y-2">
          <p className="text-sm text-wire-label">
            {item.creditsEarned} / {item.creditsRequired} credits earned
          </p>
          <div className="h-2 rounded-full bg-wire-border">
            <div className="h-2 rounded-full bg-brand-amber" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && onCtaClick && (
        <button
          type="button"
          onClick={onCtaClick}
          className="w-full rounded-lg bg-brand-amber px-4 py-2.5 font-semibold text-white"
        >
          Find a Course →
        </button>
      )}
    </article>
  )
}
