import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border font-medium leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-neutral-weak bg-level-2 text-calm hover:bg-neutral-weakest",
        primary: "border-primary-weak bg-primary-weakest text-primary-calm hover:bg-primary-weaker",
        destructive:
          "border-destructive-weak bg-destructive-weakest text-destructive-default hover:bg-destructive-weaker",
        warning: "border-warning-weak bg-warning-weakest text-warning-default hover:bg-warning-weaker",
        success: "border-success-weak bg-success-weakest text-success-default hover:bg-success-weaker",
      },
      size: {
        sm: "px-1.5 h-4.5 pt-0.5 text-xs",
        base: "px-2 h-6 pt-0.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
