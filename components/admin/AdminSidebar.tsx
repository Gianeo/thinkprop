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
      <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between bg-admin-sidebar px-4 md:hidden">
        <Logo />
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={18} />
        </Button>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-56 select-none flex-col bg-admin-sidebar md:flex"
      >
        <div className="px-5 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <Logo />
            {isMobileOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white md:hidden"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          <div className="mt-5 h-px w-full bg-white/10" />
        </div>

        <NavSection activePath={activePath} onNavigate={() => setIsMobileOpen(false)} />

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/20">
              <span className="font-display text-xs font-semibold text-brand-amber">TH</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">Tariq Hamdan</p>
              <p className="truncate text-xs text-white/40">Admin</p>
            </div>
            <LogOut className="h-3.5 w-3.5 cursor-pointer text-white/25 transition-colors hover:text-white/60" />
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-56 select-none flex-col bg-admin-sidebar md:hidden">
          <div className="px-5 pb-4 pt-6">
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="mt-5 h-px w-full bg-white/10" />
          </div>

          <NavSection activePath={activePath} onNavigate={() => setIsMobileOpen(false)} />

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/20">
                <span className="font-display text-xs font-semibold text-brand-amber">TH</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">Tariq Hamdan</p>
                <p className="truncate text-xs text-white/40">Admin</p>
              </div>
              <LogOut className="h-3.5 w-3.5 cursor-pointer text-white/25 transition-colors hover:text-white/60" />
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
        <span className="font-display text-sm font-bold text-white">T</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-[15px] font-semibold text-white">ThinkProp</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-amber">LMS</span>
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">MAIN</p>
      </div>

      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activePath === item.href

        return (
          <div
            key={item.label}
            onClick={() => {
              onNavigate()
              router.push(item.href)
            }}
            className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-white/15 text-white'
                : 'text-white/45 hover:bg-white/8 hover:text-white/80'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-amber" />
            )}
            <Icon size={16} />
            {item.label}
          </div>
        )
      })}

      <div className="mx-3 mb-3 mt-4 h-px bg-white/10" />

      <div className="mb-2 px-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">ACCOUNT</p>
      </div>

      <div
        onClick={() => {
          onNavigate()
          router.push('/admin/settings')
        }}
        className="relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/45 transition-all duration-150 hover:bg-white/8 hover:text-white/80"
      >
        <Settings size={16} />
        Settings
      </div>
    </div>
  )
}
