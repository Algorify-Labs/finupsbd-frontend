"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ContentType = "articles" | "videos" | "guides" | "webinars"

interface ContentTableProps {
  type: ContentType
}

const contentItems = {
  articles: [
    {
      id: "ART-001",
      title: "Understanding Credit Scores in Bangladesh",
      author: "Imran Hossain",
      category: "Credit",
      views: 2450,
      published: "2023-09-15",
      status: "published",
    },
    {
      id: "ART-002",
      title: "How to Choose the Right Home Loan",
      author: "Sadia Khan",
      category: "Loans",
      views: 1875,
      published: "2023-09-22",
      status: "published",
    },
    {
      id: "ART-003",
      title: "Investment Strategies for Beginners",
      author: "Kamal Hossain",
      category: "Investment",
      views: 3120,
      published: "2023-10-05",
      status: "published",
    },
    {
      id: "ART-004",
      title: "Tax Planning for Small Business Owners",
      author: "Nazia Rahman",
      category: "Taxation",
      views: 980,
      published: "2023-10-12",
      status: "draft",
    },
    {
      id: "ART-005",
      title: "Digital Banking: The Future of Finance",
      author: "Farhan Ali",
      category: "Banking",
      views: 1540,
      published: "2023-10-18",
      status: "published",
    },
  ],
  videos: [
    {
      id: "VID-001",
      title: "How to Apply for a Credit Card",
      author: "Sadia Khan",
      category: "Credit Cards",
      views: 5230,
      published: "2023-09-10",
      status: "published",
    },
    {
      id: "VID-002",
      title: "Understanding Mortgage Interest Rates",
      author: "Imran Hossain",
      category: "Loans",
      views: 3870,
      published: "2023-09-25",
      status: "published",
    },
    {
      id: "VID-003",
      title: "Insurance Basics: What You Need to Know",
      author: "Nazia Rahman",
      category: "Insurance",
      views: 2980,
      published: "2023-10-08",
      status: "published",
    },
    {
      id: "VID-004",
      title: "Retirement Planning for Millennials",
      author: "Kamal Hossain",
      category: "Planning",
      views: 1850,
      published: "2023-10-15",
      status: "draft",
    },
    {
      id: "VID-005",
      title: "Cryptocurrency: Risks and Rewards",
      author: "Farhan Ali",
      category: "Investment",
      views: 4120,
      published: "2023-10-20",
      status: "published",
    },
  ],
  guides: [
    {
      id: "GDE-001",
      title: "Complete Guide to Personal Finance",
      author: "Imran Hossain",
      category: "Personal Finance",
      views: 7850,
      published: "2023-08-15",
      status: "published",
    },
    {
      id: "GDE-002",
      title: "Step-by-Step Guide to Buying Your First Home",
      author: "Sadia Khan",
      category: "Real Estate",
      views: 6320,
      published: "2023-09-05",
      status: "published",
    },
    {
      id: "GDE-003",
      title: "Ultimate Guide to Credit Score Improvement",
      author: "Nazia Rahman",
      category: "Credit",
      views: 5480,
      published: "2023-09-28",
      status: "published",
    },
    {
      id: "GDE-004",
      title: "Small Business Financing Guide",
      author: "Kamal Hossain",
      category: "Business",
      views: 3250,
      published: "2023-10-10",
      status: "draft",
    },
    {
      id: "GDE-005",
      title: "Complete Guide to Insurance Policies",
      author: "Farhan Ali",
      category: "Insurance",
      views: 4780,
      published: "2023-10-22",
      status: "published",
    },
  ],
  webinars: [
    {
      id: "WEB-001",
      title: "Financial Planning in Uncertain Times",
      author: "Imran Hossain",
      category: "Planning",
      views: 1250,
      published: "2023-09-20",
      status: "completed",
    },
    {
      id: "WEB-002",
      title: "Understanding the Stock Market",
      author: "Sadia Khan",
      category: "Investment",
      views: 980,
      published: "2023-10-05",
      status: "upcoming",
    },
    {
      id: "WEB-003",
      title: "Digital Banking and Fintech Revolution",
      author: "Farhan Ali",
      category: "Banking",
      views: 1120,
      published: "2023-10-15",
      status: "completed",
    },
    {
      id: "WEB-004",
      title: "Tax Planning Strategies for 2024",
      author: "Nazia Rahman",
      category: "Taxation",
      views: 750,
      published: "2023-10-25",
      status: "upcoming",
    },
    {
      id: "WEB-005",
      title: "Retirement Planning Workshop",
      author: "Kamal Hossain",
      category: "Planning",
      views: 890,
      published: "2023-11-05",
      status: "upcoming",
    },
  ],
}

export function ContentTable({ type }: ContentTableProps) {
  const items = contentItems[type]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.views.toLocaleString()}</TableCell>
              <TableCell>{item.published}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "published" || item.status === "completed"
                      ? "default"
                      : item.status === "draft" || item.status === "upcoming"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {item.status}
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
                      View
                    </DropdownMenuItem>
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

