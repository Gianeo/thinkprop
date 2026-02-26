'use client'

import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
  onClose?: () => void
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible || !onClose) {
      return
    }

    const timeout = window.setTimeout(() => {
      onClose()
    }, 3000)

    return () => window.clearTimeout(timeout)
  }, [visible, onClose])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 rounded-xl border border-wire-border border-l-4 border-l-state-compliant bg-level-1 px-4 py-3">
        <CheckCircle className="h-5 w-5 text-success-default" />
        <p className="type-body-sm text-default">{message}</p>
      </div>
    </div>
  )
}
