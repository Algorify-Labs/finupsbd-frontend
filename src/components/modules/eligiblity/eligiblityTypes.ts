
export interface LoanResponse {
    data: TEligiblityCheckDataShow;
  }
  
  export interface TEligiblityCheckDataShow {
    data: EligiblityData[];
    pagination: Pagination;
  }
  
  
  export interface Pagination {
    page: number;
    pageSize: number;
    totalLoans: number;
  }
  
  export interface EligiblityData {
    id: string;
    bankName: string;
    amount: number;
    periodMonths: number;
    loanType: string;
    monthlyEMI: number;
    totalRepayment: number;
    coverImage: string;
    interestRate: string;
    processingFee: string;
    eligibleLoan: number;
    features: LoanFeatures;
    feesCharges: LoanFeesCharges;
    eligibility: LoanEligibility;
  }
  
  export interface LoanFeatures {
    id: string;
    loanAmount: string;
    minimumAmount: string;
    maximumAmount: string;
    loanTenure: string;
    minimumYear: string;
    maximumYear: string;
    personalLoanId: string;
  }
  
  export interface LoanFeesCharges {
    id: string;
    processingFee: string;
    earlySettlementFee: string;
    prepaymentFee: string;
    LoanReSchedulingFee: string;
    penalCharge: string;
    personalLoanId: string;
  }
  
  export interface LoanEligibility {
    id: string;
    condition: string;
    offer: string;
    minimumIncome: number;
    minimumExperience: number;
    ageRequirement: number;
    personalLoanId: string;
  }
  