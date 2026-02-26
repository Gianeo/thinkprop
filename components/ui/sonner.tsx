"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-level-2 group-[.toaster]:text-default group-[.toaster]:border-weak group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-level-2 dark:group-[.toaster]:text-default dark:group-[.toaster]:border-strong",
          description: "group-[.toast]:text-calm dark:group-[.toast]:text-calm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-contrast hover:group-[.toast]:bg-primary-strong",
          cancelButton:
            "group-[.toast]:bg-level-1 group-[.toast]:text-calm dark:group-[.toast]:bg-level-1 dark:group-[.toast]:text-calm",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
