
'use client'

import NotFound from './not-found'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (error.message.includes('404')) {
    return <NotFound />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2>Unexpected Error</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}