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
        ? 'hsl(var(--primary-base))'
        : 'hsl(var(--destructive-base))'

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      <Card>
        <CardContent className="p-6 pt-2 space-y-4">
          <div>
            <span className="type-title-upper">Org Compliance Score</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative size-18">
              <svg className="size-18" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="hsl(var(--neutral-weakest))"
                  strokeWidth={16}
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke={ringColor}
                  strokeWidth={12}
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${circumference * (1 - orgStats.complianceScore / 100)}`}
                  transform="rotate(-90 40 40)"
                  className="transition-all duration-700"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-baseline gap-1">
                <span className="type-display leading-none text-loud">{orgStats.complianceScore}</span>
                <span className="type-body">%</span>
              </div>
              <span
                className={`flex items-center gap-1 type-body font-medium ${orgStats.complianceScoreDeltaUp ? 'text-success-default' : 'text-destructive-default'
                  }`}
              >
                {orgStats.complianceScoreDeltaUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {orgStats.complianceScoreDelta}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 pt-2 space-y-4">
          <div>
            <span className="type-title-upper">At Risk</span>
          </div>
          <div className='space-y-2'>
            <div className="flex items-end gap-4">
              <p className="type-display leading-none text-destructive-default">{orgStats.atRisk}</p>
              <p className="mb-0.5 type-caption text-calm leading-none">team <br />members</p>
            </div>
            <div className="inline-flex type-body font-semibold text-destructive-default">
              {orgStats.atRiskDelta}
            </div>
          </div>
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
