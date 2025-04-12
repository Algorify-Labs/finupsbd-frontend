"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const applications = [
  {
    id: "APP-1234",
    applicant: "Ahmed Khan",
    product: "Home Loan",
    bank: "Eastern Bank Ltd",
    amount: "৳2,500,000",
    date: "2023-10-15",
    status: "pending",
  },
  {
    id: "APP-1235",
    applicant: "Fatima Rahman",
    product: "Credit Card",
    bank: "BRAC Bank",
    amount: "৳50,000",
    date: "2023-10-14",
    status: "approved",
  },
  {
    id: "APP-1236",
    applicant: "Mohammad Ali",
    product: "Car Loan",
    bank: "Dutch-Bangla Bank",
    amount: "৳800,000",
    date: "2023-10-14",
    status: "rejected",
  },
  {
    id: "APP-1237",
    applicant: "Nusrat Jahan",
    product: "Personal Loan",
    bank: "City Bank",
    amount: "৳300,000",
    date: "2023-10-13",
    status: "pending",
  },
  {
    id: "APP-1238",
    applicant: "Kamal Hossain",
    product: "Health Insurance",
    bank: "MetLife Bangladesh",
    amount: "৳100,000",
    date: "2023-10-12",
    status: "approved",
  },
]

export function ApplicationsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.id}</TableCell>
              <TableCell>{application.applicant}</TableCell>
              <TableCell>{application.product}</TableCell>
              <TableCell>{application.bank}</TableCell>
              <TableCell>{application.amount}</TableCell>
              <TableCell>{application.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    application.status === "approved"
                      ? "default"
                      : application.status === "pending"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {application.status}
                </Badge>
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <Link href='/super-admin/details-view'>
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
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

