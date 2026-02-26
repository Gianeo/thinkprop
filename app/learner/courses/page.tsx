'use client'

import Link from 'next/link'
import { Filter } from 'lucide-react'
import SidebarNav from '@/components/shared/SidebarNav'
import CourseCard from '@/components/learner/CourseCard'
import { complianceItems, courses } from '@/lib/mockData'
import { useSearchParams } from 'next/navigation'

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const requirement = searchParams.get('requirement')
  const requirementTitle = complianceItems.find((item) => item.id === requirement)?.title

  return (
    <div className="min-h-screen bg-level-0">
      <SidebarNav variant="learner" activePath="/learner/courses" />

      <main className="animate-in fade-in duration-200 md:ml-60 pt-16 md:pt-0">
        <div className="space-y-6 p-8">
          {requirement && requirementTitle && (
            <section className="flex flex-col gap-2 rounded-xl border border-wire-border bg-level-0 p-4 md:flex-row md:items-center md:justify-between">
              <p className="flex items-center gap-2 type-body-sm text-default">
                <Filter className="h-4 w-4 text-muted" />
                Showing courses that count toward: {requirementTitle}
              </p>
              <Link href="/learner/courses" className="type-body-sm font-semibold text-primary-loud">
                Clear filter
              </Link>
            </section>
          )}

          <section>
            <div className="mb-4 flex items-center gap-2">
              <h1 className="font-heading type-title-sm font-bold text-default">Available Courses</h1>
              <span className="rounded-full border border-wire-border bg-level-1 px-2.5 py-1 type-caption text-muted">{courses.length}</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} href={`/learner/courses/${course.id}`} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
