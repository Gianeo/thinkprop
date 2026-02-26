'use client'

import { AlertTriangle, Bell, Info, Send } from 'lucide-react'
import type { AtRiskPerson } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface ReminderModalProps {
  isOpen: boolean
  person: AtRiskPerson | null
  onConfirm: () => void
  onCancel: () => void
}

export default function ReminderModal({
  isOpen,
  person,
  onConfirm,
  onCancel,
}: ReminderModalProps) {
  if (!person) {
    return null
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel()
      }}
    >
      <DialogContent
        className="gap-0 overflow-hidden rounded-3xl border-neutral-weaker p-0 shadow-lg sm:max-w-md [&>button]:right-5 [&>button]:top-5 [&>button]:text-muted [&>button]:hover:text-loud"
        onInteractOutside={onCancel}
      >
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-amber/10">
                <Bell size={18} className="text-brand-amber" />
              </div>

              <DialogTitle className="mt-3 text-[17px] font-bold leading-snug text-loud font-display">
                Send Compliance Reminder
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-calm">
                Sent via email and in-app notification.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="mt-5 bg-neutral-weaker" />

        <div className="space-y-5 px-6 py-5">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">To</div>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2">
                <AvatarFallback variant="destructive" className="text-sm">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold text-loud">{person.name}</div>
                <div className="text-xs text-calm">Real Estate Agent · {person.department}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Regarding</div>
            <div className="flex items-center gap-3 rounded-xl border border-neutral-weaker bg-level-0 p-3">
              <AlertTriangle size={15} className="shrink-0 text-state-critical" />
              <span className="flex-1 text-sm font-medium text-loud">{person.credential}</span>
              <span className="ml-auto rounded-full bg-state-critical-bg px-2.5 py-1 font-mono text-xs font-bold text-state-critical">
                {person.daysLeft}d
              </span>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
              Message Preview
            </div>
            <div className="rounded-xl border border-neutral-weaker bg-level-0 p-4 font-body text-sm leading-relaxed text-calm">
              Hi {person.name.split(' ')[0]}, this is a reminder that your{' '}
              <span className="font-semibold text-loud">{person.credential}</span> expires in{' '}
              <span className="font-mono font-semibold text-state-critical">{person.daysLeft} days</span>. Please log in to
              ThinkProp and enroll in a qualifying course to maintain your license status.
              <br />
              <br />
              <span className="text-muted">— ThinkProp Compliance System</span>
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-weaker" />

        <div className="px-6 py-4">
          <div className="mb-4 flex items-center gap-1.5">
            <Info size={12} className="shrink-0 text-muted" />
            <span className="text-xs text-muted">This action will be logged to the compliance audit trail.</span>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-neutral-weaker font-semibold text-calm hover:border-neutral-weak hover:text-loud"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              className="rounded-xl bg-brand-amber font-semibold text-warning-strongest transition-all duration-150 hover:bg-warning-strong active:scale-[0.98]"
              onClick={onConfirm}
            >
              <Send size={13} className="mr-2" />
              Send Reminder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
