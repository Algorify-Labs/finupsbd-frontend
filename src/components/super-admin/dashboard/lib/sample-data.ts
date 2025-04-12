import type { LoanApplication } from "./types"

export const loanApplicationData: LoanApplication = {
  applicationId: "APP-2023-0875",
  status: "PENDING",
  createdAt: "2023-10-15T09:00:00Z",
  updatedAt: "2023-10-15T09:30:00Z",

  userInfo: {
    id: "uinfo_987654",
    fullName: "John Doe",
    fatherName: "Robert Doe",
    motherName: "Mary Doe",
    spouseName: "Jane Doe",
    dateOfBirth: "1985-05-15",
    placeOfBirth: "New York City, NY",
    gender: "MALE",
    maritalStatus: "MARRIED",
    mobileNumber: "+1-555-010-1234",
    emailAddress: "john.doe@example.com",
  },

  residentialInformation: {
    permanentAddress: {
      houseFlatNo: "123",
      streetRoad: "Main Street",
      areaLocality: "Downtown",
      city: "New York",
      district: "Manhattan",
      postalCode: "10001",
      lengthOfStayYears: 5,
      ownershipStatus: "OWNED",
    },
    presentAddress: {
      houseFlatNo: "456",
      streetRoad: "Park Avenue",
      areaLocality: "Midtown",
      city: "New York",
      district: "Manhattan",
      postalCode: "10022",
      lengthOfStayYears: 2,
      ownershipStatus: "RENTED",
    },
  },

  employmentFinancialInfo: {
    employmentStatus: "SALARIED",
    jobTitle: "Senior Software Engineer",
    employerName: "Tech Corp Inc.",
    officeAddress: "789 Tech Street, Silicon Valley, CA",
    monthlyGrossIncome: 8500.0,
    totalMonthlyExpenses: 4500.0,
    taxIdentificationNumber: "TIN-123-456-789",
    currentCreditScore: 750,
  },

  loanSpecifications: {
    existingLoanType: "PERSONAL",
    loanAmountRequested: 25000.0,
    purposeOfLoan: "Home renovation",
    preferredLoanTenure: 36,
    proposedEMIStartDate: "2023-12-01",
    repaymentPreferences: "Auto-debit from main account",
  },

  financialObligations: {
    lenderName: "City Bank",
    loanBalance: 15000.0,
    monthlyEMI: 450.0,
    remainingTenure: 24,
    type: "LOAN",
    balance: 15000.0,
    emi: 450.0,
  },
}

