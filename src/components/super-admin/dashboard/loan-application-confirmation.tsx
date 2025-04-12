"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Download,
    Printer,
    Share2,
    Clock,
    User,
    Home,
    Briefcase,
    CreditCard,
    DollarSign,
    Copy,
    CheckCircle,
    Calendar,
    Mail,
    Phone,
    MapPin,
    FileText,
    ChevronRight,
} from "lucide-react"
import { generatePDF } from "@/components/super-admin/dashboard/lib/pdf-generator"
import { formatDate, formatCurrency } from "@/components/super-admin/dashboard/lib/utils"
import type { LoanApplication } from "@/components/super-admin/dashboard/lib/types"


interface LoanApplicationConfirmationProps {
    loanApplication: LoanApplication
}

export default function DetailsViewFrom({ loanApplication }: LoanApplicationConfirmationProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    const handleDownload = async () => {
        setIsGenerating(true)
        try {
            await generatePDF(loanApplication)

        } catch (error) {
            console.error("Failed to generate PDF:", error)

        } finally {
            setIsGenerating(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-800 border-green-300"
            case "REJECTED":
                return "bg-red-100 text-red-800 border-red-300"
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 border-yellow-300"
            default:
                return "bg-blue-100 text-blue-800 border-blue-300"
        }
    }

    const getStatusProgress = (status: string) => {
        switch (status) {
            case "APPROVED":
                return 100
            case "REJECTED":
                return 100
            case "PENDING":
                return 50
            case "PROCESSING":
                return 75
            default:
                return 25
        }
    }

    const getStatusSteps = () => {
        const steps = [
            { name: "Submitted", completed: true, current: false },
            {
                name: "Under Review",
                completed: loanApplication.status !== "SUBMITTED",
                current: loanApplication.status === "PENDING",
            },
            {
                name: "Decision",
                completed: loanApplication.status === "APPROVED" || loanApplication.status === "REJECTED",
                current: false,
            },
            {
                name: "Finalized",
                completed: loanApplication.status === "APPROVED",
                current: loanApplication.status === "APPROVED",
            },
        ]
        return steps
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Application Header Banner */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">Loan Application</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(loanApplication.applicationId)}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">{loanApplication.applicationId}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="inline-block mr-1 h-3 w-3" />
                                {formatDate(loanApplication.createdAt)}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge className={`px-3 py-1 text-sm font-medium border ${getStatusColor(loanApplication.status)}`}>
                            {loanApplication.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Last updated: {formatDate(loanApplication.updatedAt)}</span>
                    </div>
                </div>

                {/* Application Progress */}
                <div className="mt-6">
                    <div className="flex justify-between mb-2">
                        {getStatusSteps().map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${step.completed
                                            ? "bg-primary text-primary-foreground"
                                            : step.current
                                                ? "bg-primary/20 text-primary border-2 border-primary"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                                </div>
                                <span
                                    className={`text-xs mt-1 ${step.completed || step.current ? "font-medium" : "text-muted-foreground"}`}
                                >
                                    {step.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Progress value={getStatusProgress(loanApplication.status)} className="h-2" />
                </div>
            </div>

            <Card className="shadow-lg border-t-4 border-t-primary">
                <CardHeader className="bg-muted/30 pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">Application Details</CardTitle>
                        <div className="flex gap-2">
                            <Button onClick={handleDownload} size="sm" disabled={isGenerating}>
                                <Download className="mr-2 h-4 w-4" />
                                {isGenerating ? "Generating..." : "Download PDF"}
                            </Button>
                            <Button variant="outline" size="sm">
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="px-6 pt-2">
                        <TabsList className="grid grid-cols-5 w-full">
                            <TabsTrigger value="overview" className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span className="hidden sm:inline">Overview</span>
                            </TabsTrigger>
                            <TabsTrigger value="personal" className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">Personal</span>
                            </TabsTrigger>
                            <TabsTrigger value="residential" className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                <span className="hidden sm:inline">Residential</span>
                            </TabsTrigger>
                            <TabsTrigger value="employment" className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                <span className="hidden sm:inline">Employment</span>
                            </TabsTrigger>
                            <TabsTrigger value="loan" className="flex items-center gap-1">
                                <CreditCard className="h-4 w-4" />
                                <span className="hidden sm:inline">Loan</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <CardContent className="pt-6">
                        <TabsContent value="overview" className="space-y-6">
                            {/* Overview Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-muted/20">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium flex items-center">
                                            <User className="mr-2 h-4 w-4 text-primary" />
                                            Applicant
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-lg font-semibold">{loanApplication.userInfo.fullName}</div>
                                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                                            <Mail className="mr-1 h-3 w-3" />
                                            {loanApplication.userInfo.emailAddress}
                                        </div>
                                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                                            <Phone className="mr-1 h-3 w-3" />
                                            {loanApplication.userInfo.mobileNumber}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-muted/20">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium flex items-center">
                                            <CreditCard className="mr-2 h-4 w-4 text-primary" />
                                            Loan Request
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-lg font-semibold">
                                            {formatCurrency(loanApplication.loanSpecifications.loanAmountRequested)}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {loanApplication.loanSpecifications.purposeOfLoan}
                                        </div>
                                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {loanApplication.loanSpecifications.preferredLoanTenure} months
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-muted/20">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium flex items-center">
                                            <DollarSign className="mr-2 h-4 w-4 text-primary" />
                                            Financial Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-lg font-semibold">
                                            {formatCurrency(loanApplication.employmentFinancialInfo.monthlyGrossIncome)}
                                            <span className="text-xs text-muted-foreground ml-1">/ month</span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-muted-foreground">Expenses:</span>
                                            <span>{formatCurrency(loanApplication.employmentFinancialInfo.totalMonthlyExpenses)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-muted-foreground">Credit Score:</span>
                                            <span>{loanApplication.employmentFinancialInfo.currentCreditScore}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Links */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Application Timeline</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <div className="flex h-6 items-center">
                                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-primary rounded-full text-primary-foreground">
                                                    <CheckCircle className="h-3 w-3" />
                                                </div>
                                                <div className="w-px h-full bg-muted-foreground/20"></div>
                                            </div>
                                            <div className="ml-4 -mt-1">
                                                <h4 className="text-sm font-medium">Application Submitted</h4>
                                                <p className="text-xs text-muted-foreground">{formatDate(loanApplication.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex h-6 items-center">
                                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-yellow-100 border border-yellow-300 rounded-full text-yellow-800">
                                                    <Clock className="h-3 w-3" />
                                                </div>
                                                <div className="w-px h-full bg-muted-foreground/20"></div>
                                            </div>
                                            <div className="ml-4 -mt-1">
                                                <h4 className="text-sm font-medium">Under Review</h4>
                                                <p className="text-xs text-muted-foreground">Your application is being reviewed</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex h-6 items-center">
                                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-muted rounded-full text-muted-foreground">
                                                    <span className="text-xs">3</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 -mt-1">
                                                <h4 className="text-sm font-medium text-muted-foreground">Decision</h4>
                                                <p className="text-xs text-muted-foreground">Pending approval or rejection</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-4">Quick Navigation</h3>
                                    <div className="space-y-2">
                                        <Button variant="ghost" className="w-full justify-between" onClick={() => setActiveTab("personal")}>
                                            <div className="flex items-center">
                                                <User className="mr-2 h-4 w-4 text-primary" />
                                                Personal Information
                                            </div>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-between"
                                            onClick={() => setActiveTab("residential")}
                                        >
                                            <div className="flex items-center">
                                                <Home className="mr-2 h-4 w-4 text-primary" />
                                                Residential Information
                                            </div>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-between"
                                            onClick={() => setActiveTab("employment")}
                                        >
                                            <div className="flex items-center">
                                                <Briefcase className="mr-2 h-4 w-4 text-primary" />
                                                Employment & Financial
                                            </div>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-between" onClick={() => setActiveTab("loan")}>
                                            <div className="flex items-center">
                                                <CreditCard className="mr-2 h-4 w-4 text-primary" />
                                                Loan Details
                                            </div>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="personal">
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <User className="h-5 w-5 mr-2 text-primary" />
                                    <h3 className="text-lg font-semibold">Personal Information</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <Card className="overflow-hidden">
                                            <div className="bg-primary/10 px-4 py-2">
                                                <h4 className="font-medium">Basic Details</h4>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Full Name:</span>
                                                    <span className="font-medium">{loanApplication.userInfo.fullName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Date of Birth:</span>
                                                    <span>{loanApplication.userInfo.dateOfBirth}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Place of Birth:</span>
                                                    <span>{loanApplication.userInfo.placeOfBirth}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Gender:</span>
                                                    <span>{loanApplication.userInfo.gender}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Marital Status:</span>
                                                    <span>{loanApplication.userInfo.maritalStatus}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    <div className="space-y-4">
                                        <Card className="overflow-hidden">
                                            <div className="bg-primary/10 px-4 py-2">
                                                <h4 className="font-medium">Family Information</h4>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Father's Name:</span>
                                                    <span>{loanApplication.userInfo.fatherName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Mother's Name:</span>
                                                    <span>{loanApplication.userInfo.motherName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Spouse's Name:</span>
                                                    <span>{loanApplication.userInfo.spouseName}</span>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="overflow-hidden">
                                            <div className="bg-primary/10 px-4 py-2">
                                                <h4 className="font-medium">Contact Information</h4>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Mobile Number:</span>
                                                    <span>{loanApplication.userInfo.mobileNumber}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Email Address:</span>
                                                    <span>{loanApplication.userInfo.emailAddress}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="residential">
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <Home className="h-5 w-5 mr-2 text-primary" />
                                    <h3 className="text-lg font-semibold">Residential Information</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <Card className="overflow-hidden">
                                        <div className="bg-primary/10 px-4 py-2 flex justify-between items-center">
                                            <h4 className="font-medium">Permanent Address</h4>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                {loanApplication.residentialInformation.permanentAddress.ownershipStatus}
                                            </Badge>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-start mb-4">
                                                <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">
                                                        {loanApplication.residentialInformation.permanentAddress.houseFlatNo},{" "}
                                                        {loanApplication.residentialInformation.permanentAddress.streetRoad}
                                                    </p>
                                                    <p>
                                                        {loanApplication.residentialInformation.permanentAddress.areaLocality},{" "}
                                                        {loanApplication.residentialInformation.permanentAddress.city}
                                                    </p>
                                                    <p>
                                                        {loanApplication.residentialInformation.permanentAddress.district},{" "}
                                                        {loanApplication.residentialInformation.permanentAddress.postalCode}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-sm">
                                                <span className="text-muted-foreground">Length of Stay:</span>
                                                <span className="font-medium">
                                                    {loanApplication.residentialInformation.permanentAddress.lengthOfStayYears} years
                                                </span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="overflow-hidden">
                                        <div className="bg-primary/10 px-4 py-2 flex justify-between items-center">
                                            <h4 className="font-medium">Present Address</h4>
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                {loanApplication.residentialInformation.presentAddress.ownershipStatus}
                                            </Badge>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-start mb-4">
                                                <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">
                                                        {loanApplication.residentialInformation.presentAddress.houseFlatNo},{" "}
                                                        {loanApplication.residentialInformation.presentAddress.streetRoad}
                                                    </p>
                                                    <p>
                                                        {loanApplication.residentialInformation.presentAddress.areaLocality},{" "}
                                                        {loanApplication.residentialInformation.presentAddress.city}
                                                    </p>
                                                    <p>
                                                        {loanApplication.residentialInformation.presentAddress.district},{" "}
                                                        {loanApplication.residentialInformation.presentAddress.postalCode}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-sm">
                                                <span className="text-muted-foreground">Length of Stay:</span>
                                                <span className="font-medium">
                                                    {loanApplication.residentialInformation.presentAddress.lengthOfStayYears} years
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="employment">
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                                    <h3 className="text-lg font-semibold">Employment & Financial Information</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <Card className="overflow-hidden">
                                        <div className="bg-primary/10 px-4 py-2">
                                            <h4 className="font-medium">Employment Details</h4>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Employment Status:</span>
                                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                                    {loanApplication.employmentFinancialInfo.employmentStatus}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Job Title:</span>
                                                <span className="font-medium">{loanApplication.employmentFinancialInfo.jobTitle}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Employer:</span>
                                                <span>{loanApplication.employmentFinancialInfo.employerName}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-muted-foreground mb-1">Office Address:</span>
                                                <span className="text-right">{loanApplication.employmentFinancialInfo.officeAddress}</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <div className="space-y-4">
                                        <Card className="overflow-hidden">
                                            <div className="bg-primary/10 px-4 py-2">
                                                <h4 className="font-medium">Financial Overview</h4>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-muted-foreground">Monthly Income:</span>
                                                    <span className="text-xl font-bold text-green-600">
                                                        {formatCurrency(loanApplication.employmentFinancialInfo.monthlyGrossIncome)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-muted-foreground">Monthly Expenses:</span>
                                                    <span className="text-lg font-medium text-red-500">
                                                        {formatCurrency(loanApplication.employmentFinancialInfo.totalMonthlyExpenses)}
                                                    </span>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">Net Monthly:</span>
                                                    <span className="text-lg font-bold">
                                                        {formatCurrency(
                                                            loanApplication.employmentFinancialInfo.monthlyGrossIncome -
                                                            loanApplication.employmentFinancialInfo.totalMonthlyExpenses,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="overflow-hidden">
                                            <div className="bg-primary/10 px-4 py-2">
                                                <h4 className="font-medium">Additional Information</h4>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Tax ID Number:</span>
                                                    <span>{loanApplication.employmentFinancialInfo.taxIdentificationNumber}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground">Credit Score:</span>
                                                    <div className="flex items-center">
                                                        <span className="font-medium mr-2">
                                                            {loanApplication.employmentFinancialInfo.currentCreditScore}
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                loanApplication.employmentFinancialInfo.currentCreditScore > 700
                                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                                    : loanApplication.employmentFinancialInfo.currentCreditScore > 600
                                                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                                        : "bg-red-50 text-red-700 border-red-200"
                                                            }
                                                        >
                                                            {loanApplication.employmentFinancialInfo.currentCreditScore > 700
                                                                ? "Excellent"
                                                                : loanApplication.employmentFinancialInfo.currentCreditScore > 600
                                                                    ? "Good"
                                                                    : "Fair"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="loan">
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                                    <h3 className="text-lg font-semibold">Loan Details</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <Card className="overflow-hidden">
                                        <div className="bg-primary/10 px-4 py-2">
                                            <h4 className="font-medium">Loan Request</h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="text-center mb-6">
                                                <span className="text-sm text-muted-foreground">Requested Amount</span>
                                                <div className="text-3xl font-bold text-primary mt-1">
                                                    {formatCurrency(loanApplication.loanSpecifications.loanAmountRequested)}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Existing Loan Type:</span>
                                                    <span>{loanApplication.loanSpecifications.existingLoanType}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Purpose of Loan:</span>
                                                    <span>{loanApplication.loanSpecifications.purposeOfLoan}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Preferred Tenure:</span>
                                                    <span>{loanApplication.loanSpecifications.preferredLoanTenure} months</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Proposed EMI Start Date:</span>
                                                    <span>{loanApplication.loanSpecifications.proposedEMIStartDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Repayment Preferences:</span>
                                                    <span>{loanApplication.loanSpecifications.repaymentPreferences}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="overflow-hidden">
                                        <div className="bg-primary/10 px-4 py-2">
                                            <h4 className="font-medium">Financial Obligations</h4>
                                        </div>
                                        <div className="p-4">
                                            <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium">{loanApplication.financialObligations.lenderName}</span>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                        {loanApplication.financialObligations.type}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">Loan Balance:</span>
                                                    <span className="font-medium">
                                                        {formatCurrency(loanApplication.financialObligations.loanBalance)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">Monthly EMI:</span>
                                                    <span>{formatCurrency(loanApplication.financialObligations.monthlyEMI)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Remaining Tenure:</span>
                                                    <span>{loanApplication.financialObligations.remainingTenure} months</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h5 className="text-sm font-medium">Debt-to-Income Ratio</h5>
                                                <div className="flex items-center gap-2">
                                                    <Progress
                                                        value={
                                                            (loanApplication.financialObligations.monthlyEMI /
                                                                loanApplication.employmentFinancialInfo.monthlyGrossIncome) *
                                                            100
                                                        }
                                                        className="h-2"
                                                    />
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.round(
                                                            (loanApplication.financialObligations.monthlyEMI /
                                                                loanApplication.employmentFinancialInfo.monthlyGrossIncome) *
                                                            100,
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Your current debt-to-income ratio is calculated based on your existing financial obligations.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>
                    </CardContent>
                </Tabs>

                <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/20 mt-4">
                    <Button onClick={handleDownload} className="w-full sm:w-auto" disabled={isGenerating}>
                        <Download className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating PDF..." : "Download PDF"}
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

