// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FiMenu } from "react-icons/fi";

// // Define a Zod schema for your application form.
// const applicationFormSchema = z.object({
//   personalLoanId: z.string(),
//   userInfo: z.object({
//     fullName: z.string().min(1, "Full Name is required"),
//     fatherName: z.string().min(1, "Father's Name is required"),
//     motherName: z.string().min(1, "Mother's Name is required"),
//     spouseName: z.string().optional(),
//     dateOfBirth: z.string().min(1, "Date of Birth is required"),
//     placeOfBirth: z.string().min(1, "Place of Birth is required"),
//     gender: z.enum(["MALE", "FEMALE", "OTHER"]),
//     maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
//     nid: z.string().min(1, "NID is required"),
//     mobileNumber: z.string().min(1, "Mobile Number is required"),
//     emailAddress: z.string().email("Invalid email format"),
//     socialMediaLinks: z.array(z.string().url("Invalid URL")).optional().default([""]),
//     propertyType: z.enum(["RESIDENTIAL", "COMMERCIAL", "OTHER"]),
//     approximateValue: z.number().min(0, "Approximate Value is required"),
//   }),
//   address: z.object({
//     houseFlatNo: z.string().min(1, "House/Flat No is required"),
//     streetRoad: z.string().min(1, "Street/Road is required"),
//     areaLocality: z.string().min(1, "Area/Locality is required"),
//     city: z.string().min(1, "City is required"),
//     district: z.string().min(1, "District is required"),
//     postalCode: z.string().min(1, "Postal Code is required"),
//     lengthOfStayYears: z.number().min(0, "Length of Stay is required"),
//     ownershipStatus: z.enum(["OWNED", "RENTED", "OTHER"]),
//   }),
//   employmentFinancialInfo: z.object({
//     employmentStatus: z.enum(["SALARIED", "SELF_EMPLOYED", "UNEMPLOYED"]),
//     jobTitle: z.string().optional(),
//     employerName: z.string().optional(),
//     officeAddress: z.string().optional(),
//     department: z.string().optional(),
//     contactDetails: z.string().optional(),
//     businessName: z.string().optional(),
//     businessRegistrationNumber: z.string().optional(),
//     employmentTenureYears: z.number().min(0).optional(),
//     monthlyGrossIncome: z.number().min(0, "Monthly Gross Income is required"),
//     totalMonthlyExpenses: z.number().min(0, "Total Monthly Expenses is required"),
//     profession: z.string().optional(),
//     currentCreditScore: z.number().min(0).optional(),
//   }),
//   loanSpecifications: z.object({
//     loanType: z.enum(["PERSONAL", "HOME", "AUTO"]),
//     loanAmountRequested: z.number().min(0, "Loan Amount is required"),
//     purposeOfLoan: z.string().min(1, "Purpose is required"),
//     preferredLoanTenure: z.number().min(0, "Preferred Loan Tenure is required"),
//     proposedEMIStartDate: z.string().min(1, "Proposed EMI Start Date is required"),
//     repaymentPreferences: z.string().optional(),
//   }),
//   financialObligations: z.object({
//     description: z.string().optional(),
//     amount: z.number().optional(),
//   }),
//   uploadedDocuments: z.array(
//     z.object({
//       type: z.string(),
//       filePath: z.string(),
//       fileSizeMB: z.number(),
//       fileType: z.string(),
//     })
//   ),
// });

// // Infer the form values type from the schema.
// type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

