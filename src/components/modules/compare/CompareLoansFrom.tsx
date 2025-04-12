// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// // ----------------------------
// // 1) Define the type for your Bank Loan data
// // ----------------------------
// interface BankLoan {
//   id: string;
//   bankName: string;
//   amount?: string;         // Original or "base" amount from your JSON
//   periodMonths?: string;   // Original or "base" period
//   processingFee?: string;  // Original or "base" processing fee
//   interestRate?: string;   // e.g. "4.5" means 4.5% annual
//   monthlyEmi?: string;     // Predefined or example EMI
//   totalAmount?: string;    // Predefined or example total repay
//   eligibleLoan?: string;   // Predefined or example "eligible" loan amount
//   features: {
//     loanAmount: string;
//     minimumAmount: string;
//     maximumAmount: string;
//     loanTenure: string;
//     minimumYear: string;
//     maximumYear: string;
//   };
//   eligibility: {
//     condition: string;
//     offer: string;
//     minimumIncome: number;
//     minimumExperience: number;
//     ageRequirement: number;
//   };
//   feesCharges: {
//     processingFee: string;
//     earlySettlementFee: string;
//     prepaymentFee: string;
//     LoanReSchedulingFee: string;
//     penalCharge: string;
//   };
// }

// // ----------------------------
// // 2) Sample bank loan data
// //    (Add as many banks as you want)
// // ----------------------------
// const bankLoans: BankLoan[] = [
//   {
//     id: "brack-1",
//     bankName: "Brack Bank",
//     amount: "80000",
//     periodMonths: "24",
//     processingFee: "200",
//     interestRate: "4.5",
//     monthlyEmi: "3500",
//     totalAmount: "84000",
//     eligibleLoan: "75000",
//     features: {
//       loanAmount: "75000",
//       minimumAmount: "15000",
//       maximumAmount: "1000000",
//       loanTenure: "24",
//       minimumYear: "2",
//       maximumYear: "15",
//     },
//     eligibility: {
//       condition: "Good credit score required",
//       offer: "Limited time offer",
//       minimumIncome: 40000,
//       minimumExperience: 3,
//       ageRequirement: 22,
//     },
//     feesCharges: {
//       processingFee: "200",
//       earlySettlementFee: "300",
//       prepaymentFee: "250",
//       LoanReSchedulingFee: "75",
//       penalCharge: "150",
//     },
//   },
//   {
//     id: "lumen-2",
//     bankName: "Lumen Bank",
//     amount: "50000",
//     periodMonths: "12",
//     processingFee: "150",
//     interestRate: "5.2",
//     monthlyEmi: "4300",
//     totalAmount: "51600",
//     eligibleLoan: "40000",
//     features: {
//       loanAmount: "40000",
//       minimumAmount: "10000",
//       maximumAmount: "200000",
//       loanTenure: "12",
//       minimumYear: "1",
//       maximumYear: "10",
//     },
//     eligibility: {
//       condition: "Fair credit score required",
//       offer: "Holiday discount",
//       minimumIncome: 30000,
//       minimumExperience: 2,
//       ageRequirement: 21,
//     },
//     feesCharges: {
//       processingFee: "150",
//       earlySettlementFee: "200",
//       prepaymentFee: "100",
//       LoanReSchedulingFee: "50",
//       penalCharge: "100",
//     },
//   },
//   // ... Add more items as needed
// ];

// // ----------------------------
// // 3) EMI Calculator
// //    "annualRate" is e.g. 4.5 for 4.5%
// //    "tenureMonths" is number of months
// // ----------------------------
// function calculateMonthlyPayment(
//   principal: number,
//   annualRate: number,
//   tenureMonths: number
// ): number {
//   // Convert annualRate to monthly decimal
//   // e.g. 4.5% => 0.045 per year => 0.045/12 per month
//   const monthlyRate = annualRate / 100 / 12;
//   if (monthlyRate <= 0 || tenureMonths <= 0) {
//     // Edge case: zero interest or invalid months => simple division
//     return tenureMonths > 0 ? principal / tenureMonths : 0;
//   }
//   const n = tenureMonths;
//   const numerator = monthlyRate * Math.pow(1 + monthlyRate, n);
//   const denominator = Math.pow(1 + monthlyRate, n) - 1;
//   return principal * (numerator / denominator);
// }

