'use client'

import { useEffect } from 'react'

import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ErrorBoundaryPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Send error to your monitoring service here
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <AlertTriangle className="mx-auto mb-2 h-12 w-12 text-red-500" />
          <CardTitle className="text-xl">Oops—Something Went Wrong</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            We ran into an unexpected issue. Don’t worry, it’s not your fault.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded bg-gray-100 p-3 text-xs text-red-700 overflow-auto">
            <strong>Error:</strong> {error.message}
            {error.digest && (
              <div className="mt-1 text-xxs text-gray-500">
                (Code: {error.digest})
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={reset}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
