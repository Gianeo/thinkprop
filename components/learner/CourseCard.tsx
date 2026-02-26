import Link from 'next/link'
import { Course } from '@/lib/types'

interface CourseCardProps {
  course: Course
  href: string
}

export default function CourseCard({ course, href }: CourseCardProps) {
  return (
    <article className="rounded-xl border border-wire-border bg-level-1 p-5 transition hover:border-brand-navy hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-default">{course.title}</h3>
        <div className="flex flex-wrap gap-2">
          {course.format.map((entry) => (
            <span key={entry} className="rounded-full border border-wire-border px-2.5 py-1 text-xs text-muted">
              {entry}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-2 text-sm text-muted">{course.provider}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-brand-amber px-2.5 py-1 font-semibold text-contrast">{course.credits} CPD Credits</span>
        <span className="text-default">AED {course.price}</span>
        <span className="text-muted">Next: {course.nextAvailable}</span>
      </div>

      <div className="mt-4 text-right">
        <Link href={href} className="text-sm font-semibold text-primary-loud">
          View Details →
        </Link>
      </div>
    </article>
  )
}
