'use client'

import { Button } from '@/components/ui/button'

interface DepartmentFilterProps {
  selected: string
  onChange: (filter: string) => void
}

const filters = ['All', 'Critical', 'Urgent', 'Not Enrolled', 'Enrolled']

export default function DepartmentFilter({ selected, onChange }: DepartmentFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const isSelected = selected === filter

        return (
          <Button
            key={filter}
            variant={isSelected ? 'default' : 'outline'}
            className={
              isSelected
                ? 'h-8 rounded-full bg-primary-weaker border border-primary-weak px-4 type-caption font-semibold text-primary-default hover:bg-primary-stronger'
                : 'h-8 rounded-full border-neutral-weak bg-level-1 px-4 type-caption font-medium text-calm hover:border-neutral-weak hover:text-loud'
            }
            onClick={() => onChange(filter)}
          >
            {filter}
          </Button>
        )
      })}
    </div>
  )
}
