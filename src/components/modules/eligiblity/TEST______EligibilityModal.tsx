// "use client"

// import * as React from "react"
// import { Check, X } from "lucide-react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { cn } from "@/lib/utils"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { formSchema } from "./eligiblityValidation"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { useRouter } from "next/navigation"

// interface EligibilityCheckProps {
//   open: boolean
//   onOpenChange: (val: boolean) => void
//   loanType: string // The type of loan (if needed externally)
// }


// export default function EligiblityCheck({
//   open,
//   onOpenChange,
//   loanType, // The type of loan the user is applying for
// }: EligibilityCheckProps) {
//   const [step, setStep] = React.useState(1)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       gender: "MALE",
//       profession: "Salaried",
//       businessOwnerType: "",
//       businessType: "",
//       sharePortion: "",
//       tradeLicenseAge: "",
//       monthlyIncome: "12000",
//       loanTenure: "12",
//       hasLoan: "no",
//       numberOfLoans: "",
//       loanType: "",
//       hasCreditCard: "no",
//       numberOfCards: "",
//       cardType: "",
//       hasRentalIncome: "no",
//       rentalArea: "",
//       rentalIncome: "",
//       name: "shamim",
//       email: "shamim@gmail.com",
//       phone: "01910479167",
//       termsAccepted: true,
//     },
//   })

//   const [dob, setDob] = React.useState<Date | null>(null);
//   const router = useRouter()

//   // console.log(dob)
//   // Sample data arrays
//   const professions = ["SALARIED", "BUSINESS OWNER"]
//   const jobLocation = ["DHAKA"]
//   const loanTypes = ["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN"]
//   const cardTypes = ["CREDIT_CARDS", "DABIT_CARDS"]
//   // For the tradeLicenseAge, you can dynamically generate or define as needed
//   const tradeLicenseYears = Array.from({ length: 10 }, (_, i) => i + 1)


//   function onSubmit(values: z.infer<typeof formSchema>) {

//     const eligibilityData = {
//       ...values,
//       dateOfBirth: dob,
//       loanTypesMain: loanType
//     }

//     console.log("Form submitted with:", eligibilityData)
//     // TODO: Place your API call or final submission logic here
//     // onOpenChange(false) // close the modal after successful submission

//     sessionStorage.setItem('sessionStorage', JSON.stringify(eligibilityData));

//     router.push('/eligiblity')
//   }

//   const handleNext = async () => {
//     // Validate *only* the fields relevant to the current step.
//     // If valid, proceed. If not, show errors.
//     let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = []

//     if (step === 1) {
//       fieldsToValidate = [
//         "gender",
//         "profession",
//         "monthlyIncome",
//         "loanTenure",
//       ]
//       if (form.watch("profession") === "business owner") {
//         fieldsToValidate.push(
//           "businessOwnerType",
//           "businessType",
//           "sharePortion",
//           "tradeLicenseAge"
//         )
//       }
//     } else if (step === 2) {
//       fieldsToValidate = ["hasLoan", "hasCreditCard", "hasRentalIncome"]
//       if (form.watch("hasLoan") === "yes") {
//         fieldsToValidate.push("numberOfLoans", "loanType")
//       }
//       if (form.watch("hasCreditCard") === "yes") {
//         fieldsToValidate.push("numberOfCards", "cardType")
//       }
//       if (form.watch("hasRentalIncome") === "yes") {
//         fieldsToValidate.push("rentalArea", "rentalIncome")
//       }
//     }

//     const isValid = await form.trigger(fieldsToValidate)
//     if (isValid) {
//       // Move to next step
//       setStep((prev) => prev + 1)
//     }
//   }

//   const handleDateChange = (e: any) => {
//     const selectedDate = new Date(e.target.value);
//     setDob(selectedDate);
//   };


