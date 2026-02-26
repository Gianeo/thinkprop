import { AlertTriangle, BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react'
import { ComplianceState } from '@/lib/types'

interface UrgencyBadgeProps {
  state: ComplianceState
}

const stateConfig = {
  CRITICAL: {
    label: 'Critical',
    className: 'bg-state-critical-bg text-destructive-default',
    icon: AlertTriangle,
  },
  AT_RISK: {
    label: 'At Risk',
    className: 'bg-state-at-risk-bg text-warning-default',
    icon: Clock,
  },
  ENROLLED: {
    label: 'Enrolled',
    className: 'bg-state-enrolled-bg text-primary-default',
    icon: BookOpen,
  },
  COMPLIANT: {
    label: 'Compliant',
    className: 'bg-state-compliant-bg text-success-default',
    icon: CheckCircle,
  },
  EXPIRED: {
    label: 'Expired',
    className: 'bg-state-expired-bg text-muted',
    icon: XCircle,
  },
} as const

export default function UrgencyBadge({ state }: UrgencyBadgeProps) {
  const config = stateConfig[state]
  const Icon = config.icon

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 ${config.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}
