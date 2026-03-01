'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Clock, Moon, Palette, Sun, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import KpiStrip from '@/components/admin/KpiStrip'
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
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [remindedIds, setRemindedIds] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPerson, setModalPerson] = useState<AtRiskPerson | null>(null)

  const filtered = useMemo(() => {
    const isEnrolled = (person: AtRiskPerson) => person.status.toLowerCase().trim() === 'enrolled'
    const getDaysLeft = (person: AtRiskPerson) => Number(person.daysLeft)

    if (selectedFilter === 'All') return atRiskList
    if (selectedFilter === 'Critical') {
      return atRiskList.filter((person) => !isEnrolled(person) && getDaysLeft(person) < 14)
    }
    if (selectedFilter === 'Urgent') {
      return atRiskList.filter((person) => !isEnrolled(person) && getDaysLeft(person) >= 15 && getDaysLeft(person) <= 30)
    }
    if (selectedFilter === 'Not Enrolled') {
      return atRiskList.filter((person) => !isEnrolled(person))
    }
    return atRiskList.filter((person) => isEnrolled(person))
  }, [selectedFilter])

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
                <p className="type-data">74% · 18d · Sat, 28 Feb 2026</p>
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
              <RiskTable
                data={filtered}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                remindedIds={remindedIds}
                onRemind={(person) => {
                  setModalPerson(person)
                  setModalOpen(true)
                }}
              />
            </div>
          </div>

          <TeamTable data={adminTeam} />

          <section className="space-y-3">
            <Card className="animate-fade-in shadow-md">
              <CardContent className="p-6">
                <div className="mb-0 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-state-critical" />
                    <p className="type-title-upper font-bold text-state-critical">Top Priority</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-state-critical-bg px-3 py-1">
                    <Clock size={11} className="text-state-critical" />
                    <span className="type-data text-state-critical">18 days left</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <h3 className="type-title-sm">RERA CPD Credits</h3>
                    <p className="mb-4 type-body">
                      Your RERA broker license may be suspended if not completed by 15 Mar 2026.
                    </p>
                    <div className="max-w-sm space-y-4">
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <p className="type-body-sm text-muted">
                            Credits Progress: <span className="text-loud font-semibold">6 / 15 credits</span>
                          </p>
                        </div>
                        <div className="h-2 w-full rounded-full bg-primary-weaker">
                          <div className="h-full rounded-full bg-primary" style={{ width: '40%' }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="py-1 type-body-sm text-muted">Why this matters:</p>
                        {[
                          'License valid for all transactions',
                          'Required by RERA regulations',
                          'Covered by your organisation',
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                            <p className="type-body-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-end">
                    <Button>
                      Enroll to a Course
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-3">
            <Card className="shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STATUS</TableHead>
                    <TableHead>CREDENTIAL</TableHead>
                    <TableHead>DEADLINE</TableHead>
                    <TableHead className="text-right" aria-label="Actions" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-warning-weaker">
                    <TableCell>
                      <Badge variant="warning" size="sm">
                        At Risk
                      </Badge>
                    </TableCell>
                    <TableCell className="type-body-sm text-loud">AML Certificate</TableCell>
                    <TableCell className="type-body-sm text-calm">27 days left</TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" size="sm" className="h-auto p-0 type-body-sm">
                        Take Action
                        <ChevronRight size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="default" size="sm">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell className="type-body-sm text-loud">Property Management License</TableCell>
                    <TableCell className="type-body-sm text-calm">Due 1 Jun 2026 (in 3 months)</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 type-body-sm text-muted hover:text-default"
                      >
                        View Requirement
                        <ChevronRight size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="default" size="sm">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell className="type-body-sm text-loud">Ethics CPD Refresher</TableCell>
                    <TableCell className="type-body-sm text-calm">Due 15 Jul 2026 (in 4.5 months)</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 type-body-sm text-muted hover:text-default"
                      >
                        View Requirement
                        <ChevronRight size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </section>

          <section className="space-y-2 pb-6">
            <div className="space-y-3">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-start gap-2">
                    <Badge size="sm" variant="primary">
                      Covers 9 of your 15 required credits
                    </Badge>
                    <Badge size="sm">
                      8 CPD Credits
                    </Badge>
                  </div>
                  <h3 className="mb-1 type-title-sm">Property Valuation Fundamentals</h3>
                  <p className="type-body-sm text-calm">ThinkProp Academy · Sarah Al Mansoori, MRICS</p>
                  <div className="mt-3 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <span className="type-body-sm text-default">Virtual + Classroom</span>
                      <span className="type-body-sm text-muted">15 Mar 2026</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 type-body-sm font-semibold text-state-enrolled">
                      View Details
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-start gap-2">
                    <Badge size="sm" variant="primary">
                      Popular with agents in your role
                    </Badge>
                    <Badge size="sm">
                      6 CPD Credits
                    </Badge>
                  </div>
                  <h3 className="mb-1 type-title-sm">Real Estate Market Trends 2026</h3>
                  <p className="type-body-sm text-calm">ThinkProp Academy · Dr. Khalid Al Hammadi</p>
                  <div className="mt-3 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <span className="type-body-sm text-default">Virtual</span>
                      <span className="type-body-sm text-muted">18 Mar 2026</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 type-body-sm font-semibold text-state-enrolled">
                      View Details
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-start gap-2">
                    <Badge size="sm" variant="primary">
                      Required for your license renewal
                    </Badge>
                    <Badge size="sm">
                      4 CPD Credits
                    </Badge>
                  </div>
                  <h3 className="mb-1 type-title-sm">RERA Regulations Update 2026</h3>
                  <p className="type-body-sm text-calm">ThinkProp Academy · Fatima Al Zaabi</p>
                  <div className="mt-3 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <span className="type-body-sm text-default">Virtual</span>
                      <span className="type-body-sm text-muted">20 Mar 2026</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 type-body-sm font-semibold text-state-enrolled">
                      View Details
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
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
