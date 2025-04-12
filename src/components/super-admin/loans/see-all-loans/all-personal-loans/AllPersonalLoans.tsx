"use client"

import { useState, useEffect } from "react"
import { Edit, Eye, MoreHorizontal, Plus, Trash2, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Loan, LoanStatus } from "@/types/loansTypes/personalLoansTypes/personalLoansTypes"
// import { apiService } from "@/services/loansServices/personalLoans"
// import { useToast } from "@/hooks/use-toast"

// Types
// type LoanStatus = "active" | "inactive" | "pending" | "rejected"

// interface LoanFeatures {
//   loanAmount: string
//   minimumAmount: string
//   maximumAmount: string
//   loanTenure: string
//   minimumYear: string
//   maximumYear: string
// }

// interface LoanEligibility {
//   condition: string
//   offer: string
//   minimumIncome: number
//   minimumExperience: number
//   ageRequirement: number
// }

// interface LoanFeesCharges {
//   processingFee: string
//   earlySettlementFee: string
//   prepaymentFee: string
//   LoanReSchedulingFee: string
//   penalCharge: string
// }

// interface Loan {
//   id: number
//   bankName: string
//   processingFee: string
//   interestRate: string
//   features: LoanFeatures
//   eligibility: LoanEligibility
//   feesCharges: LoanFeesCharges
//   status: LoanStatus
//   createdAt: string
//   updatedAt: string
// }

// API Service
const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}/personal-loan` // Replace with your actual API endpoint

const apiService = {
  // Get all loans
  getLoans: async (): Promise<Loan[]> => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch loans:", error)
      throw error
    }
  },

  // Get a single loan by ID
  getLoan: async (id: number): Promise<Loan> => {
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch loan with ID ${id}:`, error)
      throw error
    }
  },

  // Create a new loan
  createLoan: async (loan: Omit<Loan, "id" | "createdAt" | "updatedAt">): Promise<Loan> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loan),
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Failed to create loan:", error)
      throw error
    }
  },

  // Update an existing loan
  updateLoan: async (id: number, loan: Partial<Loan>): Promise<Loan> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loan),
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to update loan with ID ${id}:`, error)
      throw error
    }
  },

  // Update loan status
  updateLoanStatus: async (id: number, status: LoanStatus): Promise<Loan> => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to update status for loan with ID ${id}:`, error)
      throw error
    }
  },

  // Delete a loan
  deleteLoan: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
    } catch (error) {
      console.error(`Failed to delete loan with ID ${id}:`, error)
      throw error
    }
  },
}










// Format number with commas
const formatNumber = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// Status badge component
// const StatusBadge = ({ status }: { status: LoanStatus }) => {
//   const statusConfig = {
//     active: { variant: "default" as const, label: "Active" },
//     inactive: { variant: "secondary" as const, label: "Inactive" },
//     pending: { variant: "outline" as const, label: "Pending" },
//     rejected: { variant: "destructive" as const, label: "Rejected" },
//   }

//   const config = statusConfig[status]

//   return <Badge variant={config.variant}>{config.label}</Badge>
// }

// Create a new empty loan template
const createEmptyLoan = (): Omit<Loan, "id" | "createdAt" | "updatedAt" | "status"> => ({
  bankName: "New Bank, Personal Loan",
  processingFee: "1.0",
  interestRate: "10.0",
  features: {
    loanAmount: "BDT 1 lac up to BDT 10 lacs",
    minimumAmount: "100000",
    maximumAmount: "1000000",
    loanTenure: "12 to 48 months",
    minimumYear: "1",
    maximumYear: "4",
  },
  eligibility: {
    condition: "Must meet bank's eligibility criteria",
    offer: "Standard offer",
    minimumIncome: 30000,
    minimumExperience: 1,
    ageRequirement: 21,
  },
  feesCharges: {
    processingFee: "1.00% of loan amount",
    earlySettlementFee: "1.00% of the outstanding amount",
    prepaymentFee: "N/A",
    LoanReSchedulingFee: "Tk. 5,000",
    penalCharge: "2.00% on the arrear amount",
  },
//   status: "pending",
})

export default function AllPersonalLoans() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loanToDelete, setLoanToDelete] = useState<number | null>(null)
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<Loan | null>(null)
//   const { toast } = useToast()

  // Fetch loans on component mount