// const ApplicationForm = () => {
//   const [step, setStep] = useState(0);
//   const [isPreview, setIsPreview] = useState(false);
//   const [previews, setPreviews] = useState<{ [docType: string]: string }>({});
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//     getValues,
//   } = useForm<ApplicationFormValues>({
//     resolver: zodResolver(applicationFormSchema),
//     defaultValues: {
//       personalLoanId: "",
//       userInfo: {
//         fullName: "",
//         fatherName: "",
//         motherName: "",
//         spouseName: "",
//         dateOfBirth: "",
//         placeOfBirth: "",
//         gender: "MALE",
//         maritalStatus: "SINGLE",
//         nid: "",
//         mobileNumber: "",
//         emailAddress: "",
//         socialMediaLinks: [""],
//         propertyType: "RESIDENTIAL",
//         approximateValue: 0,
//       },
//       address: {
//         houseFlatNo: "",
//         streetRoad: "",
//         areaLocality: "",
//         city: "",
//         district: "",
//         postalCode: "",
//         lengthOfStayYears: 0,
//         ownershipStatus: "OWNED",
//       },
//       employmentFinancialInfo: {
//         employmentStatus: "SALARIED",
//         jobTitle: "",
//         employerName: "",
//         officeAddress: "",
//         department: "",
//         contactDetails: "",
//         businessName: "",
//         businessRegistrationNumber: "",
//         employmentTenureYears: 0,
//         monthlyGrossIncome: 0,
//         totalMonthlyExpenses: 0,
//         profession: "",
//         currentCreditScore: 0,
//       },
//       loanSpecifications: {
//         loanType: "PERSONAL",
//         loanAmountRequested: 0,
//         purposeOfLoan: "",
//         preferredLoanTenure: 0,
//         proposedEMIStartDate: "",
//         repaymentPreferences: "",
//       },
//       financialObligations: {
//         description: "",
//         amount: 0,
//       },
//       uploadedDocuments: [],
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const documentUrl = URL.createObjectURL(file);
//       setPreviews((prev) => ({ ...prev, [docType]: documentUrl }));

//       const fileSizeMB = file.size / (1024 * 1024);
//       setValue("uploadedDocuments", [
//         ...watch("uploadedDocuments"),
//         {
//           type: docType,
//           filePath: documentUrl,
//           fileSizeMB,
//           fileType: file.type || "unknown",
//         },
//       ]);
//     }
//   };

//   // When the form is submitted on step 5, switch to preview mode.
//   const onSubmit: SubmitHandler<ApplicationFormValues> = (data) => {
//     setIsPreview(true);
//   };

