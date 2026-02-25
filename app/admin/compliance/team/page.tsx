'use client'

import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Clock,
} from 'lucide-react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import TeamTable from '@/components/admin/TeamTable'
import { adminProfile, adminTeam } from '@/lib/mockData'
import { Button } from '@/components/ui/button'

export default function AdminComplianceTeamPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen overflow-hidden bg-admin-surface font-body">
      <AdminSidebar activePath="/admin/compliance/team" />

      <div className="flex flex-1 flex-col overflow-hidden md:ml-56">
        <div className="hidden h-16 flex-shrink-0 items-center border-b border-admin-border bg-admin-card px-8 md:flex">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-admin-faint">{adminProfile.company}</span>
            <ChevronRight size={14} className="text-admin-faint" />
            <span className="text-admin-faint">Compliance</span>
            <ChevronRight size={14} className="text-admin-faint" />
            <span className="font-medium text-admin-heading">Team</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-14 md:pt-0">
          <div className="max-w-[1400px] space-y-6 p-8">
            <Button
              variant="link"
              className="mb-2 h-auto gap-1.5 p-0 font-semibold text-state-enrolled hover:no-underline"
              onClick={() => router.push('/admin/compliance')}
            >
              <ArrowLeft size={14} />
              Back to Overview
            </Button>

            <div>
              <h1 className="type-display-lg">Team Compliance</h1>
              <p className="mt-1 text-sm text-admin-muted">
                Full status for all 40 team members · {adminProfile.company}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-admin-border bg-admin-card px-4 py-2 text-sm">
                <CheckCircle size={14} className="text-score-high" />
                <span className="font-medium text-admin-body">31 Compliant</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-admin-border bg-admin-card px-4 py-2 text-sm">
                <AlertTriangle size={14} className="text-score-low" />
                <span className="font-medium text-admin-body">7 At Risk</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-admin-border bg-admin-card px-4 py-2 text-sm">
                <Clock size={14} className="text-score-mid" />
                <span className="font-medium text-admin-body">3 Expiring This Week</span>
              </div>
            </div>

            <TeamTable data={adminTeam} />
          </div>
        </div>
      </div>
    </div>
  )
}
