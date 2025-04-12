import { z } from "zod";

export const applicationFormSchema = z.object({
    personalLoanId: z.string(),
    userInfo: z.object({
        fullName: z.string().min(1, "Full Name is required"),
        fatherName: z.string().min(1, "Father's Name is required"),
        motherName: z.string().min(1, "Mother's Name is required"),
        spouseName: z.string().optional(),
        dateOfBirth: z.string().min(1, "Date of Birth is required"),
        placeOfBirth: z.string().min(1, "Place of Birth is required"),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
        nid: z.string().min(1, "NID is required"),
        mobileNumber: z.string().min(1, "Mobile Number is required"),
        emailAddress: z.string().email("Invalid email format"),
        socialMediaLinks: z.array(z.string().url("Invalid URL")).optional().default([""]),
        propertyType: z.enum(["RESIDENTIAL", "COMMERCIAL", "OTHER"]),
        approximateValue: z.number().min(0, "Approximate Value is required"),
    }),
    address: z.object({
        houseFlatNo: z.string().min(1, "House/Flat No is required"),
        streetRoad: z.string().min(1, "Street/Road is required"),
        areaLocality: z.string().min(1, "Area/Locality is required"),
        city: z.string().min(1, "City is required"),
        district: z.string().min(1, "District is required"),
        postalCode: z.string().min(1, "Postal Code is required"),
        lengthOfStayYears: z.number().min(0, "Length of Stay is required"),
        ownershipStatus: z.enum(["OWNED", "RENTED", "OTHER"]),
    }),
    employmentFinancialInfo: z.object({
        employmentStatus: z.enum(["SALARIED", "SELF_EMPLOYED", "UNEMPLOYED"]),
        jobTitle: z.string().optional(),
        employerName: z.string().optional(),
        officeAddress: z.string().optional(),
        department: z.string().optional(),
        contactDetails: z.string().optional(),
        businessName: z.string().optional(),
        businessRegistrationNumber: z.string().optional(),
        employmentTenureYears: z.number().min(0).optional(),
        monthlyGrossIncome: z.number().min(0, "Monthly Gross Income is required"),
        totalMonthlyExpenses: z.number().min(0, "Total Monthly Expenses is required"),
        profession: z.string().optional(),
        currentCreditScore: z.number().min(0).optional(),
    }),
    loanSpecifications: z.object({
        loanType: z.enum(["PERSONAL", "HOME", "AUTO"]),
        loanAmountRequested: z.number().min(0, "Loan Amount is required"),
        purposeOfLoan: z.string().min(1, "Purpose is required"),
        preferredLoanTenure: z.number().min(0, "Preferred Loan Tenure is required"),
        proposedEMIStartDate: z.string().min(1, "Proposed EMI Start Date is required"),
        repaymentPreferences: z.string().optional(),
    }),
    financialObligations: z.object({
        description: z.string().optional(),
        amount: z.number().optional(),
    }),
    uploadedDocuments: z.array(
        z.object({
            type: z.string(),
            filePath: z.string(),
            fileSizeMB: z.number(),
            fileType: z.string(),
        }),
    ),
    consentAndDeclaration: z.object({
        consent: z.boolean().refine((val) => val === true, {
            message: "You must agree to the consent and authorization",
        }),
        privacy: z.boolean().refine((val) => val === true, {
            message: "You must agree to the privacy agreement",
        }),
        nda: z.boolean().refine((val) => val === true, {
            message: "You must agree to the non-disclosure agreement",
        }),
        accuracy: z.boolean().refine((val) => val === true, {
            message: "You must confirm the accuracy of provided information",
        }),
        signature: z.string().min(1, "Digital signature is required"),
        date: z.string().min(1, "Date is required"),
    }),
    dataSecurityProtocols: z.object({
        encryption: z.boolean().refine((val) => val === true, {
            message: "You must acknowledge the encryption standards",
        }),
        twoFactor: z.boolean().refine((val) => val === true, {
            message: "You must agree to two-factor authentication",
        }),
        rbac: z.boolean().refine((val) => val === true, {
            message: "You must acknowledge the access control policy",
        }),
        retention: z.boolean().refine((val) => val === true, {
            message: "You must agree to the data retention policy",
        }),
        withdraw: z.boolean().refine((val) => val === true, {
            message: "You must acknowledge the right to withdraw information",
        }),
    })

})