//   // Final submission after preview.
//   const handleFinalSubmit = () => {
//     const data = getValues();
//     console.log("Final Submission Data:", data);
//     alert("Application submitted successfully!");
//     setIsPreview(false);
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const renderStepContent = () => {
//     if (isPreview) return null;

//     switch (step) {
//       case 0:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                 <input
//                   {...register("userInfo.fullName")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter your full name"
//                 />
//                 {errors.userInfo?.fullName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.fullName.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Father’s Name</label>
//                 <input
//                   {...register("userInfo.fatherName")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter father's name"
//                 />
//                 {errors.userInfo?.fatherName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.fatherName.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Mother’s Name</label>
//                 <input
//                   {...register("userInfo.motherName")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter mother's name"
//                 />
//                 {errors.userInfo?.motherName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.motherName.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Spouse’s Name</label>
//                 <input
//                   {...register("userInfo.spouseName")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter spouse's name (optional)"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                 <input
//                   {...register("userInfo.dateOfBirth")}
//                   type="date"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 />
//                 {errors.userInfo?.dateOfBirth && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.dateOfBirth.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Place of Birth</label>
//                 <input
//                   {...register("userInfo.placeOfBirth")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter place of birth"
//                 />
//                 {errors.userInfo?.placeOfBirth && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.placeOfBirth.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Gender</label>
//                 <select
//                   {...register("userInfo.gender")}
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 >
//                   <option value="MALE">Male</option>
//                   <option value="FEMALE">Female</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//                 {errors.userInfo?.gender && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.gender.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Marital Status</label>
//                 <select
//                   {...register("userInfo.maritalStatus")}
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 >
//                   <option value="SINGLE">Single</option>
//                   <option value="MARRIED">Married</option>
//                   <option value="DIVORCED">Divorced</option>
//                   <option value="WIDOWED">Widowed</option>
//                 </select>
//                 {errors.userInfo?.maritalStatus && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.maritalStatus.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">National ID (NID)</label>
//                 <input
//                   {...register("userInfo.nid")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter your NID"
//                 />
//                 {errors.userInfo?.nid && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.nid.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//                 <input
//                   {...register("userInfo.mobileNumber")}
//                   type="tel"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter your mobile number"
//                 />
//                 {errors.userInfo?.mobileNumber && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.mobileNumber.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <input
//                   {...register("userInfo.emailAddress")}
//                   type="email"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter your email"
//                 />
//                 {errors.userInfo?.emailAddress && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.emailAddress.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Social Media Link</label>
//                 <input
//                   {...register("userInfo.socialMediaLinks.0")}
//                   type="url"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter a social media link (optional)"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Property Type</label>
//                 <select
//                   {...register("userInfo.propertyType")}
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 >
//                   <option value="RESIDENTIAL">Residential</option>
//                   <option value="COMMERCIAL">Commercial</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//                 {errors.userInfo?.propertyType && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.propertyType.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Approximate Property Value</label>
//                 <input
//                   {...register("userInfo.approximateValue", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter approximate value"
//                 />
//                 {errors.userInfo?.approximateValue && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userInfo.approximateValue.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Residential Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">House/Flat No</label>
//                 <input
//                   {...register("address.houseFlatNo")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter house/flat number"
//                 />
//                 {errors.address?.houseFlatNo && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.houseFlatNo.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Street/Road</label>
//                 <input
//                   {...register("address.streetRoad")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter street/road"
//                 />
//                 {errors.address?.streetRoad && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.streetRoad.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Area/Locality</label>
//                 <input
//                   {...register("address.areaLocality")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter area/locality"
//                 />
//                 {errors.address?.areaLocality && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.areaLocality.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">City</label>
//                 <input
//                   {...register("address.city")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter city"
//                 />
//                 {errors.address?.city && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">District</label>
//                 <input
//                   {...register("address.district")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter district"
//                 />
//                 {errors.address?.district && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.district.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Postal Code</label>
//                 <input
//                   {...register("address.postalCode")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter postal code"
//                 />
//                 {errors.address?.postalCode && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.postalCode.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Length of Stay (Years)</label>
//                 <input
//                   {...register("address.lengthOfStayYears", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter years"
//                 />
//                 {errors.address?.lengthOfStayYears && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.lengthOfStayYears.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Ownership Status</label>
//                 <select
//                   {...register("address.ownershipStatus")}
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 >
//                   <option value="OWNED">Owned</option>
//                   <option value="RENTED">Rented</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//                 {errors.address?.ownershipStatus && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address.ownershipStatus.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Employment & Financial Info</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Employment Status</label>
//                 <select
//                   {...register("employmentFinancialInfo.employmentStatus")}
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 >
//                   <option value="SALARIED">Salaried</option>
//                   <option value="SELF_EMPLOYED">Self-Employed</option>
//                   <option value="UNEMPLOYED">Unemployed</option>
//                 </select>
//                 {errors.employmentFinancialInfo?.employmentStatus && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.employmentFinancialInfo.employmentStatus.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Job Title</label>
//                 <input
//                   {...register("employmentFinancialInfo.jobTitle")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter job title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Employer Name</label>
//                 <input
//                   {...register("employmentFinancialInfo.employerName")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter employer name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Office Address</label>
//                 <input
//                   {...register("employmentFinancialInfo.officeAddress")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter office address"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Department</label>
//                 <input
//                   {...register("employmentFinancialInfo.department")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter department"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Contact Details</label>
//                 <input
//                   {...register("employmentFinancialInfo.contactDetails")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter contact details"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Business Name</label>
//                 <input
//                   {...register("employmentFinancialInfo.businessName")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter business name (if applicable)"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Business Registration Number</label>
//                 <input
//                   {...register("employmentFinancialInfo.businessRegistrationNumber")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter registration number (if applicable)"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Employment Tenure (Years)</label>
//                 <input
//                   {...register("employmentFinancialInfo.employmentTenureYears", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter years"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Monthly Gross Income</label>
//                 <input
//                   {...register("employmentFinancialInfo.monthlyGrossIncome", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter income"
//                 />
//                 {errors.employmentFinancialInfo?.monthlyGrossIncome && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.employmentFinancialInfo.monthlyGrossIncome.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Total Monthly Expenses</label>
//                 <input
//                   {...register("employmentFinancialInfo.totalMonthlyExpenses", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter expenses"
//                 />
//                 {errors.employmentFinancialInfo?.totalMonthlyExpenses && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.employmentFinancialInfo.totalMonthlyExpenses.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Profession</label>
//                 <input
//                   {...register("employmentFinancialInfo.profession")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter profession"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Current Credit Score</label>
//                 <input
//                   {...register("employmentFinancialInfo.currentCreditScore", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter credit score"
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Loan Specifications</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Loan Type</label>
//                 <select
//                   {...register("loanSpecifications.loanType")}
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 >
//                   <option value="PERSONAL">Personal</option>
//                   <option value="HOME">Home</option>
//                   <option value="AUTO">Auto</option>
//                 </select>
//                 {errors.loanSpecifications?.loanType && (
//                   <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.loanType.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Loan Amount Requested</label>
//                 <input
//                   {...register("loanSpecifications.loanAmountRequested", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter amount"
//                 />
//                 {errors.loanSpecifications?.loanAmountRequested && (
//                   <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.loanAmountRequested.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Purpose of Loan</label>
//                 <input
//                   {...register("loanSpecifications.purposeOfLoan")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter purpose"
//                 />
//                 {errors.loanSpecifications?.purposeOfLoan && (
//                   <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.purposeOfLoan.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Preferred Loan Tenure (Months)</label>
//                 <input
//                   {...register("loanSpecifications.preferredLoanTenure", { valueAsNumber: true })}
//                   type="number"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter tenure in months"
//                 />
//                 {errors.loanSpecifications?.preferredLoanTenure && (
//                   <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.preferredLoanTenure.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Proposed EMI Start Date</label>
//                 <input
//                   {...register("loanSpecifications.proposedEMIStartDate")}
//                   type="date"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 />
//                 {errors.loanSpecifications?.proposedEMIStartDate && (
//                   <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.proposedEMIStartDate.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Repayment Preferences</label>
//                 <input
//                   {...register("loanSpecifications.repaymentPreferences")}
//                   type="text"
//                   className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                   placeholder="Enter preferences (optional)"
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Financial Obligations</h2>
//             <p className="text-gray-600">Add details of existing financial obligations (optional).</p>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Obligation Description</label>
//               <input
//                 {...register("financialObligations.description")}
//                 type="text"
//                 className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 placeholder="Enter description (e.g., Car Loan)"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Amount</label>
//               <input
//                 {...register("financialObligations.amount", { valueAsNumber: true })}
//                 type="number"
//                 className="mt-1 p-3 w-full rounded-lg border border-gray-300"
//                 placeholder="Enter amount"
//               />
//             </div>
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Document Uploads</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">NATIONAL_ID</label>
//                 <input
//                   type="file"
//                   accept=".pdf,.jpeg,.jpg,.png"
//                   onChange={(e) => handleFileChange(e, "NATIONAL_ID")}
//                   className="mt-2 w-full text-sm text-gray-500"
//                 />
//               </div>
//               <div>
//                 {previews["NATIONAL_ID"] && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Preview:</p>
//                     <img
//                       src={previews["NATIONAL_ID"]}
//                       alt="Preview"
//                       className="mt-2 w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">PASSPORT_PHOTO</label>
//                 <input
//                   type="file"
//                   accept=".pdf,.jpeg,.jpg,.png"
//                   onChange={(e) => handleFileChange(e, "PASSPORT_PHOTO")}
//                   className="mt-2 w-full text-sm text-gray-500"
//                 />
//               </div>
//               <div>
//                 {previews["PASSPORT_PHOTO"] && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Preview:</p>
//                     <img
//                       src={previews["PASSPORT_PHOTO"]}
//                       alt="Preview"
//                       className="mt-2 w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderPreview = () => {
//     const data = getValues();
//     return (
//       <div className="space-y-8">
//         <h2 className="text-3xl font-bold text-gray-800">Preview Your Application</h2>

//         <div className="border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Personal Information</h3>
//             <button onClick={() => { setStep(0); setIsPreview(false); }} className="text-blue-600 hover:underline">
//               Edit
//             </button>
//           </div>
//           <p><strong>Full Name:</strong> {data.userInfo.fullName}</p>
//           <p><strong>Father's Name:</strong> {data.userInfo.fatherName}</p>
//           <p><strong>Mother's Name:</strong> {data.userInfo.motherName}</p>
//           <p><strong>Spouse's Name:</strong> {data.userInfo.spouseName}</p>
//           <p><strong>Date of Birth:</strong> {data.userInfo.dateOfBirth}</p>
//           <p><strong>Place of Birth:</strong> {data.userInfo.placeOfBirth}</p>
//           <p><strong>Gender:</strong> {data.userInfo.gender}</p>
//           <p><strong>Marital Status:</strong> {data.userInfo.maritalStatus}</p>
//           <p><strong>NID:</strong> {data.userInfo.nid}</p>
//           <p><strong>Mobile Number:</strong> {data.userInfo.mobileNumber}</p>
//           <p><strong>Email Address:</strong> {data.userInfo.emailAddress}</p>
//           <p><strong>Social Media Link:</strong> {data.userInfo.socialMediaLinks[0]}</p>
//           <p><strong>Property Type:</strong> {data.userInfo.propertyType}</p>
//           <p><strong>Approximate Property Value:</strong> {data.userInfo.approximateValue}</p>
//         </div>

//         <div className="border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Residential Information</h3>
//             <button onClick={() => { setStep(1); setIsPreview(false); }} className="text-blue-600 hover:underline">
//               Edit
//             </button>
//           </div>
//           <p><strong>House/Flat No:</strong> {data.address.houseFlatNo}</p>
//           <p><strong>Street/Road:</strong> {data.address.streetRoad}</p>
//           <p><strong>Area/Locality:</strong> {data.address.areaLocality}</p>
//           <p><strong>City:</strong> {data.address.city}</p>
//           <p><strong>District:</strong> {data.address.district}</p>
//           <p><strong>Postal Code:</strong> {data.address.postalCode}</p>
//           <p><strong>Length of Stay:</strong> {data.address.lengthOfStayYears} years</p>
//           <p><strong>Ownership Status:</strong> {data.address.ownershipStatus}</p>
//         </div>

//         <div className="border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Employment & Financial Info</h3>
//             <button onClick={() => { setStep(2); setIsPreview(false); }} className="text-blue-600 hover:underline">
//               Edit
//             </button>
//           </div>
//           <p><strong>Employment Status:</strong> {data.employmentFinancialInfo.employmentStatus}</p>
//           <p><strong>Job Title:</strong> {data.employmentFinancialInfo.jobTitle}</p>
//           <p><strong>Employer Name:</strong> {data.employmentFinancialInfo.employerName}</p>
//           <p><strong>Office Address:</strong> {data.employmentFinancialInfo.officeAddress}</p>
//           <p><strong>Department:</strong> {data.employmentFinancialInfo.department}</p>
//           <p><strong>Contact Details:</strong> {data.employmentFinancialInfo.contactDetails}</p>
//           <p><strong>Business Name:</strong> {data.employmentFinancialInfo.businessName}</p>
//           <p><strong>Business Registration Number:</strong> {data.employmentFinancialInfo.businessRegistrationNumber}</p>
//           <p><strong>Employment Tenure:</strong> {data.employmentFinancialInfo.employmentTenureYears} years</p>
//           <p><strong>Monthly Gross Income:</strong> {data.employmentFinancialInfo.monthlyGrossIncome}</p>
//           <p><strong>Total Monthly Expenses:</strong> {data.employmentFinancialInfo.totalMonthlyExpenses}</p>
//           <p><strong>Profession:</strong> {data.employmentFinancialInfo.profession}</p>
//           <p><strong>Current Credit Score:</strong> {data.employmentFinancialInfo.currentCreditScore}</p>
//         </div>

//         <div className="border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Loan Specifications</h3>
//             <button onClick={() => { setStep(3); setIsPreview(false); }} className="text-blue-600 hover:underline">
//               Edit
//             </button>
//           </div>
//           <p><strong>Loan Type:</strong> {data.loanSpecifications.loanType}</p>
//           <p><strong>Loan Amount Requested:</strong> {data.loanSpecifications.loanAmountRequested}</p>
//           <p><strong>Purpose of Loan:</strong> {data.loanSpecifications.purposeOfLoan}</p>
//           <p><strong>Preferred Loan Tenure:</strong> {data.loanSpecifications.preferredLoanTenure} months</p>
//           <p><strong>Proposed EMI Start Date:</strong> {data.loanSpecifications.proposedEMIStartDate}</p>
//           <p><strong>Repayment Preferences:</strong> {data.loanSpecifications.repaymentPreferences}</p>
//         </div>

//         <div className="border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Financial Obligations</h3>
//             <button onClick={() => { setStep(4); setIsPreview(false); }} className="text-blue-600 hover:underline">
//               Edit
//             </button>
//           </div>
//           <p><strong>Description:</strong> {data.financialObligations.description}</p>
//           <p><strong>Amount:</strong> {data.financialObligations.amount}</p>
//         </div>

//         <div className="border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Document Uploads</h3>
//             <button onClick={() => { setStep(5); setIsPreview(false); }} className="text-blue-600 hover:underline">
//               Edit
//             </button>
//           </div>
//           {data.uploadedDocuments.length > 0 ? (
//             data.uploadedDocuments.map((doc, index) => (
//               <p key={index}>
//                 <strong>{doc.type}:</strong> {doc.fileType} - {doc.fileSizeMB.toFixed(2)} MB
//               </p>
//             ))
//           ) : (
//             <p>No documents uploaded.</p>
//           )}
//         </div>

//         <div className="flex justify-end space-x-4 mt-8">
//           <button
//             onClick={() => setIsPreview(false)}
//             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
//           >
//             Back
//           </button>
//           <button
//             onClick={handleFinalSubmit}
//             className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
//           >
//             Final Submit
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <div
//         className={`${isSidebarOpen ? "w-72" : "w-20"} bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg transition-all duration-300`}
//       >
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="p-4 text-white hover:text-gray-200 focus:outline-none"
//         >
//           <FiMenu size={28} />
//         </button>
//         <ul className={`mt-6 space-y-4 ${isSidebarOpen ? "px-6" : "px-2"} transition-all`}>
//           {["Personal Information", "Residential Information", "Employment Info", "Loan Request", "Financial Obligations", "Document Uploads"].map(
//             (label, idx) => (
//               <li
//                 key={idx}
//                 onClick={() => { setStep(idx); setIsPreview(false); }}
//                 className={`cursor-pointer p-3 rounded-lg ${
//                   step === idx ? "bg-white text-green-500 font-semibold" : "text-white hover:bg-green-700"
//                 } transition duration-200`}
//               >
//                 {isSidebarOpen ? label : label.charAt(0)}
//               </li>
//             )
//           )}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 lg:p-8 bg-white shadow-lg">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">
//               {isPreview ? "Preview Your Application" : "Loan Application Form"}
//             </h1>
//             {!isPreview && <p className="text-gray-600">Step {step + 1} of 6</p>}
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {isPreview ? renderPreview() : renderStepContent()}
//             {!isPreview && (
//               <div className="mt-8 flex justify-between">
//                 {step > 0 && (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
//                   >
//                     Back
//                   </button>
//                 )}
//                 {step < 5 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
//                   >
//                     Submit Application
//                   </button>
//                 )}
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationForm;
