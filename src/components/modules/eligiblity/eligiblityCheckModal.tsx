"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { validateDob } from "./eligiblityConostant";
import { eligibilityCheckValidationSchema } from "./eligiblityValidation";






interface EligibilityCheckProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  loanType: string; // e.g. 'PERSONAL_LOAN'
}



export default function EligiblityCheckModal({
  open,
  onOpenChange,
  loanType,
}: EligibilityCheckProps) {
  const [step, setStep] = React.useState(1);

  const router = useRouter();


  console.log({ loanType })

  // Initialize Form
  const form = useForm<z.infer<typeof eligibilityCheckValidationSchema>>({
    resolver: zodResolver(eligibilityCheckValidationSchema),
    defaultValues: {
      gender: "MALE",
      profession: "SALARIED",   // need change
      dateOfBirth: new Date("1994-11-12T00:00:00.000Z"),
      monthlyIncome: 45000,
      // expectedLoanTenure: 36,
      jobLocation: "DHAKA",

      // businessOwnerType: "COOPERATIVE",
      // businessType: "Retile",
      // sharePortion: 0,   // number
      // tradeLicenseAge: 0,
      // vehicleType: "BIKE",



      // haveAnyRentalIncome: false,
      //   selectArea: "dhaka",
      //   rentalIncome: 15000,

      // haveAnyLoan: false,
      //   numberOfLoan: 1,
      //   existingLoanType: "CAR_LOAN",
      //   EMIAmountBDT: 15000,
      //   InterestRate: 10,


      // haveAnyCreditCard: false,
      // numberOfCard: 1,
      //   cardLimitBDT: 15000,
      //   cardType: "CREDIT_CARD",
      //   secondaryApplicant: false,

      name: "reza",
      email: "reza@gmail.com",
      phone: "01910479167",
      termsAccepted: false,
    },
  });



  // Dynamic arrays
  const professions = ["SALARIED", "BUSINESS_OWNER"];
  const jobLocation = ["DHAKA"];
  const loanTypes = ["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN"];
  const cardTypes = ["CREDIT_CARD"];
  const loanTenure = [12, 24, 36, 48, 60, 72]
  const loanTenureForInstantLoan = [1, 2, 3]
  const tradeLicenseYears = Array.from({ length: 10 }, (_, i) => i + 1);





  function onSubmit(values: z.infer<typeof eligibilityCheckValidationSchema>) {
    const eligibilityData = {
      ...values,
      loanType
    }


    sessionStorage.setItem("eligibilityData", JSON.stringify(eligibilityData));

    if (loanType === "INSTANT_LOAN") {
      router.push("/eligiblity-instant-loan");
    } else {
      router.push("/eligiblity");
    }


  }


  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };




  /* --------------------------------------------
     3A) Step Components
     -------------------------------------------- */
  const renderStep1 = () => (
    <div className="space-y-4 md:grid md:grid-cols-2 items-center gap-4">
      {/* Gender */}
      <FormField
        name="gender"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender*</FormLabel>
            <Select
              onValueChange={(val) => field.onChange(val as typeof field.value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Your Gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />


      {/* Date of Birth */}
      <FormField
        name="dateOfBirth"
        control={form.control}
        rules={{ required: "Date of Birth is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth*</FormLabel>
            <FormControl>
              <Input
                type="date"
                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(new Date(e.target.value))}
                placeholder="Select your date"
                className="w-full border py-1 rounded-lg px-2"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Profession */}
      <FormField
        name="profession"
        control={form.control}
        rules={{ required: "Profession is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Profession*</FormLabel>
            <Select
              onValueChange={(val) => field.onChange(val as typeof field.value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Profession" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {professions.map((profession) => (
                  <SelectItem
                    key={profession}
                    value={profession}
                  >
                    {profession === "SALARIED"? "Salaried": "Business Owner"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Only show if "Business Owner" */}
      {form.watch("profession") === "BUSINESS_OWNER" && (
        <>
          <FormField
            name="businessOwnerType"
            rules={{ required: "Business Owner Type is required" }}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Owner Type*</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val as typeof field.value)
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Business owner type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PROPRIETOR">Sole Proprietorship</SelectItem>
                    <SelectItem value="PARTNER">Partnership</SelectItem>
                    <SelectItem value="CORPORATION">Corporation</SelectItem>
                    <SelectItem value="LLC">llc</SelectItem>
                    <SelectItem value="COOPERATIVE">Corporative</SelectItem>
                    <SelectItem value="JOINT_VENTURE">Joint venture</SelectItem>
                    <SelectItem value="FRANCHISE">franchise</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="businessType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type*</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val as typeof field.value)
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="manufacturing">
                      Manufacturing
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="sharePortion"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Share Portion (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter share portion"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            name="tradeLicenseAge"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trade License Age</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tradeLicenseYears.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year === 1 ? `${year} year` : `${year} years`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        </>
      )}
      {
        loanType === "CAR_LOAN" ? <FormField
          name="vehicleType"
          rules={{ required: "vehicleType is requird" }}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type*</FormLabel>
              <Select
                onValueChange={(val) =>
                  field.onChange(val as typeof field.value)
                }
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CAR_SUV">Suv</SelectItem>
                  <SelectItem value="CAR_SEDAN">Sedan</SelectItem>
                  <SelectItem value="CAR_HATCHBACK">Hatchback</SelectItem>
                  <SelectItem value="BIKE">Bike</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> : null
      }
      <FormField
        name="jobLocation"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Location</FormLabel>
            <Select
              onValueChange={(val) => field.onChange(val as typeof field.value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {jobLocation.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}

                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="monthlyIncome"
        rules={{ required: "Monthly Income is requird" }}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Income (BDT)*</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Type your monthly income"
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="expectedLoanTenure"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Loan Tenure (Month)*</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={field.value ? String(field.value) : ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue className="text-gray-200" placeholder="Selecet month" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {loanType === 'INSTANT_LOAN' ? loanTenureForInstantLoan.map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} Month
                  </SelectItem>
                )) : loanTenure.map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} Month
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {/* Do you have any Loan? - boolean */}
      <FormField
        name="haveAnyLoan"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you have any Loan?</FormLabel>
            <FormControl>
              <RadioGroup
                // We store true/false by checking the string
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value ? "true" : "false"}
                className="flex flex-row space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("haveAnyLoan") && (
        <div className="md:grid grid-cols-2 gap-2">
          <FormField
            name="numberOfLoan"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Loans*</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Number of loans" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="existingLoanType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type*</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {loanTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="loanOutstanding"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>loan Outstanding (BDT)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Type your loan Oustanding"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="EMIAmountBDT"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>EMIAmountBDT (BDT)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Type your EMI Amount (BDT)"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="InterestRate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>InterestRate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Type your loan Interest Rate"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
      )}

      {/* Do you have any Credit Card? - boolean */}
      <FormField
        name="haveAnyCreditCard"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you have any Credit Card?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value ? "true" : "false"}
                className="flex flex-row space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("haveAnyCreditCard") && (
        <div className="md:grid grid-cols-2 gap-2">
          <FormField
            name="numberOfCard"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Cards*</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cards number" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="cardLimitBDT"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Limit (BDT)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Type your card limit BDT"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            name="cardType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card type*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Card type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {/* Do you have any Rental Income? - boolean */}
      <FormField
        name="haveAnyRentalIncome"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you have any Rental Income?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value ? "true" : "false"}
                className="flex flex-row space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("haveAnyRentalIncome") && (
        <div className="md:grid grid-cols-2 gap-2">
          <FormField
            name="selectArea"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rental Property Area</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Dhaka, Mirpur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="rentalIncome"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rental Income (BDT)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="type your monthly income"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Name*</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Email Address*</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="phone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Phone Number*</FormLabel>
            <FormControl>
              <Input placeholder="+880" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="termsAccepted"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                By Clicking <b>Submit</b> Below You Agree to Our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms &amp; Conditions
                </a>
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  /* --------------------------------------------
     3B) Step Indicator
     -------------------------------------------- */
  const renderStepIndicator = () => {
    const stepPercentage = ((step - 1) / 2) * 100;
    return (
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 h-[4px] w-full -translate-y-1/2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${stepPercentage}%` }}
          />
        </div>
        <div className="relative z-10 flex justify-between">
          {[1, 2, 3].map((stepNumber) => {
            const isCompleted = stepNumber < step;
            const isCurrent = stepNumber === step;

            return (
              <div
                key={stepNumber}
                className="relative flex flex-col items-center group"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 transform",
                    isCompleted && "border-emerald-500 bg-emerald-500 scale-110",
                    isCurrent &&
                    "border-emerald-500 bg-white dark:bg-gray-900 scale-125 shadow-lg",
                    !isCompleted &&
                    !isCurrent &&
                    "border-gray-300 bg-white dark:bg-gray-800 hover:border-emerald-300 "
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white animate-check-in" />
                  ) : (
                    <span
                      className={cn(
                        "font-semibold transition-colors",
                        isCurrent
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-400"
                      )}
                    >
                      {stepNumber}
                    </span>
                  )}
                </div>

                {isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-pulse bg-emerald-500/20 blur-md" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 text-center gap-4">
          <div
            className={cn(
              "space-y-1 transition-opacity",
              step >= 1 ? "opacity-100" : "opacity-50"
            )}
          >
            <span className="block text-sm font-medium text-emerald-600">
              Step 1
            </span>
            <span className="block text-xs text-gray-500">Personal Info</span>
          </div>
          <div
            className={cn(
              "space-y-1 transition-opacity",
              step >= 2 ? "opacity-100" : "opacity-50"
            )}
          >
            <span className="block text-sm font-medium text-emerald-600">
              Step 2
            </span>
            <span className="block text-xs text-gray-500">
              Financial Details
            </span>
          </div>
          <div
            className={cn(
              "space-y-1 transition-opacity",
              step >= 3 ? "opacity-100" : "opacity-50"
            )}
          >
            <span className="block text-sm font-medium text-emerald-600">
              Step 3
            </span>
            <span className="block text-xs text-gray-500">Contact Info</span>
          </div>
        </div>
      </div>
    );
  };

  /* --------------------------------------------
     4) Render the Full Dialog
     -------------------------------------------- */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            Find the best Personal Loan for you
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>

          <div className="px-10 mt-8">{renderStepIndicator()}</div>

          <ScrollArea className="max-h-96">
            <Card className="w-full p-6 border-none shadow-none">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}

                  <div className="flex justify-between pt-4">
                    {/* Back Button */}
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Back
                      </Button>
                    )}
                    {/* Next or Submit */}
                    {step < 4 ? (
                      <Button type="button" onClick={handleNext}>
                        {step === 3 ? "Check Eligiblity" : "Continue"}
                      </Button>
                    ) : (
                      <Button type="submit">Check Eligibility</Button>
                    )}
                  </div>
                </form>
              </Form>
            </Card>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}