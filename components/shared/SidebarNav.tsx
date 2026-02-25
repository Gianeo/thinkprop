'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Award,
  BarChart2,
  BookOpen,
  LayoutDashboard,
  Menu,
  Settings,
  User,
  Users,
  X,
} from 'lucide-react'

interface SidebarNavProps {
  variant: 'learner' | 'admin'
  activePath: string
}

const learnerItems = [
  { label: 'Dashboard', href: '/learner/dashboard', icon: LayoutDashboard },
  { label: 'My Learning', href: '/learner/courses', icon: BookOpen },
  { label: 'Certificates', href: '/learner/dashboard#certificates', icon: Award },
  { label: 'Profile', href: '/learner/dashboard#profile', icon: User },
]

const adminItems = [
  { label: 'Overview', href: '/admin/compliance', icon: LayoutDashboard },
  { label: 'Team', href: '/admin/compliance/team', icon: Users },
  { label: 'Courses', href: '/admin/compliance', icon: BookOpen },
  { label: 'Reports', href: '/admin/compliance', icon: BarChart2 },
  { label: 'Settings', href: '/admin/compliance', icon: Settings },
]

export default function SidebarNav({ variant, activePath }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLearner = variant === 'learner'
  const items = isLearner ? learnerItems : adminItems
  const sidebarWidthClass = isLearner ? 'w-60' : 'w-56'

  const rootClasses = isLearner
    ? `${sidebarWidthClass} bg-white border-r border-wire-border text-wire-text`
    : `${sidebarWidthClass} bg-brand-navy text-white`

  const topBarClasses = isLearner ? 'bg-white border-b border-wire-border text-wire-text' : 'bg-brand-navy text-white'

  return (
    <>
      <header className={`fixed top-0 z-40 flex h-16 w-full items-center justify-between px-4 md:hidden ${topBarClasses}`}>
        <p className="font-heading text-base font-bold">
          ThinkProp <span className={isLearner ? 'text-brand-amber text-xs align-middle' : 'text-brand-amber text-xs align-middle'}>LMS</span>
        </p>
        <button type="button" onClick={() => setMobileOpen(true)} className="rounded-lg border border-wire-border p-2">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <aside className={`fixed left-0 top-0 z-30 hidden h-screen flex-col ${rootClasses} md:flex`}>
        <SidebarContent
          variant={variant}
          activePath={activePath}
          closeMobile={() => setMobileOpen(false)}
          items={items}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className={`relative z-10 flex h-full flex-col ${rootClasses}`}>
            <div className="flex h-16 items-center justify-between border-b border-wire-border px-4">
              <p className="font-heading text-base font-bold">
                ThinkProp <span className="text-brand-amber text-xs align-middle">LMS</span>
              </p>
              <button type="button" onClick={() => setMobileOpen(false)} className="rounded-lg border border-wire-border p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent
              variant={variant}
              activePath={activePath}
              closeMobile={() => setMobileOpen(false)}
              items={items}
            />
          </aside>
        </div>
      )}
    </>
  )
}

interface SidebarContentProps {
  variant: 'learner' | 'admin'
  activePath: string
  closeMobile: () => void
  items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[]
}

function SidebarContent({ variant, activePath, closeMobile, items }: SidebarContentProps) {
  const isLearner = variant === 'learner'

  return (
    <>
      <div className="hidden border-b border-wire-border px-5 py-5 md:block">
        <p className={`font-heading text-lg font-bold ${isLearner ? 'text-brand-navy' : 'text-white'}`}>
          ThinkProp <span className="text-xs text-brand-amber align-middle">LMS</span>
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon
          let isActive = false
          if (variant === 'learner') {
            isActive = activePath.startsWith(item.href)
          } else if (item.label === 'Overview') {
            isActive = activePath === '/admin/compliance'
          } else if (item.label === 'Team') {
            isActive = activePath.startsWith('/admin/compliance/team')
          }

          const baseClasses =
            'flex items-center gap-3 rounded-r-lg border-l-4 px-3 py-2.5 text-sm transition-colors'

          const activeClasses = isLearner
            ? 'border-brand-amber bg-wire-bg text-brand-navy font-semibold'
            : 'border-brand-amber bg-white/10 text-white font-semibold'

          const inactiveClasses = isLearner
            ? 'border-transparent text-wire-label hover:text-wire-text'
            : 'border-transparent text-white/70 hover:text-white'

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              onClick={closeMobile}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className={`m-4 mt-auto rounded-xl border p-3 ${isLearner ? 'border-wire-border bg-wire-bg' : 'border-white/20 bg-white/10'}`}>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${isLearner ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy'}`}
          >
            {isLearner ? 'RA' : 'TH'}
          </div>
          <div>
            <p className={`text-sm font-semibold ${isLearner ? 'text-wire-text' : 'text-white'}`}>
              {isLearner ? 'Reem Al Mansoori' : 'Tariq Hamdan'}
            </p>
            <p className={`text-xs ${isLearner ? 'text-wire-label' : 'text-white/70'}`}>
              {isLearner ? 'Real Estate Agent' : 'Admin'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
