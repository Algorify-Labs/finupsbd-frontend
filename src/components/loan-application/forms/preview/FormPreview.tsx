"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { z } from "zod"
import { applicationFormSchema } from "../../schemas/applicationSchemas"


type ApplicationFormValues = z.infer<typeof applicationFormSchema>

interface FormPreviewProps {
  data: ApplicationFormValues
  onEdit: (step: number) => void
  onBack: () => void
  onSubmit: () => void
}

export default function FormPreview({ data, onEdit, onBack, onSubmit }: FormPreviewProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Preview Your Application</h2>

      {/* Personal Information Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <Button onClick={() => onEdit(0)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Full Name:</strong> {data.userInfo?.fullName}
          </p>
          <p>
            <strong>Father's Name:</strong> {data.userInfo?.fatherName}
          </p>
          <p>
            <strong>Mother's Name:</strong> {data.userInfo?.motherName}
          </p>
          <p>
            <strong>Spouse's Name:</strong> {data.userInfo?.spouseName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {data.userInfo?.dateOfBirth}
          </p>
          <p>
            <strong>Gender:</strong> {data.userInfo?.gender}
          </p>
          <p>
            <strong>Marital Status:</strong> {data.userInfo?.maritalStatus}
          </p>
          <p>
            <strong>NID:</strong> {data.userInfo?.nid}
          </p>
          <p>
            <strong>Mobile Number:</strong> {data.userInfo?.mobileNumber}
          </p>
          <p>
            <strong>Email Address:</strong> {data.userInfo?.emailAddress}
          </p>
        </div>
      </div>

      {/* Address Information Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Residential Information</h3>
          <Button onClick={() => onEdit(1)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Address:</strong> {data.address?.houseFlatNo}, {data.address?.streetRoad},{" "}
            {data.address?.areaLocality}
          </p>
          <p>
            <strong>City:</strong> {data.address?.city}
          </p>
          <p>
            <strong>District:</strong> {data.address?.district}
          </p>
          <p>
            <strong>Postal Code:</strong> {data.address?.postalCode}
          </p>
          <p>
            <strong>Length of Stay:</strong> {data.address?.lengthOfStayYears} years
          </p>
          <p>
            <strong>Ownership Status:</strong> {data.address?.ownershipStatus}
          </p>
        </div>
      </div>

      {/* Employment Information Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Employment & Financial Info</h3>
          <Button onClick={() => onEdit(2)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Employment Status:</strong> {data.employmentFinancialInfo?.employmentStatus}
          </p>
          <p>
            <strong>Job Title:</strong> {data.employmentFinancialInfo?.jobTitle}
          </p>
          <p>
            <strong>Employer Name:</strong> {data.employmentFinancialInfo?.employerName}
          </p>
          <p>
            <strong>Monthly Income:</strong> {data.employmentFinancialInfo?.monthlyGrossIncome}
          </p>
          <p>
            <strong>Monthly Expenses:</strong> {data.employmentFinancialInfo?.totalMonthlyExpenses}
          </p>
        </div>
      </div>

      {/* Loan Specifications Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Loan Specifications</h3>
          <Button onClick={() => onEdit(3)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Loan Type:</strong> {data.loanSpecifications?.loanType}
          </p>
          <p>
            <strong>Loan Amount:</strong> {data.loanSpecifications?.loanAmountRequested}
          </p>
          <p>
            <strong>Purpose:</strong> {data.loanSpecifications?.purposeOfLoan}
          </p>
          <p>
            <strong>Tenure:</strong> {data.loanSpecifications?.preferredLoanTenure} months
          </p>
          <p>
            <strong>EMI Start Date:</strong> {data.loanSpecifications?.proposedEMIStartDate}
          </p>
        </div>
      </div>

      {/* Financial Obligations Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Financial Obligations</h3>
          <Button onClick={() => onEdit(4)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Description:</strong> {data.financialObligations?.description || "None"}
          </p>
          <p>
            <strong>Amount:</strong> {data.financialObligations?.amount || "0"}
          </p>
        </div>
      </div>

      {/* Documents Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Uploaded Documents</h3>
          <Button onClick={() => onEdit(5)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          {data.uploadedDocuments && data.uploadedDocuments.length > 0 ? (
            data.uploadedDocuments.map((doc, index) => (
              <p key={index}>
                <strong>{doc.type}:</strong> {doc.fileType} ({doc.fileSizeMB.toFixed(2)} MB)
              </p>
            ))
          ) : (
            <p>No documents uploaded</p>
          )}
        </div>
      </div>

      {/* Consent Preview */}
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold">Consent and Declaration</h3>
          <Button onClick={() => onEdit(6)} variant="link" className="text-primary hover:underline mt-2 sm:mt-0">
            Edit
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Digital Signature:</strong> {data.consentAndDeclaration?.signature}
          </p>
          <p>
            <strong>Date:</strong> {data.consentAndDeclaration?.date}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <Button onClick={onBack} variant="outline" className="px-6 py-3">
          Back to Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="px-6 py-3">Submit Application</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Application?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit your loan application? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>Submit</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
