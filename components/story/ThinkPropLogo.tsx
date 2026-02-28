'use client'

interface ThinkPropLogoProps {
  className?: string
}

export default function ThinkPropLogo({ className = '' }: ThinkPropLogoProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-1">
        <span className="type-title-sm">ThinkProp</span>
        <span className="type-caption font-bold uppercase text-primary-base">LMS</span>
      </div>
    </div>
  )
}
