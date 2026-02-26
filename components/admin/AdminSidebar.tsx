'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart2,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminSidebarProps {
  activePath: string
}

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin/compliance' },
  { label: 'Team', icon: Users, href: '/admin/compliance/team' },
  { label: 'Courses', icon: BookOpen, href: '/admin/courses' },
  { label: 'Reports', icon: BarChart2, href: '/admin/reports' },
]

export default function AdminSidebar({ activePath }: AdminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between bg-primary-strongest px-4 md:hidden">
        <Logo />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted hover:bg-[hsl(var(--neutral-weakest)/0.1)] hover:text-muted"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={18} />
        </Button>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-[hsl(var(--neutral-strongest)/0.5)] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-56 select-none flex-col bg-primary-strongest md:flex"
      >
        <div className="px-5 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <Logo />
            {isMobileOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted hover:bg-[hsl(var(--neutral-weakest)/0.1)] hover:text-muted md:hidden"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          <div className="mt-5 h-px w-full bg-[hsl(var(--neutral-weakest)/0.1)]" />
        </div>

        <NavSection activePath={activePath} onNavigate={() => setIsMobileOpen(false)} />

        <div className="border-t border-[hsl(var(--neutral-weakest)/0.1)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/20">
              <span className="font-display text-xs font-semibold text-warning-loud">TH</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-muted">Tariq Hamdan</p>
              <p className="truncate text-xs text-[hsl(var(--neutral-weakest)/0.4)]">Admin</p>
            </div>
            <LogOut className="h-3.5 w-3.5 cursor-pointer text-[hsl(var(--neutral-weakest)/0.25)] transition-colors hover:text-[hsl(var(--neutral-weakest)/0.6)]" />
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-56 select-none flex-col bg-primary-strongest md:hidden">
          <div className="px-5 pb-4 pt-6">
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted hover:bg-[hsl(var(--neutral-weakest)/0.1)] hover:text-muted"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="mt-5 h-px w-full bg-[hsl(var(--neutral-weakest)/0.1)]" />
          </div>

          <NavSection activePath={activePath} onNavigate={() => setIsMobileOpen(false)} />

          <div className="border-t border-[hsl(var(--neutral-weakest)/0.1)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/20">
                <span className="font-display text-xs font-semibold text-warning-loud">TH</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-muted">Tariq Hamdan</p>
                <p className="truncate text-xs text-[hsl(var(--neutral-weakest)/0.4)]">Admin</p>
              </div>
              <LogOut className="h-3.5 w-3.5 cursor-pointer text-[hsl(var(--neutral-weakest)/0.25)] transition-colors hover:text-[hsl(var(--neutral-weakest)/0.6)]" />
            </div>
          </div>
        </aside>
      )}
    </>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-amber">
        <span className="font-display text-sm font-bold text-contrast">T</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-[15px] font-semibold text-muted">ThinkProp</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-warning-loud">LMS</span>
      </div>
    </div>
  )
}

function NavSection({
  activePath,
  onNavigate,
}: {
  activePath: string
  onNavigate: () => void
}) {
  const router = useRouter()

  return (
    <div className="flex-1 space-y-0.5 px-3 pt-4">
      <div className="mb-2 px-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[hsl(var(--neutral-weakest)/0.25)]">
          MAIN
        </p>
      </div>

      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activePath === item.href

        return (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => {
              onNavigate()
              router.push(item.href)
            }}
            className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-[hsl(var(--neutral-weakest)/0.15)] text-muted'
                : 'text-[hsl(var(--neutral-weakest)/0.45)] hover:bg-[hsl(var(--neutral-weakest)/0.08)] hover:text-[hsl(var(--neutral-weakest)/0.8)]'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-amber" />
            )}
            <Icon size={16} />
            {item.label}
          </Button>
        )
      })}

      <div className="mx-3 mb-3 mt-4 h-px bg-[hsl(var(--neutral-weakest)/0.1)]" />

      <div className="mb-2 px-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[hsl(var(--neutral-weakest)/0.25)]">
          ACCOUNT
        </p>
      </div>

      <Button
        variant="ghost"
        onClick={() => {
          onNavigate()
          router.push('/admin/settings')
        }}
        className="relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[hsl(var(--neutral-weakest)/0.45)] transition-all duration-150 hover:bg-[hsl(var(--neutral-weakest)/0.08)] hover:text-[hsl(var(--neutral-weakest)/0.8)]"
      >
        <Settings size={16} />
        Settings
      </Button>
    </div>
  )
}
