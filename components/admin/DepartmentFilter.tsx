'use client'

import { Button } from '@/components/ui/button'

interface DepartmentFilterProps {
  selected: string
  onChange: (dept: string) => void
}

const departments = ['All', 'Sales', 'Leasing', 'Management', 'Support']

export default function DepartmentFilter({ selected, onChange }: DepartmentFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {departments.map((department) => {
        const isSelected = selected === department

        return (
          <Button
            key={department}
            variant={isSelected ? 'default' : 'outline'}
            className={
              isSelected
                ? 'h-8 rounded-full bg-admin-sidebar px-4 text-xs font-semibold text-white hover:bg-admin-sidebar-hover'
                : 'h-8 rounded-full border-admin-border bg-admin-card px-4 text-xs font-medium text-admin-body hover:border-admin-border-strong hover:text-admin-heading'
            }
            onClick={() => onChange(department)}
          >
            {department}
          </Button>
        )
      })}
    </div>
  )
}
