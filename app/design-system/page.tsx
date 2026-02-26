'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Moon, Palette, Sun, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import KpiStrip from '@/components/admin/KpiStrip'
import DepartmentFilter from '@/components/admin/DepartmentFilter'
import RiskTable from '@/components/admin/RiskTable'
import TeamTable from '@/components/admin/TeamTable'
import ReminderModal from '@/components/admin/ReminderModal'
import { adminTeam, atRiskList } from '@/lib/mockData'
import type { AtRiskPerson } from '@/lib/types'

const palettes = [
  {
    title: 'Neutral',
    token: 'neutral',
    swatches: [
      { name: 'weakest', className: 'bg-neutral-weakest' },
      { name: 'weaker', className: 'bg-neutral-weaker' },
      { name: 'weak', className: 'bg-neutral-weak' },
      { name: 'base', className: 'bg-neutral-base' },
      { name: 'strong', className: 'bg-neutral-strong' },
      { name: 'stronger', className: 'bg-neutral-stronger' },
      { name: 'strongest', className: 'bg-neutral-strongest' },
    ],
  },
  {
    title: 'Primary',
    token: 'primary',
    swatches: [
      { name: 'weakest', className: 'bg-primary-weakest' },
      { name: 'weaker', className: 'bg-primary-weaker' },
      { name: 'weak', className: 'bg-primary-weak' },
      { name: 'base', className: 'bg-primary-base' },
      { name: 'strong', className: 'bg-primary-strong' },
      { name: 'stronger', className: 'bg-primary-stronger' },
      { name: 'strongest', className: 'bg-primary-strongest' },
    ],
  },
  {
    title: 'Destructive',
    token: 'destructive',
    swatches: [
      { name: 'weakest', className: 'bg-destructive-weakest' },
      { name: 'weaker', className: 'bg-destructive-weaker' },
      { name: 'weak', className: 'bg-destructive-weak' },
      { name: 'base', className: 'bg-destructive-base' },
      { name: 'strong', className: 'bg-destructive-strong' },
      { name: 'stronger', className: 'bg-destructive-stronger' },
      { name: 'strongest', className: 'bg-destructive-strongest' },
    ],
  },
  {
    title: 'Warning',
    token: 'warning',
    swatches: [
      { name: 'weakest', className: 'bg-warning-weakest' },
      { name: 'weaker', className: 'bg-warning-weaker' },
      { name: 'weak', className: 'bg-warning-weak' },
      { name: 'base', className: 'bg-warning-base' },
      { name: 'strong', className: 'bg-warning-strong' },
      { name: 'stronger', className: 'bg-warning-stronger' },
      { name: 'strongest', className: 'bg-warning-strongest' },
    ],
  },
  {
    title: 'Success',
    token: 'success',
    swatches: [
      { name: 'weakest', className: 'bg-success-weakest' },
      { name: 'weaker', className: 'bg-success-weaker' },
      { name: 'weak', className: 'bg-success-weak' },
      { name: 'base', className: 'bg-success-base' },
      { name: 'strong', className: 'bg-success-strong' },
      { name: 'stronger', className: 'bg-success-stronger' },
      { name: 'strongest', className: 'bg-success-strongest' },
    ],
  },
] as const