// // ----------------------------
// // 4) Main Page Component
// // ----------------------------
// export default function CompareBankLoans() {
//   // -- (A) State for which IDs are selected
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   // -- (B) State for user input (real-time calculation)
//   const [userPrincipal, setUserPrincipal] = useState<number>(100000);
//   const [userTenure, setUserTenure] = useState<number>(24); // in months

//   // -- (C) Filter & Sort States
//   const [maxInterestFilter, setMaxInterestFilter] = useState<number>(10); // e.g. show interest <= 10%
//   const [minIncomeFilter, setMinIncomeFilter] = useState<number>(0);       // e.g. show loans if minIncome <= some value
//   const [sortOption, setSortOption] = useState<"none" | "rate-asc" | "rate-desc">("none");

//   // Toggle a checkbox selection
//   const handleSelect = (loanId: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(loanId)
//         ? prev.filter((id) => id !== loanId)
//         : [...prev, loanId]
//     );
//   };

//   // A) Filter
//   const filteredLoans = useMemo(() => {
//     return bankLoans.filter((loan) => {
//       const interest = parseFloat(loan.interestRate || "0");
//       const minIncome = loan.eligibility.minimumIncome;
//       // Keep if interest <= maxInterestFilter AND minIncome <= user-provided threshold
//       return interest <= maxInterestFilter && minIncome <= minIncomeFilter;
//     });
//   }, [maxInterestFilter, minIncomeFilter]);

//   // B) Sort
//   const sortedLoans = useMemo(() => {
//     const sorted = [...filteredLoans];
//     if (sortOption === "rate-asc") {
//       sorted.sort((a, b) => parseFloat(a.interestRate || "0") - parseFloat(b.interestRate || "0"));
//     } else if (sortOption === "rate-desc") {
//       sorted.sort((a, b) => parseFloat(b.interestRate || "0") - parseFloat(a.interestRate || "0"));
//     }
//     return sorted;
//   }, [filteredLoans, sortOption]);

//   // Determine which loans are selected
//   const selectedLoans = sortedLoans.filter((loan) => selectedIds.includes(loan.id));

//   // Only enable Compare if 2 or more are selected
//   const canCompare = selectedIds.filter((id) => sortedLoans.find((l) => l.id === id)).length >= 2;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Compare Bank Loans</h1>

//       {/* -----------------------------
//           (D) Real-Time Calculation Inputs
//          ----------------------------- */}
//       <div className="border p-4 rounded-md space-y-4">
//         <p className="font-semibold">Try a custom loan amount & tenure:</p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="userPrincipal">
//               Loan Amount
//             </label>
//             <input
//               id="userPrincipal"
//               type="number"
//               className="border rounded px-2 py-1 w-40"
//               value={userPrincipal}
//               onChange={(e) => setUserPrincipal(Number(e.target.value))}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="userTenure">
//               Tenure (months)
//             </label>
//             <input
//               id="userTenure"
//               type="number"
//               className="border rounded px-2 py-1 w-40"
//               value={userTenure}
//               onChange={(e) => setUserTenure(Number(e.target.value))}
//             />
//           </div>
//         </div>
//         <p className="text-xs text-gray-500">
//           These inputs are used to calculate an approximate monthly EMI for each loan, based on the bank’s interest rate.
//         </p>
//       </div>

