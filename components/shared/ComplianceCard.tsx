import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, Clock3, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ComplianceItem } from '@/lib/types'
import { Card } from '../ui/card'

interface ComplianceCardProps {
  item: ComplianceItem
  onCtaClick?: () => void
  variant?: 'default' | 'upcoming'
  upcomingDescription?: string
  upcomingLabel?: string
}

type CardVisualState = ComplianceItem['state'] | 'UPCOMING'

const borderStateMap = {
  CRITICAL: 'border-state-critical',
  AT_RISK: 'border-state-at-risk',
  ENROLLED: 'border-state-enrolled',
  COMPLIANT: 'border-state-compliant',
  EXPIRED: 'border-state-expired',
  UPCOMING: 'border-admin-border',
} as const

const textStateMap = {
  CRITICAL: 'text-destructive-default',
  AT_RISK: 'text-warning-default',
  ENROLLED: 'text-primary-default',
  COMPLIANT: 'text-success-default',
  EXPIRED: 'text-muted',
  UPCOMING: 'text-muted',
} as const

const headerStateMap = {
  CRITICAL: 'bg-destructive-weaker text-destructive-loud',
  AT_RISK: 'bg-warning-weaker text-warning-loud',
  ENROLLED: 'bg-primary-weaker text-primary-loud',
  COMPLIANT: 'bg-success-weaker text-success-loud',
  EXPIRED: 'bg-neutral-weaker text-default',
  UPCOMING: 'bg-neutral-weaker text-muted',
} as const

const statusLabelMap = {
  CRITICAL: 'Critical',
  AT_RISK: 'At Risk',
  ENROLLED: 'Enrolled',
  COMPLIANT: 'Compliant',
  EXPIRED: 'Expired',
  UPCOMING: 'Upcoming',
} as const

const statusTitleTextMap = {
  CRITICAL: 'text-destructive-loud',
  AT_RISK: 'text-warning-loud',
  ENROLLED: 'text-primary-loud',
  COMPLIANT: 'text-success-loud',
  EXPIRED: 'text-default',
  UPCOMING: 'text-muted',
} as const

const statusIconMap = {
  CRITICAL: AlertTriangle,
  AT_RISK: Clock3,
  ENROLLED: BookOpen,
  COMPLIANT: CheckCircle2,
  EXPIRED: XCircle,
  UPCOMING: Clock3,
} as const

export default function ComplianceCard({
  item,
  onCtaClick,
  variant = 'default',
  upcomingDescription,
  upcomingLabel = 'Upcoming',
}: ComplianceCardProps) {
  const visualState: CardVisualState = variant === 'upcoming' ? 'UPCOMING' : item.state
  const StatusIcon = statusIconMap[visualState]
  const progress =
    item.creditsRequired && item.creditsEarned !== undefined
      ? Math.min(100, Math.round((item.creditsEarned / item.creditsRequired) * 100))
      : 0

  return (
    <Card className={`overflow-hidden shadow-sm p-0 ${borderStateMap[visualState]}`}>
      <div className={`flex items-center justify-between gap-3 px-6 py-3 ${headerStateMap[visualState]}`}>
        <p className={`type-title-upper inline-flex items-center gap-2 ${statusTitleTextMap[visualState]}`}>
          <StatusIcon className="size-4" />
          {visualState === 'UPCOMING' ? upcomingLabel : statusLabelMap[visualState]}
        </p>
        <span className="type-caption text-default">
          {visualState === 'UPCOMING' ? `Due ${item.expiryDate}` : item.expiryDate}
        </span>
      </div>

      <div className="p-6 pt-4">
        <h3 className="mb-0 type-title-sm">{item.title}</h3>

        {visualState === 'UPCOMING' && (
          <div className="space-y-2">
            <p className={`type-body ${textStateMap[visualState]}`}>
              Valid until {item.expiryDate}
            </p>
            <p className="type-body">
              {upcomingDescription ?? 'No immediate action required.'}
            </p>
          </div>
        )}

        {(item.state === 'CRITICAL' || item.state === 'AT_RISK') && (
          <div className="space-y-2">
            {item.daysRemaining !== null && (
              <p className={`type-body ${textStateMap[item.state]}`}>
                {item.daysRemaining} days remaining
              </p>
            )}
            <p className="type-body pt-2">{item.consequence}</p>
          </div>
        )}

        {item.state === 'ENROLLED' && (
          <p className="mb-4 type-body text-primary-default">In Progress — Session on {item.expiryDate}</p>
        )}

        {/* {item.state === 'COMPLIANT' && <p className="mb-4 type-body text-success-default">Valid until {item.expiryDate}</p>} */}

        {item.creditsRequired && item.creditsEarned !== undefined && (
          <div className="mb-4 space-y-2">
            <p className="type-body">
              {item.creditsEarned} / {item.creditsRequired} credits earned
            </p>
            <div className="h-2 rounded-full bg-primary-weaker">
              <div className="h-2 rounded-full bg-primary-base" style={{ width: `${progress}%` }} />
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
      </div>
    </Card>
  )
}
