import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Crumb {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: Crumb[]
  homeHref?: string
  showHomeIcon?: boolean
  className?: string
}

export const Breadcrumb = ({ items, homeHref = "/", showHomeIcon = false, className }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center space-x-1 text-sm" role="list">
        {showHomeIcon && (
          <li className="flex items-center">
            <Link
              href={homeHref}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <Link href={item.href ?? "#"} className="text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Dummy exports to satisfy the app/page.tsx imports.  These could be fleshed out further if needed.
export const BreadcrumbList = () => <></>
export const BreadcrumbItem = () => <></>
export const BreadcrumbLink = () => <></>
export const BreadcrumbPage = () => <></>
export const BreadcrumbSeparator = () => <></>
export const BreadcrumbEllipsis = () => <></>

