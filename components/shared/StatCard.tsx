import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  trend?: string
  trendUp?: boolean
  color: string
}

export default function StatCard({ label, value, trend, trendUp = true, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-wire-border bg-level-1 p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-2 font-heading text-3xl font-bold ${color}`}>{value}</p>
      {trend && (
        <p className={`mt-2 flex items-center gap-1 text-xs ${trendUp ? 'text-success-default' : 'text-destructive-default'}`}>
          {trendUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {trend}
        </p>
      )}
    </div>
  )
}
