'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PillsProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
  size?: 'sm' | 'base'
  className?: string
}

export function Pills({ options, selected, onChange, size = 'base', className }: PillsProps) {
  const sizeClasses = size === 'sm' ? 'h-8 px-4 text-sm' : 'px-4'

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {options.map((option) => {
        const isSelected = selected === option

        return (
          <Button
            key={option}
            variant={isSelected ? 'default' : 'outline'}
            className={
              isSelected
                ? cn(
                    'rounded-full border border-primary-weak bg-primary-weaker type-caption font-normal text-primary-default hover:bg-primary-weak',
                    sizeClasses,
                  )
                : cn(
                    'rounded-full border-neutral-weak bg-level-2 type-caption font-normal text-calm hover:border-neutral-weak hover:text-loud',
                    sizeClasses,
                  )
            }
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        )
      })}
    </div>
  )
}