//   const renderStep1 = () => (
//     <div className="space-y-4 md:grid md:grid-cols-2 items-center gap-4">
//       {/* Gender */}
//       <FormField
//         name="gender"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Gender*</FormLabel>
//             <Select
//               onValueChange={(val) => field.onChange(val)}
//               value={field.value}
//             >
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Your Gender" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 <SelectItem value="MALE">Male</SelectItem>
//                 <SelectItem value="FEMALE">Female</SelectItem>
//                 <SelectItem value="OTHER">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Date of Birth */}

//       <div>
//         <div>Date of birth</div>
//         <input
//           onChange={handleDateChange}
//           className="w-full border py-1 rounded-lg px-2"
//           type="date"
//           placeholder="date of birth"
//         />
//       </div>


//       {/* Profession */}
//       <FormField
//         name="profession"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Your Profession*</FormLabel>
//             <Select
//               onValueChange={(val) => field.onChange(val)}
//               value={field.value}
//             >
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Profession" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {professions.map((profession) => (
//                   <SelectItem
//                     key={profession}
//                     value={profession.toLowerCase()}
//                   >
//                     {profession}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Only show if "Business Owner" */}
//       {form.watch("profession") === "business owner" && (
//         <>
//           {/* Business Owner Type */}
//           <FormField
//             name="businessOwnerType"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Business Owner Type*</FormLabel>
//                 <Select
//                   onValueChange={(val) => field.onChange(val)}
//                   value={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Business owner type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="sole">Sole Proprietorship</SelectItem>
//                     <SelectItem value="partnership">Partnership</SelectItem>
//                     <SelectItem value="corporation">Corporation</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Business Type */}
//           <FormField
//             name="businessType"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Business Type*</FormLabel>
//                 <Select
//                   onValueChange={(val) => field.onChange(val)}
//                   value={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="retail">Retail</SelectItem>
//                     <SelectItem value="service">Service</SelectItem>
//                     <SelectItem value="manufacturing">
//                       Manufacturing
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Share Portion (%) */}
//           <FormField
//             name="sharePortion"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Share Portion (%)</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Enter share portion"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Trade License Age */}
//           <FormField
//             name="tradeLicenseAge"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Trade License Age</FormLabel>
//                 <Select
//                   onValueChange={(val) => field.onChange(val)}
//                   value={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Year" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {tradeLicenseYears.map((year) => (
//                       <SelectItem key={year} value={String(year)}>
//                         {year === 1 ? `${year} year` : `${year} years`}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />  
//               </FormItem>
//             )}
//           />
//         </>
//       )}

