export interface Address {
    houseFlatNo: string
    streetRoad: string
    areaLocality: string
    city: string
    district: string
    postalCode: string
    lengthOfStayYears: number
    ownershipStatus: string
  }
  
  export interface UserInfo {
    id: string
    fullName: string
    fatherName: string
    motherName: string
    spouseName: string
    dateOfBirth: string
    placeOfBirth: string
    gender: string
    maritalStatus: string
    mobileNumber: string
    emailAddress: string
  }
  
  export interface ResidentialInformation {
    permanentAddress: Address
    presentAddress: Address
  }
  
  export interface EmploymentFinancialInfo {
    employmentStatus: string
    jobTitle: string
    employerName: string
    officeAddress: string
    monthlyGrossIncome: number
    totalMonthlyExpenses: number
    taxIdentificationNumber: string
    currentCreditScore: number
  }
  
  export interface LoanSpecifications {
    existingLoanType: string
    loanAmountRequested: number
    purposeOfLoan: string
    preferredLoanTenure: number
    proposedEMIStartDate: string
    repaymentPreferences: string
  }
  
  export interface FinancialObligations {
    lenderName: string
    loanBalance: number
    monthlyEMI: number
    remainingTenure: number
    type: string
    balance: number
    emi: number
  }
  
  export interface LoanApplication {
    applicationId: string
    status: string
    createdAt: string
    updatedAt: string
    userInfo: UserInfo
    residentialInformation: ResidentialInformation
    employmentFinancialInfo: EmploymentFinancialInfo
    loanSpecifications: LoanSpecifications
    financialObligations: FinancialObligations
  }
  
  