'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteTheme() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const isAdmin = pathname.startsWith('/admin')
    const isLearner = pathname.startsWith('/learner')

    root.classList.remove('dark', 'light')

    if (isAdmin) {
      root.classList.add('dark')
      return
    }

    if (isLearner) {
      root.classList.add('light')
      return
    }
  }, [pathname])

  return null
}
