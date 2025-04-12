"use client"

import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { formatDate, formatCurrency } from "@/components/super-admin/dashboard/lib/utils"
import type { LoanApplication } from "@/components/super-admin/dashboard/lib/types"

export const generatePDF = async (loanApplication: LoanApplication) => {
  // Create a new PDF document
  const doc = new jsPDF()

  // Add header
  doc.setFontSize(20)
  doc.setTextColor(44, 62, 80)
  doc.text("LOAN APPLICATION", 105, 20, { align: "center" })

  // Add application information
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Application ID", 20, 35)

  doc.setFontSize(12)
  doc.setTextColor(44, 62, 80)
  doc.text(loanApplication.applicationId, 20, 41)

  // Status
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Status", 140, 35)

  doc.setFontSize(12)
  doc.setTextColor(44, 62, 80)
  doc.text(loanApplication.status, 140, 41)

  // Dates
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Submitted On", 20, 50)

  doc.setFontSize(12)
  doc.setTextColor(44, 62, 80)
  doc.text(formatDate(loanApplication.createdAt), 20, 56)

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Last Updated", 140, 50)

  doc.setFontSize(12)
  doc.setTextColor(44, 62, 80)
  doc.text(formatDate(loanApplication.updatedAt), 140, 56)

  // Add a line
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 65, 190, 65)

  // Personal Information
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 80)
  doc.text("Personal Information", 20, 75)

  const personalInfo = [
    ["Full Name", loanApplication.userInfo.fullName],
    ["Father's Name", loanApplication.userInfo.fatherName],
    ["Mother's Name", loanApplication.userInfo.motherName],
    ["Spouse's Name", loanApplication.userInfo.spouseName],
    ["Date of Birth", loanApplication.userInfo.dateOfBirth],
    ["Place of Birth", loanApplication.userInfo.placeOfBirth],
    ["Gender", loanApplication.userInfo.gender],
    ["Marital Status", loanApplication.userInfo.maritalStatus],
    ["Mobile Number", loanApplication.userInfo.mobileNumber],
    ["Email Address", loanApplication.userInfo.emailAddress],
  ]

  autoTable(doc, {
    startY: 80,
    head: [["Field", "Value"]],
    body: personalInfo,
    theme: "plain",
    headStyles: { fillColor: [240, 240, 240], textColor: [44, 62, 80] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: "auto" },
    },
  })

  // Residential Information
  const finalY1 = (doc as any).lastAutoTable.finalY + 10
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 80)
  doc.text("Residential Information", 20, finalY1)

  // Permanent Address
  doc.setFontSize(12)
  doc.text("Permanent Address", 20, finalY1 + 10)

  const permanentAddress = [
    ["House/Flat No.", loanApplication.residentialInformation.permanentAddress.houseFlatNo],
    ["Street/Road", loanApplication.residentialInformation.permanentAddress.streetRoad],
    ["Area/Locality", loanApplication.residentialInformation.permanentAddress.areaLocality],
    ["City", loanApplication.residentialInformation.permanentAddress.city],
    ["District", loanApplication.residentialInformation.permanentAddress.district],
    ["Postal Code", loanApplication.residentialInformation.permanentAddress.postalCode],
    ["Length of Stay", `${loanApplication.residentialInformation.permanentAddress.lengthOfStayYears} years`],
    ["Ownership Status", loanApplication.residentialInformation.permanentAddress.ownershipStatus],
  ]

  autoTable(doc, {
    startY: finalY1 + 15,
    body: permanentAddress,
    theme: "plain",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: "auto" },
    },
  })

  // Present Address
  const finalY2 = (doc as any).lastAutoTable.finalY + 10
  doc.setFontSize(12)
  doc.text("Present Address", 20, finalY2)

  const presentAddress = [
    ["House/Flat No.", loanApplication.residentialInformation.presentAddress.houseFlatNo],
    ["Street/Road", loanApplication.residentialInformation.presentAddress.streetRoad],
    ["Area/Locality", loanApplication.residentialInformation.presentAddress.areaLocality],
    ["City", loanApplication.residentialInformation.presentAddress.city],
    ["District", loanApplication.residentialInformation.presentAddress.district],
    ["Postal Code", loanApplication.residentialInformation.presentAddress.postalCode],
    ["Length of Stay", `${loanApplication.residentialInformation.presentAddress.lengthOfStayYears} years`],
    ["Ownership Status", loanApplication.residentialInformation.presentAddress.ownershipStatus],
  ]

  autoTable(doc, {
    startY: finalY2 + 5,
    body: presentAddress,
    theme: "plain",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: "auto" },
    },
  })

  // Add a new page for the rest of the information
  doc.addPage()

  // Employment & Financial Information
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 80)
  doc.text("Employment & Financial Information", 20, 20)

  const employmentInfo = [
    ["Employment Status", loanApplication.employmentFinancialInfo.employmentStatus],
    ["Job Title", loanApplication.employmentFinancialInfo.jobTitle],
    ["Employer", loanApplication.employmentFinancialInfo.employerName],
    ["Office Address", loanApplication.employmentFinancialInfo.officeAddress],
    ["Monthly Gross Income", formatCurrency(loanApplication.employmentFinancialInfo.monthlyGrossIncome)],
    ["Total Monthly Expenses", formatCurrency(loanApplication.employmentFinancialInfo.totalMonthlyExpenses)],
    ["Tax ID Number", loanApplication.employmentFinancialInfo.taxIdentificationNumber],
    ["Credit Score", loanApplication.employmentFinancialInfo.currentCreditScore.toString()],
  ]

  autoTable(doc, {
    startY: 25,
    body: employmentInfo,
    theme: "plain",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: "auto" },
    },
  })

  // Loan Specifications
  const finalY3 = (doc as any).lastAutoTable.finalY + 10
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 80)
  doc.text("Loan Specifications", 20, finalY3)

  const loanSpecs = [
    ["Existing Loan Type", loanApplication.loanSpecifications.existingLoanType],
    ["Loan Amount Requested", formatCurrency(loanApplication.loanSpecifications.loanAmountRequested)],
    ["Purpose of Loan", loanApplication.loanSpecifications.purposeOfLoan],
    ["Preferred Loan Tenure", `${loanApplication.loanSpecifications.preferredLoanTenure} months`],
    ["Proposed EMI Start Date", loanApplication.loanSpecifications.proposedEMIStartDate],
    ["Repayment Preferences", loanApplication.loanSpecifications.repaymentPreferences],
  ]

  autoTable(doc, {
    startY: finalY3 + 5,
    body: loanSpecs,
    theme: "plain",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: "auto" },
    },
  })

  // Financial Obligations
  const finalY4 = (doc as any).lastAutoTable.finalY + 10
  doc.setFontSize(14)
  doc.setTextColor(44, 62, 80)
  doc.text("Financial Obligations", 20, finalY4)

  const financialObligations = [
    ["Lender Name", loanApplication.financialObligations.lenderName],
    ["Loan Balance", formatCurrency(loanApplication.financialObligations.loanBalance)],
    ["Monthly EMI", formatCurrency(loanApplication.financialObligations.monthlyEMI)],
    ["Remaining Tenure", `${loanApplication.financialObligations.remainingTenure} months`],
    ["Type", loanApplication.financialObligations.type],
    ["Balance", formatCurrency(loanApplication.financialObligations.balance)],
    ["EMI", formatCurrency(loanApplication.financialObligations.emi)],
  ]

  autoTable(doc, {
    startY: finalY4 + 5,
    body: financialObligations,
    theme: "plain",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: "auto" },
    },
  })

  // Footer
  const finalY5 = (doc as any).lastAutoTable.finalY + 20
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("This document is a confirmation of your loan application submission.", 105, finalY5, { align: "center" })
  doc.text("It does not guarantee approval of the loan.", 105, finalY5 + 5, { align: "center" })

  // Save the PDF
  doc.save(`Loan-Application-${loanApplication.applicationId}.pdf`)
}