//       <FormField
//         name="jobLocation"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Job Location</FormLabel>
//             <Select
//               onValueChange={(val) => field.onChange(val)}
//               value={field.value}
//             >
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Job Location" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {jobLocation.map((profession) => (
//                   <SelectItem
//                     key={profession}
//                     value={profession.toLowerCase()}
//                   >
//                     {profession}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Monthly Income */}
//       <FormField
//         name="monthlyIncome"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Monthly Income (BDT)*</FormLabel>
//             <FormControl>
//               <Input type="number" placeholder="0" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Expected Loan Tenure */}
//       <FormField
//         name="loanTenure"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Expected Loan Tenure (Month)*</FormLabel>
//             <FormControl>
//               <Input type="number" placeholder="0" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-4">
//       {/* Do you have any Loan? */}
//       <FormField
//         name="hasLoan"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem className="space-y-3">
//             <FormLabel>Do you have any Loan?</FormLabel>
//             <FormControl>
//               <RadioGroup
//                 onValueChange={field.onChange}
//                 value={field.value}
//                 className="flex flex-row space-x-4"
//               >
//                 <FormItem className="flex items-center space-x-2">
//                   <FormControl>
//                     <RadioGroupItem value="yes" />
//                   </FormControl>
//                   <FormLabel className="font-normal">Yes</FormLabel>
//                 </FormItem>
//                 <FormItem className="flex items-center space-x-2">
//                   <FormControl>
//                     <RadioGroupItem value="no" />
//                   </FormControl>
//                   <FormLabel className="font-normal">No</FormLabel>
//                 </FormItem>
//               </RadioGroup>
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {form.watch("hasLoan") === "yes" && (
//         <>
//           {/* Number of Loan */}
//           <FormField
//             name="numberOfLoans"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Number of Loans*</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   value={field.value}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="1" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <SelectItem key={num} value={String(num)}>
//                         {num}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Loan Type */}
//           <FormField
//             name="loanType"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Loan Type*</FormLabel>
//                 <Select
//                   onValueChange={(val) => field.onChange(val)}
//                   value={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select loan type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {loanTypes.map((type) => (
//                       <SelectItem key={type} value={type.toLowerCase()}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       )}

//       {/* Do you have any Credit Card? */}
//       <FormField
//         name="hasCreditCard"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem className="space-y-3">
//             <FormLabel>Do you have any Credit Card?</FormLabel>
//             <FormControl>
//               <RadioGroup
//                 onValueChange={field.onChange}
//                 value={field.value}
//                 className="flex flex-row space-x-4"
//               >
//                 <FormItem className="flex items-center space-x-2">
//                   <FormControl>
//                     <RadioGroupItem value="yes" />
//                   </FormControl>
//                   <FormLabel className="font-normal">Yes</FormLabel>
//                 </FormItem>
//                 <FormItem className="flex items-center space-x-2">
//                   <FormControl>
//                     <RadioGroupItem value="no" />
//                   </FormControl>
//                   <FormLabel className="font-normal">No</FormLabel>
//                 </FormItem>
//               </RadioGroup>
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* If credit card is yes */}
//       {form.watch("hasCreditCard") === "yes" && (
//         <>
//           {/* Number of Cards */}
//           <FormField
//             name="numberOfCards"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Number of Cards*</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   value={field.value}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="1" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <SelectItem key={num} value={String(num)}>
//                         {num}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Card type */}
//           <FormField
//             name="cardType"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Card type*</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   value={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Card type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {cardTypes.map((type) => (
//                       <SelectItem key={type} value={type.toLowerCase()}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       )}

//       {/* Do you have any Rental Income? */}
//       <FormField
//         name="hasRentalIncome"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem className="space-y-3">
//             <FormLabel>Do you have any Rental Income?</FormLabel>
//             <FormControl>
//               <RadioGroup
//                 onValueChange={field.onChange}
//                 value={field.value}
//                 className="flex flex-row space-x-4"
//               >
//                 <FormItem className="flex items-center space-x-2">
//                   <FormControl>
//                     <RadioGroupItem value="yes" />
//                   </FormControl>
//                   <FormLabel className="font-normal">Yes</FormLabel>
//                 </FormItem>
//                 <FormItem className="flex items-center space-x-2">
//                   <FormControl>
//                     <RadioGroupItem value="no" />
//                   </FormControl>
//                   <FormLabel className="font-normal">No</FormLabel>
//                 </FormItem>
//               </RadioGroup>
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* If user has rental income, ask for details */}
//       {form.watch("hasRentalIncome") === "yes" && (
//         <>
//           <FormField
//             name="rentalArea"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Rental Property Area</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="e.g., Dhaka, Mirpur"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="rentalIncome"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Monthly Rental Income (BDT)</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="0"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       )}
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-4">
//       {/* Name */}
//       <FormField
//         name="name"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Your Name*</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter your name" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Email */}
//       <FormField
//         name="email"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Your Email Address*</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter your email address" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Phone */}
//       <FormField
//         name="phone"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Your Phone Number*</FormLabel>
//             <FormControl>
//               <Input placeholder="+880" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Terms Accepted */}
//       <FormField
//         name="termsAccepted"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//             <FormControl>
//               <Checkbox
//                 checked={field.value}
//                 onCheckedChange={field.onChange}
//               />
//             </FormControl>
//             <div className="space-y-1 leading-none">
//               <FormLabel>
//                 By Clicking <b>Submit</b> Below You Agree to Our{" "}
//                 <a href="#" className="text-primary hover:underline">
//                   Terms &amp; Conditions
//                 </a>
//               </FormLabel>
//             </div>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   )

