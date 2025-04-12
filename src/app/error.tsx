
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error('Error Boundary:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-2xl space-y-4 rounded-lg border bg-destructive/10 p-8">
        <h1 className="text-2xl font-bold text-destructive">
          Oops! Something went wrong
        </h1>
        
        <div className="space-y-2 text-left">
          <div className="rounded-md bg-destructive/5 p-4 font-mono text-sm">
            <p className="font-medium">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          
          <p className="text-muted-foreground">
            We've reported this error to our team. Please try again.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="default"
            onClick={reset}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.assign('/')}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  )
}