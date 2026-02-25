export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="dark min-h-screen bg-level-0 text-foreground">{children}</div>
}

