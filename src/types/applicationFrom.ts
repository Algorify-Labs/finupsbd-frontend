// export type applicationFromTypes = {
//     personalLoanId: string;
//     personalInformation: ApplicationUserInfo;
//     address: Address;
//     employmentFinancialInfo: EmploymentFinancialInfo;
//     loanSpecifications: LoanRequestSpecifications;
//     financialObligations: FinancialObligation[];
//     uploadedDocuments: DocumentFile[];
//   };




//   type ApplicationUserInfo = {
//     fullName: string;
//     fatherName: string;
//     motherName: string;
//     spouseName?: string;
//     dateOfBirth: string;
//     placeOfBirth: string;
//     gender: "MALE" | "FEMALE" | "OTHER";
//     maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
//     nid: string;
//     birthRegistration?: string;
//     mobileNumber: string;
//     alternateNumber?: string;
//     emailAddress: string;
//     socialMediaLinks: string[];
//     propertyType: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
//     approximateValue: number;
//   };

//   type Address = {
//     houseFlatNo: string;
//     streetRoad: string;
//     areaLocality: string;
//     city: string;
//     district: string;
//     postalCode: string;
//     lengthOfStayYears: number;
//     ownershipStatus: "OWNED" | "RENTED" | "LEASED" | "OTHER";
//   };

//   type EmploymentFinancialInfo = {
//     employmentStatus: "SALARIED" | "SELF_EMPLOYED" | "BUSINESS_OWNER";
//     jobTitle: string;
//     employerName: string;
//     officeAddress: string;
//     department: string;
//     contactDetails: string;
//     businessName?: string;
//     businessRegistrationNumber?: string;
//     employmentTenureYears: number;
//     monthlyGrossIncome: number;
//     otherSourcesOfIncome?: string;
//     totalMonthlyExpenses: number;
//     profession: string;
//     taxIdentificationNumber?: string;
//     currentCreditScore?: number;
//   };

//   type LoanRequestSpecifications = {
//     loanType: "PERSONAL" | "HOME" | "CAR" | "BUSINESS" | "EDUCATION" | "OTHER";
//     loanAmountRequested: number;
//     purposeOfLoan: string;
//     preferredLoanTenure: number;
//     proposedEMIStartDate: string;
//     repaymentPreferences: string;
//   };

//   type FinancialObligation = {
//     lenderName: string;
//     loanBalance: number;
//     monthlyEMI: number;
//     remainingTenure: number;
//     cardIssuer?: string;
//     currentBalance?: number;
//     minimumMonthlyPayment?: number;
//     obligationType: string;
//     balance: number;
//     emi: number;
//   };

//   type DocumentFile = {
//     type:
//       | "NATIONAL_ID"
//       | "INCOME_PROOF"
//       | "PASSPORT_PHOTO"
//       | "BANK_STATEMENT"
//       | "BIRTH_CERTIFICATE"
//       | "TIN_CERTIFICATE"
//       | "EMPLOYMENT_PROOF"
//       | "UTILITY_BILL"
//       | "PROPERTY_DOCUMENT"
//       | "SUPPORTING_DOCUMENT";
//     filePath: string;
//     fileSizeMB: number;
//     fileType: string;
//   };



export interface applicationFromTypes {
  personalLoanId: string
  userInfo: {
    fullName: string
    fatherName: string
    motherName: string
    spouseName: string
    dateOfBirth: string
    placeOfBirth: string
    gender: "MALE" | "FEMALE" | "OTHER"
    maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"
    nid: string
    mobileNumber: string
    emailAddress: string
    socialMediaLinks: string[]
    propertyType: "RESIDENTIAL" | "COMMERCIAL"
    approximateValue: number
  }
  address: {
    houseFlatNo: string
    streetRoad: string
    areaLocality: string
    city: string
    district: string
    postalCode: string
    lengthOfStayYears: number
    ownershipStatus: "OWNED" | "RENTED" | "LEASED"
  }
  employmentFinancialInfo: {
    employmentStatus: "SALARIED" | "SELF_EMPLOYED" | "BUSINESS_OWNER" | "RETIRED" | "UNEMPLOYED"
    jobTitle: string
    employerName: string
    officeAddress: string
    department: string
    contactDetails: string
    businessName: string
    businessRegistrationNumber: string
    employmentTenureYears: number
    monthlyGrossIncome: number
    totalMonthlyExpenses: number
    profession: string
    currentCreditScore: number
  }
  loanSpecifications: {
    loanType: "PERSONAL" | "HOME" | "AUTO" | "EDUCATION" | "BUSINESS"
    loanAmountRequested: number
    purposeOfLoan: string
    preferredLoanTenure: number
    proposedEMIStartDate: string
    repaymentPreferences: string
  }
  financialObligations: {
    loanType: string
    lenderName: string
    outstandingAmount: number
    monthlyPayment: number
  }
  uploadedDocuments: {
    type:
    | "NATIONAL_ID"
    | "INCOME_PROOF"
    | "PASSPORT_PHOTO"
    | "BANK_STATEMENT"
    | "BIRTH_CERTIFICATE"
    | "TIN_CERTIFICATE"
    | "EMPLOYMENT_PROOF"
    | "UTILITY_BILL"
    | "PROPERTY_DOCUMENT"
    | "SUPPORTING_DOCUMENT";
    filePath: string;
    fileSizeMB: number;
    fileType: string;
  }[]
  consentAndDeclaration: {
    consent: boolean,
    privacy: boolean,
    nda: boolean
    accuracy: boolean,
    signature: string,
    date: string,
  }
  dataSecurityProtocols: {
    encryption: boolean,
    twoFactor: boolean,
    rbac: boolean,
    retention: boolean,
    withdraw: boolean,
  }
}

// export type UploadedDocuments = {
//   type:
//     | "NATIONAL_ID"
//     | "INCOME_PROOF"
//     | "PASSPORT_PHOTO"
//     | "BANK_STATEMENT"
//     | "BIRTH_CERTIFICATE"
//     | "TIN_CERTIFICATE"
//     | "EMPLOYMENT_PROOF"
//     | "UTILITY_BILL"
//     | "PROPERTY_DOCUMENT"
//     | "SUPPORTING_DOCUMENT";
//   filePath: string;
//   fileSizeMB: number;
//   fileType: string;
//   }[]
