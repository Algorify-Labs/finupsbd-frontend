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

const products = [
  {
    id: "PROD-001",
    name: "Premium Home Loan",
    type: "Loan",
    category: "Home Loan",
    bank: "Eastern Bank Ltd",
    interestRate: "8.5%",
    status: "active",
  },
  {
    id: "PROD-002",
    name: "Platinum Credit Card",
    type: "Credit Card",
    category: "Premium",
    bank: "BRAC Bank",
    interestRate: "24%",
    status: "active",
  },
  {
    id: "PROD-003",
    name: "Health Shield Insurance",
    type: "Insurance",
    category: "Health",
    bank: "MetLife Bangladesh",
    interestRate: "N/A",
    status: "active",
  },
  {
    id: "PROD-004",
    name: "Student Education Loan",
    type: "Loan",
    category: "Education",
    bank: "Dutch-Bangla Bank",
    interestRate: "7%",
    status: "inactive",
  },
  {
    id: "PROD-005",
    name: "Fixed Deposit - 5 Year",
    type: "Fixed Deposit",
    category: "Long Term",
    bank: "Sonali Bank",
    interestRate: "6.5%",
    status: "active",
  },
]

export function ProductsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Interest Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.bank}</TableCell>
              <TableCell>{product.interestRate}</TableCell>
              <TableCell>
                <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
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

