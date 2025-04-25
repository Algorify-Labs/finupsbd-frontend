// Root of the response

  export type ApplicationStatus = 'SUBMITTED' | 'PENDING' | "IN_PROCESS" | 'APPROVED' | 'REJECTED'; 
  export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

  export interface ApiResponse {
    data: ApplicationStatusData;
  }
  export interface ApplicationStatusData {
    status: ApplicationStatus;
    adminNotes: string | null;
    applicationId: string;
    loanRequest: LoanRequest;
    user: User;
  }
  

  // (add any other statuses your API might return)
  
  export interface LoanRequest {
    id: string;
    loanType: string;
    loanAmount: string;            // could be number if you parse it
    purpose: string;
    tenure: string;                // could be number if you parse it
    emiStartDate: string;          // ISO date string
    repaymentPreferences: string;
    loanApplicationFormId: string;
  }
  
  export interface User {
    name: string;
    userId: string;
    profile: UserProfile;
  }
  
  export interface UserProfile {
    id: string;
    nameAsNid: string;
    nationalIdNumber: string;
    gender: Gender;
    dateOfBirth: string;           // ISO date string
    avatar: string;
    address: string;
    city: string;
    userId: string;
  }
  

  