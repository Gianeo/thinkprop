'use client'

import { Pills } from '@/components/ui/pills'

interface DepartmentFilterProps {
  selected: string
  onChange: (filter: string) => void
}

const filters = ['All', 'Critical', 'Urgent', 'Not Enrolled', 'Enrolled']

export default function DepartmentFilter({ selected, onChange }: DepartmentFilterProps) {
  return <Pills options={filters} selected={selected} onChange={onChange} size='sm' />
}
