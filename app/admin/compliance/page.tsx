'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Calendar, ChevronRight, Download } from 'lucide-react'
import { toast } from 'sonner'
import AdminSidebar from '@/components/admin/AdminSidebar'
import KpiStrip from '@/components/admin/KpiStrip'
import DepartmentFilter from '@/components/admin/DepartmentFilter'
import RiskTable from '@/components/admin/RiskTable'
import ReminderModal from '@/components/admin/ReminderModal'
import { atRiskList, adminProfile } from '@/lib/mockData'
import type { AtRiskPerson } from '@/lib/types'
import { Button } from '@/components/ui/button'

export default function AdminCompliancePage() {
  const router = useRouter()
  const [selectedDept, setSelectedDept] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPerson, setModalPerson] = useState<AtRiskPerson | null>(null)
  const [remindedIds, setRemindedIds] = useState<string[]>([])

  const filteredList = useMemo(
    () =>
      selectedDept === 'All'
        ? atRiskList
        : atRiskList.filter((person) => person.department === selectedDept),
    [selectedDept],
  )

  const onRemind = (person: AtRiskPerson) => {
    setModalPerson(person)
    setModalOpen(true)
  }

  const onConfirmReminder = () => {
    if (!modalPerson) return

    setRemindedIds((prev) => Array.from(new Set([...prev, modalPerson.id])))
    setModalOpen(false)
    setModalPerson(null)

    toast.success(`Reminder sent to ${modalPerson.name}`, {
      description: `${modalPerson.credential} · ${modalPerson.daysLeft} days remaining`,
      duration: 4000,
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-admin-surface font-body">
      <AdminSidebar activePath="/admin/compliance" />

      <div className="flex flex-1 flex-col overflow-hidden md:ml-56">
        <div className="hidden h-16 flex-shrink-0 items-center justify-between border-b border-admin-border bg-admin-card px-8 md:flex">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-admin-faint">{adminProfile.company}</span>
            <ChevronRight size={14} className="text-admin-faint" />
            <span className="font-medium text-admin-heading">Compliance</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-admin-faint">Last updated: just now</span>
            <Button className="h-9 gap-2 rounded-xl bg-brand-amber font-semibold text-white hover:bg-amber-600">
              <Download size={14} />
              Export Report
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-14 md:pt-0">
          <div className="max-w-[1400px] space-y-6 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="type-display-lg">Compliance Overview</h1>
                <p className="mt-1 text-sm text-admin-muted">
                  Real-time compliance status · {adminProfile.company}
                </p>
              </div>

              <div className="flex self-start rounded-xl border border-admin-border bg-admin-card px-4 py-2">
                <Calendar size={13} className="mr-2 text-admin-faint" />
                <span className="font-mono text-sm text-admin-body">Wed, 25 Feb 2026</span>
              </div>
            </div>

            <KpiStrip />

            <section>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="type-display-md text-[15px]">Priority Risk List</h2>
                </div>
                <DepartmentFilter selected={selectedDept} onChange={setSelectedDept} />
              </div>

              <RiskTable data={filteredList} onRemind={onRemind} remindedIds={remindedIds} />
            </section>

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm text-admin-muted">
                Showing {filteredList.length} of {atRiskList.length} at-risk members
              </span>
              <Button
                variant="link"
                className="gap-1.5 p-0 font-semibold text-state-enrolled hover:no-underline"
                onClick={() => router.push('/admin/compliance/team')}
              >
                View all 40 team members
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ReminderModal
        isOpen={modalOpen}
        person={modalPerson}
        onConfirm={onConfirmReminder}
        onCancel={() => {
          setModalOpen(false)
          setModalPerson(null)
        }}
      />
    </div>
  )
}
