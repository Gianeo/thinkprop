'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { orgStats } from '@/lib/mockData'

export default function KpiStrip() {
  const circumference = 2 * Math.PI * 32
  const ringColor =
    orgStats.complianceScore >= 80
      ? 'hsl(var(--success-base))'
      : orgStats.complianceScore >= 60
        ? 'hsl(var(--warning-base))'
        : 'hsl(var(--destructive-base))'

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="type-title-upper">
              Org Compliance Score
            </span>
            <span className="flex items-center gap-1 type-caption font-medium text-success-default">
              {orgStats.complianceScoreDeltaUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {orgStats.complianceScoreDelta}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative h-20 w-20">
              <svg className="h-20 w-20" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="hsl(var(--neutral-weaker))"
                  strokeWidth={7}
                />
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
                <span className="font-display type-title-sm font-bold text-default">{orgStats.complianceScore}</span>
                <span className="ml-0.5 type-body-sm text-calm">%</span>
              </div>
            </div>

            <span className="rounded-full bg-score-high-bg px-2.5 py-0.5 type-caption font-semibold text-success-default">
              {orgStats.complianceScoreDelta}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="type-title-upper">At Risk</p>
          <p className="mt-2 type-display leading-none text-destructive-default">{orgStats.atRisk}</p>
          <p className="mt-1 type-caption text-calm">team members</p>
          <span className="mt-3 inline-flex rounded-full bg-score-low-bg px-2.5 py-0.5 type-caption font-semibold text-destructive-default">
            {orgStats.atRiskDelta}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="type-title-upper">Expiring This Week</p>
          <p className="mt-2 type-display leading-none text-warning-default">{orgStats.expiringThisWeek}</p>
          <p className="mt-1 type-caption">credentials</p>

          <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-neutral-weaker">
            <span className="w-[25%] flex-none bg-score-low" />
            <span className="w-[30%] flex-none bg-score-mid" />
            <span className="flex-1 bg-score-high" />
          </div>
          <p className="mt-1.5 type-caption">8 expiring in next 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="type-title-upper">Fully Compliant</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="type-display leading-none text-success-default">{orgStats.fullyCompliant}</span>
            <span className="font-display type-title-sm text-calm">/ {orgStats.totalTeam}</span>
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-weaker">
            <div className="h-full rounded-full bg-score-high transition-all duration-700" style={{ width: '77.5%' }} />
          </div>
          <p className="mt-1.5 type-caption">77.5% of team</p>
        </CardContent>
      </Card>
    </div>
  )
}