function getSwatchTextTone(paletteToken: string, swatchName: string) {
  if (swatchName === 'strong' || swatchName === 'stronger' || swatchName === 'strongest') {
    return 'text-contrast'
  }

  if (paletteToken === 'neutral') {
    if (swatchName === 'weakest' || swatchName === 'weaker') return 'text-default'
    return 'text-loud'
  }

  if (swatchName === 'weakest' || swatchName === 'weaker') return `text-${paletteToken}-default`
  return `text-${paletteToken}-loud`
}

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [selectedDept, setSelectedDept] = useState('All')
  const [remindedIds, setRemindedIds] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPerson, setModalPerson] = useState<AtRiskPerson | null>(null)

  const filtered = useMemo(
    () =>
      selectedDept === 'All'
        ? atRiskList
        : atRiskList.filter((person) => person.department === selectedDept),
    [selectedDept],
  )

  return (
    <main className={`${theme} min-h-screen bg-level-0 p-6 md:p-8`}>
      <div className="mx-auto max-w-350 space-y-12">
        <header className="pb-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="inline-flex items-center gap-2 type-body-sm font-semibold text-primary-default">
              <ArrowLeft size={14} />
              Back to Navigator
            </Link>
            <div className="inline-flex items-center rounded-full border border-neutral-weaker bg-level-2 p-1">
              <Button
                variant={theme === 'light' ? 'default' : 'ghost'}
                size="sm"
                withIcon="before"
                className="h-8 gap-1.5 px-3"
                onClick={() => setTheme('light')}
              >
                <Sun size={13} />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'ghost'}
                size="sm"
                withIcon="before"
                className="h-8 gap-1.5 px-3"
                onClick={() => setTheme('dark')}
              >
                <Moon size={13} />
                Dark
              </Button>
            </div>
          </div>
          <h1 className="type-display mt-4">ThinkProp Design System</h1>
          <p className="mt-4 type-body max-w-md">
            Reference page for tokenized colors, typography scale, and shadcn-based components used in the prototype.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette size={16} className="text-primary-default" />
            <h2 className="type-title">Color Tokens</h2>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Color Palettes</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-4 lg:gap-0 md:grid-cols-2 lg:grid-cols-5">
                {palettes.map((palette) => (
                  <div key={palette.title} className="space-y-3">
                    <div>
                      <h3 className="type-title-upper text-default pl-4">{palette.title}</h3>
                      {/* <p className="type-caption">`{palette.token}` semantic ramp</p> */}
                    </div>
                    <div className="overflow-hidden">
                      {palette.swatches.map((swatch) => (
                        <div
                          key={`${palette.title}-${swatch.name}`}
                          className={`flex items-center justify-between px-4 py-4 type-caption ${swatch.className} ${getSwatchTextTone(
                            palette.token,
                            swatch.name,
                          )}`}
                        >
                          <span>{swatch.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Type size={16} className="text-primary-default" />
            <h2 className="type-title">Typography</h2>
          </div>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className='space-y-2'>
                <p className="type-title-upper">type-display</p>
                <p className="type-display">Display</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">type-title</p>
                <p className="type-title">Section Title</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">type-title-sm</p>
                <p className="type-title-sm">Subsection Title</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">type-body</p>
                <p className="type-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">type-body-sm</p>
                <p className="type-body-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">type-caption</p>
                <p className="type-caption">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">type-data</p>
                <p className="type-data">74% · 18d · Wed, 25 Feb 2026</p>
              </div>
              <div className='space-y-2'>
                <p className="type-title-upper">Tone styles</p>
                <div className="space-y-1 type-body">
                  <p className="text-loud">Loud (text-loud)</p>
                  <p className="text-default">Normal (text-default)</p>
                  <p className="text-calm">Calm (text-calm)</p>
                  <p className="text-muted">Muted (text-muted)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="type-title">Core Components</h2>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-primary text-contrast hover:bg-primary-stronger">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Action</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Compliant</Badge>
                <Badge variant="warning">At Risk</Badge>
                <Badge variant="destructive">Critical</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="type-title">Composite Components</h2>

          <KpiStrip />

          <div className='bg-level-1 rounded-lg'>
            <div className="space-y-4 p-6">
              <DepartmentFilter selected={selectedDept} onChange={setSelectedDept} />
              <RiskTable
                data={filtered}
                remindedIds={remindedIds}
                onRemind={(person) => {
                  setModalPerson(person)
                  setModalOpen(true)
                }}
              />
            </div>
          </div>

          <TeamTable data={adminTeam} />
        </section>
      </div>

      <ReminderModal
        isOpen={modalOpen}
        person={modalPerson}
        onCancel={() => {
          setModalOpen(false)
          setModalPerson(null)
        }}
        onConfirm={() => {
          if (!modalPerson) return
          setRemindedIds((prev) => Array.from(new Set([...prev, modalPerson.id])))
          setModalOpen(false)
          setModalPerson(null)
        }}
      />
    </main>
  )
}
