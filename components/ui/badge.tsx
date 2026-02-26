import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-neutral-weak bg-level-1 text-muted hover:bg-neutral-weakest",
        primary: "border-primary-weak bg-primary-weakest text-primary-calm hover:bg-primary-weaker",
        destructive:
          "border-destructive-weak bg-destructive-weakest text-destructive-calm hover:bg-destructive-weaker",
        warning: "border-warning-weak bg-warning-weakest text-warning-calm hover:bg-warning-weaker",
        success: "border-success-weak bg-success-weakest text-success-calm hover:bg-success-weaker",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
