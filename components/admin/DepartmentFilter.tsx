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
                ? 'h-8 rounded-full bg-primary-weaker border border-primary-weak px-4 text-xs font-semibold text-primary-strong hover:bg-primary-stronger'
                : 'h-8 rounded-full border-neutral-weak bg-level-1 px-4 text-xs font-medium text-neutral-strong hover:border-neutral-weak hover:text-neutral-strongest'
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
