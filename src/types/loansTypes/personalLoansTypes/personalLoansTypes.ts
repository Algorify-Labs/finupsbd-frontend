export type LoanStatus = "active" | "inactive" | "pending" | "rejected"

interface LoanFeatures {
  loanAmount: string
  minimumAmount: string
  maximumAmount: string
  loanTenure: string
  minimumYear: string
  maximumYear: string
}

interface LoanEligibility {
  condition: string
  offer: string
  minimumIncome: number
  minimumExperience: number
  ageRequirement: number
}

interface LoanFeesCharges {
  processingFee: string
  earlySettlementFee: string
  prepaymentFee: string
  LoanReSchedulingFee: string
  penalCharge: string
}

export interface Loan {
  id: number
  bankName: string
  processingFee: string
  interestRate: string
  features: LoanFeatures
  eligibility: LoanEligibility
  feesCharges: LoanFeesCharges
  status: LoanStatus
  createdAt: string
  updatedAt: string
}