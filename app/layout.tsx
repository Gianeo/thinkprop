import type { Metadata } from 'next'
import { TikTok_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import RouteTheme from '@/components/shared/RouteTheme'
import './globals.css'

const tiktokSans = TikTok_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  adjustFontFallback: false,
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
      className={tiktokSans.variable}
    >
      <body
        suppressHydrationWarning
        className="font-body text-foreground antialiased"
      >
        <RouteTheme />
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