//       {/* -----------------------------
//           (E) Filters & Sorting
//          ----------------------------- */}
//       <div className="border p-4 rounded-md space-y-4">
//         <p className="font-semibold">Filters & Sorting:</p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* Filter by max interest */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="maxInterestFilter">
//               Max Interest Rate (%)
//             </label>
//             <input
//               id="maxInterestFilter"
//               type="number"
//               step="0.1"
//               className="border rounded px-2 py-1 w-32"
//               value={maxInterestFilter}
//               onChange={(e) => setMaxInterestFilter(Number(e.target.value))}
//             />
//           </div>
//           {/* Filter by min income */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="minIncomeFilter">
//               Minimum Income Requirement 
//             </label>
//             <input
//               id="minIncomeFilter"
//               type="number"
//               className="border rounded px-2 py-1 w-40"
//               value={minIncomeFilter}
//               onChange={(e) => setMinIncomeFilter(Number(e.target.value))}
//             />
//           </div>
//           {/* Sort Option */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="sortOption">
//               Sort by Interest
//             </label>
//             <select
//               id="sortOption"
//               className="border rounded px-2 py-1 w-40"
//               value={sortOption}
//               onChange={(e) =>
//                 setSortOption(e.target.value as "none" | "rate-asc" | "rate-desc")
//               }
//             >
//               <option value="none">None</option>
//               <option value="rate-asc">Ascending</option>
//               <option value="rate-desc">Descending</option>
//             </select>
//           </div>
//         </div>
//         <p className="text-xs text-gray-500">
//           Adjust filters or sorting to narrow down your loan options.
//         </p>
//       </div>

//       {/* -----------------------------
//           (F) Disclaimer
//          ----------------------------- */}
//       <div className="p-4 bg-gray-50 border rounded-md text-sm text-gray-600">
//         <strong>Disclaimer:</strong> The calculated EMI is approximate. Actual rates, fees, and eligibility may vary based on your credit profile. Contact the respective bank for up-to-date offers.
//       </div>

//       {/* -----------------------------
//           (G) Loan List: checkboxes
//          ----------------------------- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {sortedLoans.map((loan) => {
//           const apr = parseFloat(loan.interestRate || "0"); // e.g. 4.5
//           // We'll compute a real-time monthly payment
//           const computedEmi = calculateMonthlyPayment(userPrincipal, apr, userTenure);
//           return (
//             <LoanCard
//               key={loan.id}
//               loan={loan}
//               computedEmi={computedEmi}
//               isSelected={selectedIds.includes(loan.id)}
//               onToggleSelect={() => handleSelect(loan.id)}
//             />
//           );
//         })}
//       </div>

//       {/* -----------------------------
//           (H) Compare Button + Dialog
//          ----------------------------- */}
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button disabled={!canCompare} className="mt-4">
//             Compare Selected
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="max-w-5xl">
//           <DialogHeader>
//             <DialogTitle>Compare Loans</DialogTitle>
//             <DialogDescription>
//               Side-by-side comparison of your selected loans
//             </DialogDescription>
//           </DialogHeader>

//           <div className="overflow-x-auto mt-4">
//             {selectedLoans.length >= 2 ? (
//               <ComparisonTable
//                 loans={selectedLoans}
//                 userPrincipal={userPrincipal}
//                 userTenure={userTenure}
//               />
//             ) : (
//               <p className="text-sm text-gray-600">No loans selected.</p>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
























// // ----------------------------
// // 5) A separate LoanCard component
// // ----------------------------
// function LoanCard({
//   loan,
//   computedEmi,
//   isSelected,
//   onToggleSelect,
// }: {
//   loan: BankLoan;
//   computedEmi: number;
//   isSelected: boolean;
//   onToggleSelect: () => void;
// }) {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <div className="border rounded-md p-4 flex flex-col space-y-2">
//       <div className="flex items-start space-x-2">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           onChange={onToggleSelect}
//           className="mt-1"
//         />
//         <div>
//           <strong className="text-base font-semibold">{loan.bankName}</strong>
//           <div className="text-sm text-gray-700">
//             Interest Rate: {loan.interestRate}%
//           </div>
//           <div className="text-sm text-gray-700">
//             Custom EMI (Your Inputs): <strong>${computedEmi.toFixed(2)}</strong>
//           </div>
//         </div>
//       </div>

//       {/* Toggle for "More Details" */}
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => setShowDetails((prev) => !prev)}
//       >
//         {showDetails ? "Hide" : "View"} More Details
//       </Button>

