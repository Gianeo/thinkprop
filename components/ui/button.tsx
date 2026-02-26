import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base tracking-tight font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-contrast hover:bg-primary/90",
        destructive:
          "bg-destructive text-contrast hover:bg-destructive/90",
        outline:
          "border border-input bg-background/0 text-loud hover:bg-accent hover:text-default",
        secondary:
          "bg-secondary text-default hover:bg-secondary/80",
        ghost: "text-loud hover:bg-accent hover:text-default",
        link: "text-primary-default underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 px-4 text-sm",
        lg: "h-10 px-6",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withIcon?: "before" | "after" | "only"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, withIcon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const iconOnlyClass =
      withIcon === "only"
        ? size === "sm"
          ? "size-8 p-0 gap-0"
          : size === "lg"
            ? "size-10 p-0 gap-0"
            : "size-9 p-0 gap-0"
        : ""
    const iconWithLabelPaddingClass =
      withIcon && withIcon !== "only"
        ? size === "sm"
          ? "pl-3 pr-4"
          : size === "lg"
            ? "pl-7 pr-8"
            : "pl-4 pr-5"
        : ""

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          iconOnlyClass,
          iconWithLabelPaddingClass,
          className
        )}
        data-icon={withIcon}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
