'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { orgStats } from '@/lib/mockData'

export default function KpiStrip() {
  const circumference = 2 * Math.PI * 32
  const ringColor =
    orgStats.complianceScore >= 80
      ? '#16A34A'
      : orgStats.complianceScore >= 60
        ? '#D97706'
        : '#DC2626'

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="border-admin-border bg-admin-card shadow-card transition-shadow duration-200 hover:shadow-card-hover">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="type-label">
              Org Compliance Score
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-score-high">
              {orgStats.complianceScoreDeltaUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {orgStats.complianceScoreDelta}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative h-20 w-20">
              <svg className="h-20 w-20" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#E1E7EF" strokeWidth={7} />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke={ringColor}
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${circumference * (1 - orgStats.complianceScore / 100)}`}
                  transform="rotate(-90 40 40)"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xl font-bold text-admin-heading">{orgStats.complianceScore}</span>
                <span className="ml-0.5 text-sm text-admin-muted">%</span>
              </div>
            </div>

            <span className="rounded-full bg-score-high-bg px-2.5 py-0.5 text-xs font-semibold text-score-high">
              {orgStats.complianceScoreDelta}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-admin-border bg-admin-card shadow-card transition-shadow duration-200 hover:shadow-card-hover">
        <CardContent className="p-5">
          <p className="type-label">At Risk</p>
          <p className="mt-2 font-display text-[42px] font-bold leading-none text-score-low">{orgStats.atRisk}</p>
          <p className="mt-1 text-xs text-admin-faint">team members</p>
          <span className="mt-3 inline-flex rounded-full bg-score-low-bg px-2.5 py-0.5 text-xs font-semibold text-score-low">
            {orgStats.atRiskDelta}
          </span>
        </CardContent>
      </Card>

      <Card className="border-admin-border bg-admin-card shadow-card transition-shadow duration-200 hover:shadow-card-hover">
        <CardContent className="p-5">
          <p className="type-label">Expiring This Week</p>
          <p className="mt-2 font-display text-[42px] font-bold leading-none text-score-mid">{orgStats.expiringThisWeek}</p>
          <p className="mt-1 text-xs text-admin-faint">credentials</p>

          <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-admin-border">
            <span className="w-[25%] flex-none bg-score-low" />
            <span className="w-[30%] flex-none bg-score-mid" />
            <span className="flex-1 bg-score-high" />
          </div>
          <p className="mt-1.5 text-xs text-admin-faint">8 expiring in next 30 days</p>
        </CardContent>
      </Card>

      <Card className="border-admin-border bg-admin-card shadow-card transition-shadow duration-200 hover:shadow-card-hover">
        <CardContent className="p-5">
          <p className="type-label">Fully Compliant</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-[42px] font-bold leading-none text-score-high">{orgStats.fullyCompliant}</span>
            <span className="font-display text-xl text-admin-muted">/ {orgStats.totalTeam}</span>
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-admin-border">
            <div className="h-full rounded-full bg-score-high transition-all duration-700" style={{ width: '77.5%' }} />
          </div>
          <p className="mt-1.5 text-xs text-admin-faint">77.5% of team</p>
        </CardContent>
      </Card>
    </div>
  )
}
