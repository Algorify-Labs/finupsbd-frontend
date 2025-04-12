import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center bg-gradient-to-br from-background to-muted/20">
      <div className="flex flex-col items-center justify-center gap-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="relative inline-block">
          <div className="absolute -top-4 -left-4 opacity-20 text-destructive/80 text-8xl">
            ⁰
          </div>
          <h1 className="text-9xl font-black text-destructive relative z-10">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Page Not Found
          </h2>
          
          <p className="text-lg text-muted-foreground">
            The page you're seeking has either vanished into the digital abyss or never existed.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Button asChild size="lg" className="gap-2 transition-all hover:scale-105">
            <Link href="/">
              <span>🏠</span> Return Home
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Think this is a mistake?{' '}
          <Link href="/contact" className="text-primary underline hover:text-primary/80">
            Let us know
          </Link>
        </p>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return []
}