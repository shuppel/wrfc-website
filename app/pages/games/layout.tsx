export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {children}
    </div>
  )
} 