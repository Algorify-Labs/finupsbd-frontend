"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, BarChart3, Download, Filter, Search, User, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export function UserAnalyticsHeader() {
  const [userId, setUserId] = useState<string>("user_123456")
  const [dateRange, setDateRange] = useState<string>("30d")
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<string[]>([])

  const handleAddFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter])
    }
  }

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          <h1 className="text-xl font-semibold">User Analytics</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full pl-8 sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user_123456">John Doe</SelectItem>
                <SelectItem value="user_789012">Jane Smith</SelectItem>
                <SelectItem value="user_345678">Robert Johnson</SelectItem>
                <SelectItem value="user_901234">Emily Davis</SelectItem>
                <SelectItem value="user_567890">Michael Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={setDate as any}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover> */}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px]">
              <div className="space-y-2">
                <h4 className="font-medium">Filter by</h4>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleAddFilter("New Users")}>
                    New Users
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleAddFilter("Active Users")}
                  >
                    Active Users
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleAddFilter("Converted Users")}
                  >
                    Converted Users
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleAddFilter("Mobile Users")}
                  >
                    Mobile Users
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleAddFilter("Desktop Users")}
                  >
                    Desktop Users
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveFilter(filter)} />
            </Badge>
          ))}
          {filters.length > 0 && (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters([])}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

