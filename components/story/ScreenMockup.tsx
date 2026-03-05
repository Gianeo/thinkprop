'use client'

import Image from 'next/image'

interface ScreenMockupProps {
  mockupId: string
  caption?: string
  imageSrc?: string
}

const urlMap: Record<string, string> = {
  'before-learner': 'app.thinkprop.ai/files',
  'before-admin': 'sheets.local/compliance-tracker',
  'learner-dashboard': 'app.thinkprop.ai/learner/dashboard',
  'course-discovery': 'app.thinkprop.ai/learner/courses',
  'session-picker': 'app.thinkprop.ai/learner/courses/property-valuation',
  'enrollment-confirmation': 'app.thinkprop.ai/learner/courses/confirmation',
  'dashboard-updated': 'app.thinkprop.ai/learner/dashboard',
  'admin-overview': 'app.thinkprop.ai/admin/compliance',
  'reminder-modal': 'app.thinkprop.ai/admin/compliance/reminder',
  'admin-updated': 'app.thinkprop.ai/admin/compliance',
}

export default function ScreenMockup({ mockupId, caption, imageSrc }: ScreenMockupProps) {
  return (
    <div className="animate-scale-in overflow-hidden rounded-2xl border border-admin-border border-border bg-admin-card bg-card shadow-modal shadow-lg">
      <div className="flex h-9 items-center gap-2 border-b border-admin-border border-border bg-admin-surface bg-level-0 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-state-critical/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-state-at-risk/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-state-compliant/60" />
        <div className="mx-3 flex h-5 flex-1 items-center rounded-md bg-admin-border/50 bg-border/50 px-2">
          <span className="font-mono text-[10px] text-admin-faint text-muted">{urlMap[mockupId] ?? 'app.thinkprop.ai'}</span>
        </div>
      </div>

      <div className="bg-admin-surface bg-level-0 p-4">
        {imageSrc ? (
          <div className="relative min-h-76 overflow-hidden rounded-xl border border-admin-border border-border bg-admin-card bg-card">
            <Image src={imageSrc} alt={mockupId} fill className="object-cover object-top" />
          </div>
        ) : (
          <div className="flex min-h-76 items-center justify-center rounded-xl border border-dashed border-admin-border border-border bg-admin-card bg-card">
            <div className="text-center">
              <p className="type-title-upper">Image Placeholder</p>
              <p className="type-caption mt-2">{mockupId}</p>
            </div>
          </div>
        )}
      </div>

      {caption && (
        <div className="border-t border-admin-border border-border bg-admin-surface bg-level-0 px-4 py-2.5 text-center text-xs italic text-admin-muted text-calm">
          {caption}
        </div>
      )}
    </div>
  )
}