//       {/* Conditionally render extra details */}
//       {showDetails && (
//         <div className="text-sm space-y-1">
//           <div>Min Income: {loan.eligibility.minimumIncome}</div>
//           <div>Processing Fee: {loan.feesCharges.processingFee}</div>
//           <div>Base EMI (from JSON): {loan.monthlyEmi}</div>
//           <div>Tenure (base): {loan.periodMonths} mo</div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ----------------------------
// // 6) Comparison Table
// // ----------------------------
// function ComparisonTable({
//   loans,
//   userPrincipal,
//   userTenure,
// }: {
//   loans: BankLoan[];
//   userPrincipal: number;
//   userTenure: number;
// }) {
//   return (
//     <table className="w-full border-collapse text-sm">
//       <thead>
//         <tr className="border-b">
//           <th className="py-2 text-left">Criteria</th>
//           {loans.map((loan) => (
//             <th key={loan.id} className="py-2 px-4 text-left">
//               {loan.bankName}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {/* Interest Rate */}
//         <tr className="border-b">
//           <td className="py-2 font-medium">Interest Rate</td>
//           {loans.map((loan) => (
//             <td key={loan.id} className="py-2 px-4">
//               {loan.interestRate}%
//             </td>
//           ))}
//         </tr>
//         {/* Real-Time EMI from user input */}
//         <tr className="border-b">
//           <td className="py-2 font-medium">Monthly EMI (Your Inputs)</td>
//           {loans.map((loan) => {
//             const apr = parseFloat(loan.interestRate);
//             const monthly = calculateMonthlyPayment(userPrincipal, apr, userTenure);
//             return (
//               <td key={loan.id} className="py-2 px-4">
//                 ${monthly.toFixed(2)}
//               </td>
//             );
//           })}
//         </tr>
//         {/* Base Data from JSON */}
//         <tr className="border-b">
//           <td className="py-2 font-medium">Base Monthly EMI</td>
//           {loans.map((loan) => (
//             <td key={loan.id} className="py-2 px-4">
//               {loan.monthlyEmi}
//             </td>
//           ))}
//         </tr>
//         <tr className="border-b">
//           <td className="py-2 font-medium">Total Amount (from JSON)</td>
//           {loans.map((loan) => (
//             <td key={loan.id} className="py-2 px-4">
//               {loan.totalAmount}
//             </td>
//           ))}
//         </tr>
//         {/* Eligibility */}
//         <tr className="border-b">
//           <td className="py-2 font-medium">Eligibility</td>
//           {loans.map((loan) => (
//             <td key={loan.id} className="py-2 px-4">
//               <div>Condition: {loan.eligibility.condition}</div>
//               <div>Offer: {loan.eligibility.offer}</div>
//               <div>Min Income: {loan.eligibility.minimumIncome}</div>
//               <div>Experience: {loan.eligibility.minimumExperience} yrs</div>
//               <div>Age: {loan.eligibility.ageRequirement}+</div>
//             </td>
//           ))}
//         </tr>
//         {/* Fees & Charges with a Tooltip */}
//         <tr className="border-b">
//           <td className="py-2 font-medium">
//             <Tooltip>
//               <TooltipTrigger className="underline cursor-help">
//                 Fees &amp; Charges
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p className="text-xs">
//                   Hover here to see typical fees like processing, prepayment, etc.
//                 </p>
//               </TooltipContent>
//             </Tooltip>
//           </td>
//           {loans.map((loan) => (
//             <td key={loan.id} className="py-2 px-4">
//               <div>Processing: {loan.feesCharges.processingFee}</div>
//               <div>Early Settlement: {loan.feesCharges.earlySettlementFee}</div>
//               <div>Prepayment: {loan.feesCharges.prepaymentFee}</div>
//               <div>Rescheduling: {loan.feesCharges.LoanReSchedulingFee}</div>
//               <div>Penal: {loan.feesCharges.penalCharge}</div>
//             </td>
//           ))}
//         </tr>
//         {/* Features */}
//         <tr>
//           <td className="py-2 font-medium">Features</td>
//           {loans.map((loan) => (
//             <td key={loan.id} className="py-2 px-4">
//               <div>Loan Amount: {loan.features.loanAmount}</div>
//               <div>Min Amount: {loan.features.minimumAmount}</div>
//               <div>Max Amount: {loan.features.maximumAmount}</div>
//               <div>
//                 Tenure: {loan.features.loanTenure} months (
//                 {loan.features.minimumYear} - {loan.features.maximumYear} years)
//               </div>
//             </td>
//           ))}
//         </tr>
//       </tbody>
//     </table>
//   );
// }
