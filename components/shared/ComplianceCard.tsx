import { ArrowRight } from 'lucide-react'
import UrgencyBadge from '@/components/shared/UrgencyBadge'
import { Button } from '@/components/ui/button'
import { ComplianceItem } from '@/lib/types'
import { Card } from '../ui/card'

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
    <Card className={`rounded-lg bg-level-2 p-6 ${borderStateMap[item.state]}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <UrgencyBadge state={item.state} />
        <span className="type-caption">{item.expiryDate}</span>
      </div>

      <h3 className="mb-3 type-title-sm text-default">{item.title}</h3>

      {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && (
        <div className="mb-4 space-y-2">
          {item.daysRemaining !== null && (
            <p className={`type-body ${textStateMap[item.state]}`}>
              {item.daysRemaining} days remaining
            </p>
          )}
          <p className="type-body-sm">{item.consequence}</p>
        </div>
      )}

      {item.state === 'ENROLLED' && (
        <p className="mb-4 type-body-sm text-primary-default">In Progress — Session on {item.expiryDate}</p>
      )}

      {item.state === 'COMPLIANT' && <p className="mb-4 type-body-sm text-success-default">Valid until {item.expiryDate}</p>}

      {item.creditsRequired && item.creditsEarned !== undefined && (
        <div className="mb-4 space-y-2">
          <p className="type-body-sm">
            {item.creditsEarned} / {item.creditsRequired} credits earned
          </p>
          <div className="h-2 rounded-full bg-wire-border">
            <div className="h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && onCtaClick && (
        <Button
          withIcon="after"
          onClick={onCtaClick}
          className="w-full"
        >
          Find a Course
          <ArrowRight size={14} />
        </Button>
      )}
    </Card>
  )
}
