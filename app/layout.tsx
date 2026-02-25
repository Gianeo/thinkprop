import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'ThinkProp LMS Prototype',
  description: 'ThinkProp LMS admin compliance dashboard prototype',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={dmSans.variable}
    >
      <body
        suppressHydrationWarning
        className="font-body text-neutral-strong antialiased"
      >
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
