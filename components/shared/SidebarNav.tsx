'use client'

import Link from 'next/link'
import Image from 'next/image'
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
import { Button } from '@/components/ui/button'
import ThinkPropLogo from '@/components/story/ThinkPropLogo'

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
  const sidebarWidthClass = isLearner ? 'w-52' : 'w-48'

  const rootClasses = isLearner
    ? `${sidebarWidthClass} bg-level-0 text-default`
    : `${sidebarWidthClass} bg-brand-navy text-muted`

  const topBarClasses = isLearner
    ? 'bg-level-0 border-b border-wire-border text-default'
    : 'bg-brand-navy text-muted'

  return (
    <>
      <header className={`fixed top-0 z-40 flex h-16 w-full items-center justify-between px-4 md:hidden ${topBarClasses}`}>
        {isLearner ? (
          <ThinkPropLogo />
        ) : (
          <p className="type-body font-bold">
            ThinkProp{' '}
            <span className="text-primary-loud type-caption align-middle">
              LMS
            </span>
          </p>
        )}
        <Button variant="outline" size="icon" withIcon="only" onClick={() => setMobileOpen(true)} className="rounded-lg border border-wire-border p-2">
          <Menu className="h-5 w-5" />
        </Button>
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
          <div className="absolute inset-0 bg-[hsl(var(--neutral-strongest)/0.4)]" onClick={() => setMobileOpen(false)} />
          <aside className={`relative z-10 flex h-full flex-col ${rootClasses}`}>
            <div className="flex h-16 items-center justify-between border-b border-wire-border px-4">
              {isLearner ? (
                <ThinkPropLogo />
              ) : (
                <p className="font-heading type-body font-bold">
                  ThinkProp{' '}
                  <span className="text-primary-loud type-caption align-middle">
                    LMS
                  </span>
                </p>
              )}
              <Button variant="outline" size="icon" withIcon="only" onClick={() => setMobileOpen(false)} className="rounded-lg border border-wire-border p-2">
                <X className="h-5 w-5" />
              </Button>
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
      <div className="hidden p-6 md:block">
        {isLearner ? (
          <ThinkPropLogo />
        ) : (
          <p className="font-heading type-title-sm font-bold text-muted">
            ThinkProp <span className="type-caption align-middle text-primary-loud">LMS</span>
          </p>
        )}
      </div>

      {isLearner ? (
        <div className="p-6 pt-0">
          <div className="flex flex-col items-start gap-4">
            <div className="relative size-24 overflow-hidden rounded-full border border-wire-border">
              <Image
                src="/images/Reem-profile.webp"
                alt="Reem profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="type-body-sm font-semibold text-default">Reem Al Mansoori</p>
              <p className="type-caption text-muted">Real Estate Agent</p>
              {/* <Link
                href="/learner/dashboard#profile"
                onClick={closeMobile}
                className="type-body-sm mt-1 inline-block text-strong hover:underline"
              >
                Profile
              </Link> */}
            </div>
          </div>
        </div>
      ) : null}

      <nav className="flex-1 space-y-1 p-4 pt-0">
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
            'flex items-center gap-3 px-2 py-2.5 type-body-sm transition-colors'

          const activeClasses = isLearner
            ? 'text-primary-calm font-medium'
            : 'text-calm font-medium'

          const inactiveClasses = isLearner
            ? 'border-transparent text-calm hover:text-default'
            : 'border-transparent text-[hsl(var(--neutral-weakest)/0.7)] hover:text-calm'

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              onClick={closeMobile}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {!isLearner ? (
        <div className="m-4 mt-auto rounded-xl border border-[hsl(var(--neutral-weakest)/0.2)] bg-[hsl(var(--neutral-weakest)/0.1)] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-weakest text-primary-loud type-body-sm font-semibold">
              TH
            </div>
            <div>
              <p className="type-body-sm font-semibold text-muted">Tariq Hamdan</p>
              <p className="type-caption text-[hsl(var(--neutral-weakest)/0.7)]">Admin</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
