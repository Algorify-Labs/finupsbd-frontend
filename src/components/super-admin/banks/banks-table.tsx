"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const banks = [
  {
    id: "BNK-001",
    name: "Eastern Bank Ltd",
    type: "Commercial Bank",
    products: 24,
    applications: 156,
    status: "active",
  },
  {
    id: "BNK-002",
    name: "BRAC Bank",
    type: "Commercial Bank",
    products: 32,
    applications: 210,
    status: "active",
  },
  {
    id: "BNK-003",
    name: "MetLife Bangladesh",
    type: "Insurance",
    products: 12,
    applications: 87,
    status: "active",
  },
  {
    id: "BNK-004",
    name: "Dutch-Bangla Bank",
    type: "Commercial Bank",
    products: 28,
    applications: 143,
    status: "active",
  },
  {
    id: "BNK-005",
    name: "Sonali Bank",
    type: "State-owned Bank",
    products: 18,
    applications: 92,
    status: "inactive",
  },
]

export function BanksTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Institution</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banks.map((bank) => (
            <TableRow key={bank.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={bank.name} />
                    <AvatarFallback>{bank.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{bank.name}</div>
                </div>
              </TableCell>
              <TableCell>{bank.type}</TableCell>
              <TableCell>{bank.products}</TableCell>
              <TableCell>{bank.applications}</TableCell>
              <TableCell>
                <Badge variant={bank.status === "active" ? "default" : "secondary"}>{bank.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

