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
      <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between border-b border-weak bg-level-0 px-4 md:hidden">
        <Logo />
        <Button
          variant="ghost"
          size="icon"
          withIcon="only"
          className="text-calm hover:bg-level-1 hover:text-loud"
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
        className="fixed left-0 top-0 z-40 hidden h-screen w-56 select-none flex-col bg-level-0 md:flex"
      >
        <div className="px-5 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <Logo />
            {isMobileOpen && (
              <Button
                variant="ghost"
                size="icon"
                withIcon="only"
                className="text-calm hover:bg-level-1 hover:text-loud md:hidden"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          <div className="mt-5 h-px w-full bg-border" />
        </div>

        <NavSection activePath={activePath} onNavigate={() => setIsMobileOpen(false)} />

        <div className="border-t border-weak p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/20">
              <span className="font-display type-caption font-semibold text-warning-loud">TH</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate type-body-sm font-medium text-default">Tariq Hamdan</p>
              <p className="truncate type-caption text-calm">Admin</p>
            </div>
            <LogOut className="h-3.5 w-3.5 cursor-pointer text-muted transition-colors hover:text-default" />
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-56 select-none flex-col bg-level-0 md:hidden">
          <div className="px-5 pb-4 pt-6">
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                withIcon="only"
                className="text-calm hover:bg-level-1 hover:text-loud"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="mt-5 h-px w-full bg-border" />
          </div>

          <NavSection activePath={activePath} onNavigate={() => setIsMobileOpen(false)} />

          <div className="border-t border-weak p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/20">
                <span className="font-display type-caption font-semibold text-warning-loud">TH</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate type-body-sm font-medium text-default">Tariq Hamdan</p>
                <p className="truncate type-caption text-calm">Admin</p>
              </div>
              <LogOut className="h-3.5 w-3.5 cursor-pointer text-muted transition-colors hover:text-default" />
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
        <span className="font-display type-body-sm font-bold text-contrast">T</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display type-body font-semibold text-default">ThinkProp</span>
        <span className="type-caption font-bold uppercase tracking-[0.2em] text-warning-loud">LMS</span>
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
        <p className="type-caption font-semibold uppercase tracking-[0.15em] text-weak">
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
            withIcon="before"
            onClick={() => {
              onNavigate()
              router.push(item.href)
            }}
            className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 type-body-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-level-1 text-loud'
                : 'text-calm hover:bg-level-1 hover:text-loud'
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

      <div className="mx-3 mb-3 mt-4 h-px bg-border" />

      <div className="mb-2 px-3">
        <p className="type-caption font-semibold uppercase tracking-[0.15em] text-weak">
          ACCOUNT
        </p>
      </div>

      <Button
        variant="ghost"
        withIcon="before"
        onClick={() => {
          onNavigate()
          router.push('/admin/settings')
        }}
        className="relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 type-body-sm font-medium text-calm transition-all duration-150 hover:bg-level-1 hover:text-loud"
      >
        <Settings size={16} />
        Settings
      </Button>
    </div>
  )
}