//   console.log(loans)
  useEffect(() => {
    fetchLoans()
  }, [])

  // Fetch all loans
  const fetchLoans = async () => {
    setIsLoading(true)
    try {
      const data = await apiService.getLoans()
      setLoans(data)
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to fetch loans. Please try again later.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

//   Filter loans based on search term and status
  const filteredLoans = loans?.filter((loan) => {
    const matchesSearch = loan.bankName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle delete loan
  const handleDeleteClick = (loanId: number) => {
    setLoanToDelete(loanId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (loanToDelete) {
      setIsSubmitting(true)
      try {
        await apiService.deleteLoan(loanToDelete)
        setLoans(loans.filter((loan) => loan.id !== loanToDelete))
        // toast({
        //   title: "Success",
        //   description: "Loan deleted successfully",
        // })
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: "Failed to delete loan. Please try again.",
        //   variant: "destructive",
        // })
      } finally {
        setIsSubmitting(false)
        setIsDeleteDialogOpen(false)
        setLoanToDelete(null)
      }
    }
  }

  // Handle edit loan
  const handleEditClick = (loan: Loan) => {
    setCurrentLoan(loan)
    setEditFormData({ ...loan })
    setIsEditDialogOpen(true)
  }

  const handleEditFormChange = (field: string, value: any) => {
    if (!editFormData) return

    // Handle nested objects
    if (field.includes(".")) {
      const [section, key] = field.split(".")
      setEditFormData({
        ...editFormData,
        [section]: {
          ...(editFormData[section as keyof Loan] as object),
          [key]: value,
        },
      })
    } else {
      setEditFormData({
        ...editFormData,
        [field]: value,
      })
    }
  }

  const saveEditChanges = async () => {
    if (!editFormData) return

    setIsSubmitting(true)
    try {
      if (editFormData.id) {
        // Update existing loan
        const updatedLoan = await apiService.updateLoan(editFormData.id, editFormData)
        setLoans(loans.map((loan) => (loan.id === updatedLoan.id ? updatedLoan : loan)))
        // toast({
        //   title: "Success",
        //   description: "Loan updated successfully",
        // })
      } else {
        // Create new loan
        const newLoan = await apiService.createLoan(editFormData as Omit<Loan, "id" | "createdAt" | "updatedAt">)
        setLoans([...loans, newLoan])
        // toast({
        //   title: "Success",
        //   description: "New loan created successfully",
        // })
      }
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to save loan. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsSubmitting(false)
      setIsEditDialogOpen(false)
      setEditFormData(null)
    }
  }

  // Handle view loan details
  const handleViewClick = (loan: Loan) => {
    setCurrentLoan(loan)
    setIsViewDialogOpen(true)
  }

  // Handle status change
  const handleStatusChange = async (loanId: number, newStatus: LoanStatus) => {
    try {
      const updatedLoan = await apiService.updateLoanStatus(loanId, newStatus)
      setLoans(loans.map((loan) => (loan.id === updatedLoan.id ? updatedLoan : loan)))
    //   toast({
    //     title: "Success",
    //     description: `Loan status updated to ${newStatus}`,
    //   })
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to update loan status. Please try again.",
    //     variant: "destructive",
    //   })
    }
  }

  // Add new loan
  const addNewLoan = () => {
    const emptyLoan = createEmptyLoan()
    setEditFormData(emptyLoan as Loan)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Personal Loans</h1>
          <p className="text-muted-foreground mt-1">Manage all personal loan offerings</p>
        </div>
        <Button onClick={addNewLoan}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Loan
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search by bank name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Loans Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Personal Loans</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading..."
              : `${filteredLoans.length} ${filteredLoans.length === 1 ? "loan" : "loans"} found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bank</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Processing Fee</TableHead>
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>Min. Income</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.bankName}</TableCell>
                        <TableCell>{loan.interestRate}%</TableCell>
                        <TableCell>{loan.processingFee}%</TableCell>
                        <TableCell>
                          BDT {formatNumber(loan.features.minimumAmount)} - {formatNumber(loan.features.maximumAmount)}
                        </TableCell>
                        <TableCell>{loan.features.loanTenure}</TableCell>
                        <TableCell>BDT {formatNumber(loan.eligibility.minimumIncome)}</TableCell>
                        <TableCell>
                          {/* <StatusBadge status={loan.status} /> */}
                        </TableCell>
                        <TableCell>{formatDate(loan.updatedAt)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewClick(loan)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditClick(loan)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(loan.id, "active")}
                                disabled={loan.status === "active"}
                              >
                                Set as Active
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(loan.id, "inactive")}
                                disabled={loan.status === "inactive"}
                              >
                                Set as Inactive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(loan.id, "pending")}
                                disabled={loan.status === "pending"}
                              >
                                Set as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(loan.id, "rejected")}
                                disabled={loan.status === "rejected"}
                              >
                                Set as Rejected
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(loan.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-muted-foreground mb-2">No loans found</p>
                          {searchTerm || statusFilter !== "all" ? (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("all")
                              }}
                            >
                              Clear Filters
                            </Button>
                          ) : (
                            <Button onClick={addNewLoan}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add New Loan
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Loan Details Dialog */}
      {currentLoan && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{currentLoan.bankName}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-1">
                  {/* <StatusBadge status={currentLoan.status} /> */}
                  <span className="text-sm text-muted-foreground">
                    Last updated: {formatDate(currentLoan.updatedAt)}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Loan Details</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                <TabsTrigger value="fees">Fees & Charges</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 py-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Interest Rate</h4>
                      <p className="text-lg font-bold">{currentLoan.interestRate}%</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Processing Fee</h4>
                      <p className="text-lg">{currentLoan.processingFee}%</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Loan Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Loan Amount Range</h4>
                      <p className="text-lg">{currentLoan.features.loanAmount}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Loan Tenure</h4>
                      <p className="text-lg">{currentLoan.features.loanTenure}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Minimum Amount</h4>
                      <p className="text-lg">BDT {formatNumber(currentLoan.features.minimumAmount)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Maximum Amount</h4>
                      <p className="text-lg">BDT {formatNumber(currentLoan.features.maximumAmount)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Minimum Tenure (Years)</h4>
                      <p className="text-lg">
                        {currentLoan.features.minimumYear}{" "}
                        {Number.parseInt(currentLoan.features.minimumYear) === 1 ? "year" : "years"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Maximum Tenure (Years)</h4>
                      <p className="text-lg">
                        {currentLoan.features.maximumYear}{" "}
                        {Number.parseInt(currentLoan.features.maximumYear) === 1 ? "year" : "years"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Administrative Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Created On</h4>
                      <p className="text-lg">{formatDate(currentLoan.createdAt)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Last Updated</h4>
                      <p className="text-lg">{formatDate(currentLoan.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="eligibility" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Minimum Income Requirement</h4>
                    <p className="text-lg">BDT {formatNumber(currentLoan.eligibility.minimumIncome)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Minimum Experience</h4>
                    <p className="text-lg">
                      {currentLoan.eligibility.minimumExperience}{" "}
                      {currentLoan.eligibility.minimumExperience === 1 ? "year" : "years"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Minimum Age</h4>
                    <p className="text-lg">{currentLoan.eligibility.ageRequirement} years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Offer Type</h4>
                    <p className="text-lg">{currentLoan.eligibility.offer}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Eligibility Conditions</h4>
                  <p className="text-base mt-1">{currentLoan.eligibility.condition}</p>
                </div>
              </TabsContent>

              <TabsContent value="fees" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Processing Fee</h4>
                    <p className="text-base mt-1">{currentLoan.feesCharges.processingFee}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Early Settlement Fee</h4>
                    <p className="text-base mt-1">{currentLoan.feesCharges.earlySettlementFee}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Prepayment Fee</h4>
                    <p className="text-base mt-1">{currentLoan.feesCharges.prepaymentFee}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Loan Rescheduling Fee</h4>
                    <p className="text-base mt-1">{currentLoan.feesCharges.LoanReSchedulingFee}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Penal Charge</h4>
                    <p className="text-base mt-1">{currentLoan.feesCharges.penalCharge}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => handleEditClick(currentLoan)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleDeleteClick(currentLoan.id)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Loan Dialog */}
      {editFormData && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editFormData.id ? "Edit Loan" : "Add New Loan"}</DialogTitle>
              <DialogDescription>Make changes to the loan details below</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility & Fees</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={editFormData.bankName}
                      onChange={(e) => handleEditFormChange("bankName", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editFormData.status}
                      onValueChange={(value) => handleEditFormChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="text"
                      value={editFormData.interestRate}
                      onChange={(e) => handleEditFormChange("interestRate", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="processingFee">Processing Fee (%)</Label>
                    <Input
                      id="processingFee"
                      type="text"
                      value={editFormData.processingFee}
                      onChange={(e) => handleEditFormChange("processingFee", e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="loanAmount">Loan Amount Range (Description)</Label>
                    <Input
                      id="loanAmount"
                      value={editFormData.features.loanAmount}
                      onChange={(e) => handleEditFormChange("features.loanAmount", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minimumAmount">Minimum Amount (BDT)</Label>
                      <Input
                        id="minimumAmount"
                        value={editFormData.features.minimumAmount}
                        onChange={(e) => handleEditFormChange("features.minimumAmount", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="maximumAmount">Maximum Amount (BDT)</Label>
                      <Input
                        id="maximumAmount"
                        value={editFormData.features.maximumAmount}
                        onChange={(e) => handleEditFormChange("features.maximumAmount", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="loanTenure">Loan Tenure (Description)</Label>
                    <Input
                      id="loanTenure"
                      value={editFormData.features.loanTenure}
                      onChange={(e) => handleEditFormChange("features.loanTenure", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minimumYear">Minimum Tenure (Years)</Label>
                      <Input
                        id="minimumYear"
                        value={editFormData.features.minimumYear}
                        onChange={(e) => handleEditFormChange("features.minimumYear", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="maximumYear">Maximum Tenure (Years)</Label>
                      <Input
                        id="maximumYear"
                        value={editFormData.features.maximumYear}
                        onChange={(e) => handleEditFormChange("features.maximumYear", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="eligibility" className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="condition">Eligibility Condition</Label>
                    <Textarea
                      id="condition"
                      value={editFormData.eligibility.condition}
                      onChange={(e) => handleEditFormChange("eligibility.condition", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="offer">Offer Type</Label>
                    <Input
                      id="offer"
                      value={editFormData.eligibility.offer}
                      onChange={(e) => handleEditFormChange("eligibility.offer", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minimumIncome">Minimum Income</Label>
                      <Input
                        id="minimumIncome"
                        type="number"
                        value={editFormData.eligibility.minimumIncome}
                        onChange={(e) =>
                          handleEditFormChange("eligibility.minimumIncome", Number.parseInt(e.target.value))
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="minimumExperience">Min. Experience (Years)</Label>
                      <Input
                        id="minimumExperience"
                        type="number"
                        step="0.5"
                        value={editFormData.eligibility.minimumExperience}
                        onChange={(e) =>
                          handleEditFormChange("eligibility.minimumExperience", Number.parseFloat(e.target.value))
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="ageRequirement">Minimum Age</Label>
                      <Input
                        id="ageRequirement"
                        type="number"
                        value={editFormData.eligibility.ageRequirement}
                        onChange={(e) =>
                          handleEditFormChange("eligibility.ageRequirement", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <h3 className="text-lg font-semibold">Fees & Charges</h3>

                  <div className="grid gap-2">
                    <Label htmlFor="processingFeeDetail">Processing Fee (Detail)</Label>
                    <Textarea
                      id="processingFeeDetail"
                      value={editFormData.feesCharges.processingFee}
                      onChange={(e) => handleEditFormChange("feesCharges.processingFee", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="earlySettlementFee">Early Settlement Fee</Label>
                    <Input
                      id="earlySettlementFee"
                      value={editFormData.feesCharges.earlySettlementFee}
                      onChange={(e) => handleEditFormChange("feesCharges.earlySettlementFee", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="prepaymentFee">Prepayment Fee</Label>
                    <Input
                      id="prepaymentFee"
                      value={editFormData.feesCharges.prepaymentFee}
                      onChange={(e) => handleEditFormChange("feesCharges.prepaymentFee", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="LoanReSchedulingFee">Loan Rescheduling Fee</Label>
                    <Input
                      id="LoanReSchedulingFee"
                      value={editFormData.feesCharges.LoanReSchedulingFee}
                      onChange={(e) => handleEditFormChange("feesCharges.LoanReSchedulingFee", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="penalCharge">Penal Charge</Label>
                    <Input
                      id="penalCharge"
                      value={editFormData.feesCharges.penalCharge}
                      onChange={(e) => handleEditFormChange("feesCharges.penalCharge", e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={saveEditChanges} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editFormData.id ? "Update Loan" : "Create Loan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the loan and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

