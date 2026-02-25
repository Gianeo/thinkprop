import { AlertTriangle, BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react'
import { ComplianceState } from '@/lib/types'

interface UrgencyBadgeProps {
  state: ComplianceState
}

const stateConfig = {
  CRITICAL: {
    label: 'Critical',
    className: 'bg-state-critical-bg text-state-critical',
    icon: AlertTriangle,
  },
  AT_RISK: {
    label: 'At Risk',
    className: 'bg-state-at-risk-bg text-state-at-risk',
    icon: Clock,
  },
  ENROLLED: {
    label: 'Enrolled',
    className: 'bg-state-enrolled-bg text-state-enrolled',
    icon: BookOpen,
  },
  COMPLIANT: {
    label: 'Compliant',
    className: 'bg-state-compliant-bg text-state-compliant',
    icon: CheckCircle,
  },
  EXPIRED: {
    label: 'Expired',
    className: 'bg-state-expired-bg text-state-expired',
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
