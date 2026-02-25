export default function LearnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="light min-h-screen bg-level-0 text-foreground">{children}</div>
}