//   const renderStepIndicator = () => {
//     const stepPercentage = ((step - 1) / 2) * 100;
//     return (
//       <div className="relative mb-8">
//         {/* Animated background line */}
//         <div className="absolute left-0 top-1/2 h-[4px] w-full -translate-y-1/2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out"
//             style={{ width: `${stepPercentage}%` }}
//           />
//         </div>

//         {/* Interactive circles */}
//         <div className="relative z-10 flex justify-between">
//           {[1, 2, 3].map((stepNumber) => {
//             const isCompleted = stepNumber < step;
//             const isCurrent = stepNumber === step;

//             return (
//               <div
//                 key={stepNumber}
//                 className="relative flex flex-col items-center group"
//               >
//                 <div
//                   className={cn(
//                     "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 transform",
//                     isCompleted && "border-emerald-500 bg-emerald-500 scale-110",
//                     isCurrent && "border-emerald-500 bg-white dark:bg-gray-900 scale-125 shadow-lg",
//                     !isCompleted && !isCurrent && "border-gray-300 bg-white dark:bg-gray-800 hover:border-emerald-300 "
//                   )}
//                 >
//                   {isCompleted ? (
//                     <Check className="h-5 w-5 text-white animate-check-in" />
//                   ) : (
//                     <span className={cn(
//                       "font-semibold transition-colors",
//                       isCurrent ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"
//                     )}>
//                       {stepNumber}
//                     </span>
//                   )}
//                 </div>

//                 {/* Hover effect glow */}
//                 {isCurrent && (
//                   <div className="absolute inset-0 rounded-full animate-pulse bg-emerald-500/20 blur-md" />
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Enhanced labels with descriptions */}
//         <div className="mt-6 grid grid-cols-3 text-center gap-4">
//           <div className={cn(
//             "space-y-1 transition-opacity",
//             step >= 1 ? "opacity-100" : "opacity-50"
//           )}>
//             <span className="block text-sm font-medium text-emerald-600">Step 1</span>
//             <span className="block text-xs text-gray-500">Personal Info</span>
//           </div>
//           <div className={cn(
//             "space-y-1 transition-opacity",
//             step >= 2 ? "opacity-100" : "opacity-50"
//           )}>
//             <span className="block text-sm font-medium text-emerald-600">Step 2</span>
//             <span className="block text-xs text-gray-500">Financial Details</span>
//           </div>
//           <div className={cn(
//             "space-y-1 transition-opacity",
//             step >= 3 ? "opacity-100" : "opacity-50"
//           )}>
//             <span className="block text-sm font-medium text-emerald-600">Step 3</span>
//             <span className="block text-xs text-gray-500">Contact Info</span>
//           </div>
//         </div>
//       </div>
//     );
//   };




//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-2xl rounded-lg">
//         <DialogHeader>
//           <DialogTitle className="text-center">Find the best Personal Loan for you</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//           <div className="px-10 mt-8">
//             {renderStepIndicator()}
//           </div>
//           <ScrollArea className="max-h-96">
//             <Card className="w-full p-6 border-none shadow-none">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                   {step === 1 && renderStep1()}
//                   {step === 2 && renderStep2()}
//                   {step === 3 && renderStep3()}

//                   <div className="flex justify-between pt-4">
//                     {/* Back Button */}
//                     {step > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => setStep((prev) => prev - 1)}
//                       >
//                         Back
//                       </Button>
//                     )}
//                     {/* Next or Submit */}
//                     {step < 4 ? (
//                       <Button type="button" onClick={handleNext}>
//                         Continue
//                       </Button>
//                     ) :
//                       <Button type="submit">Check Eligiblity</Button>
//                     }
//                   </div>
//                 </form>
//               </Form>
//             </Card>
//           </ScrollArea>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   )
// }
