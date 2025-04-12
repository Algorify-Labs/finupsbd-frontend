"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  X,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample KYC data
const kycRequests = [
  {
    id: "KYC-2023-1234",
    userId: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Pending",
    submittedAt: "2023-11-10 14:30:45",
    documents: [
      { type: "National ID", status: "Pending" },
      { type: "Proof of Address", status: "Pending" },
      { type: "Selfie", status: "Pending" },
    ],
  },
  {
    id: "KYC-2023-1233",
    userId: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "Pending",
    submittedAt: "2023-11-09 09:15:22",
    documents: [
      { type: "Passport", status: "Pending" },
      { type: "Proof of Address", status: "Pending" },
    ],
  },
  {
    id: "KYC-2023-1232",
    userId: "USR-003",
    name: "Michael Brown",
    email: "m.brown@example.com",
    status: "Approved",
    submittedAt: "2023-11-08 16:45:10",
    approvedAt: "2023-11-09 10:20:15",
    documents: [
      { type: "National ID", status: "Approved" },
      { type: "Proof of Address", status: "Approved" },
      { type: "Selfie", status: "Approved" },
      { type: "Bank Statement", status: "Approved" },
    ],
  },
  {
    id: "KYC-2023-1231",
    userId: "USR-004",
    name: "Emily Wilson",
    email: "e.wilson@example.com",
    status: "Rejected",
    submittedAt: "2023-11-07 11:20:33",
    rejectedAt: "2023-11-08 09:45:20",
    rejectionReason: "Document quality too low to verify identity",
    documents: [
      { type: "National ID", status: "Rejected" },
      { type: "Proof of Address", status: "Approved" },
    ],
  },
  {
    id: "KYC-2023-1230",
    userId: "USR-006",
    name: "Jennifer Smith",
    email: "j.smith@example.com",
    status: "Approved",
    submittedAt: "2023-11-05 13:40:55",
    approvedAt: "2023-11-06 15:30:22",
    documents: [
      { type: "Passport", status: "Approved" },
      { type: "Proof of Address", status: "Approved" },
      { type: "Selfie", status: "Approved" },
    ],
  },
  {
    id: "KYC-2023-1229",
    userId: "USR-007",
    name: "Robert Johnson",
    email: "r.johnson@example.com",
    status: "Approved",
    submittedAt: "2023-11-04 15:25:40",
    approvedAt: "2023-11-05 11:10:05",
    documents: [
      { type: "National ID", status: "Approved" },
      { type: "Proof of Address", status: "Approved" },
      { type: "Selfie", status: "Approved" },
    ],
  },
  {
    id: "KYC-2023-1228",
    userId: "USR-008",
    name: "Lisa Wang",
    email: "l.wang@example.com",
    status: "Pending",
    submittedAt: "2023-11-08 09:15:30",
    documents: [
      { type: "Passport", status: "Pending" },
      { type: "Proof of Address", status: "Pending" },
      { type: "Selfie", status: "Pending" },
    ],
  },
]

export default function KYCForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  // Filter KYC requests based on search term and status filter
  const filteredRequests = kycRequests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Count requests by status
  const pendingCount = kycRequests.filter((req) => req.status === "Pending").length
  const approvedCount = kycRequests.filter((req) => req.status === "Approved").length
  const rejectedCount = kycRequests.filter((req) => req.status === "Rejected").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">KYC Verification</h1>
        <p className="text-muted-foreground">Manage and verify user identity documents.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Successfully verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Failed verification</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search KYC requests..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter Requests</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <p className="mb-1 text-xs font-medium">Status</p>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={request.name} />
                            <AvatarFallback>
                              {request.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-xs text-muted-foreground">{request.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{request.documents.length}</Badge>
                          <span className="text-xs text-muted-foreground">documents</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "default"
                              : request.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : request.status === "Approved"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : request.status === "Rejected"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : ""
                          }
                        >
                          {request.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                          {request.status === "Approved" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {request.status === "Rejected" && <X className="mr-1 h-3 w-3" />}
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.submittedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request)
                              setViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Documents</DropdownMenuItem>
                              {request.status === "Pending" && (
                                <>
                                  <DropdownMenuItem className="text-green-600">Approve</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No KYC requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {/* Similar content as "all" tab but filtered for pending requests */}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {/* Similar content as "all" tab but filtered for approved requests */}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {/* Similar content as "all" tab but filtered for rejected requests */}
        </TabsContent>
      </Tabs>

      {/* KYC Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>KYC Verification Details</DialogTitle>
            <DialogDescription>Review user documents and verification information</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">User Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={selectedRequest.name} />
                        <AvatarFallback>
                            {selectedRequest.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedRequest.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedRequest.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 rounded-lg border p-3">
                      <div>
                        <p className="text-xs text-muted-foreground">User ID</p>
                        <p className="font-medium">{selectedRequest.userId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">KYC Request ID</p>
                        <p className="font-medium">{selectedRequest.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Submitted</p>
                        <p className="font-medium">{selectedRequest.submittedAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <Badge
                          variant={
                            selectedRequest.status === "Approved"
                              ? "default"
                              : selectedRequest.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            selectedRequest.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : selectedRequest.status === "Approved"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : selectedRequest.status === "Rejected"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : ""
                          }
                        >
                          {selectedRequest.status}
                        </Badge>
                      </div>
                    </div>

                    {selectedRequest.status === "Rejected" && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">Rejection Reason</p>
                        <p className="text-sm text-red-700 dark:text-red-400">{selectedRequest.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Documents</h3>
                  <div className="mt-2 space-y-2">
                    {selectedRequest.documents.map((doc: any, index: number) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <p className="font-medium">{doc.type}</p>
                          </div>
                          <Badge
                            variant={
                              doc.status === "Approved"
                                ? "default"
                                : doc.status === "Rejected"
                                  ? "destructive"
                                  : "outline"
                            }
                            className={
                              doc.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : doc.status === "Approved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : doc.status === "Rejected"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : ""
                            }
                          >
                            {doc.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex justify-center">
                          <div className="relative h-32 w-full rounded-md bg-muted">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Eye className="h-6 w-6 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedRequest.status === "Pending" && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button className="bg-green-600 text-white hover:bg-green-700">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

