"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomDatePicker } from "@/components/core/form/CustomDatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { eligibilityCheckValidationSchema } from "./EligibilityValidation";

interface EligibilityCheckProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  loanType: string; // e.g. 'PERSONAL_LOAN'
}

function EligibilityCheckModal({
  open,
  onOpenChange,
  loanType,
}: EligibilityCheckProps) {
  const [step, setStep] = React.useState(1);

  const router = useRouter();

  // console.log({ loanType });

  // Initialize Form
  const form = useForm<z.infer<typeof eligibilityCheckValidationSchema>>({
    resolver: zodResolver(eligibilityCheckValidationSchema),
    defaultValues: {
      gender: "MALE",
      profession: "SALARIED", // need change
      dateOfBirth: new Date(),
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

      name: "Firoj",
      email: "test@gmail.com",
      phone: "01876594444",
      termsAccepted: false,
    },
    mode: "onTouched",
  });

  // console.log("form", form.getValues());

  // Dynamic arrays
  const professions = ["SALARIED", "BUSINESS_OWNER"];
  const jobLocation = ["DHAKA"];
  const loanTypes = ["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN"];
  const cardTypes = ["CREDIT_CARD"];
  const loanTenure = [12, 24, 36, 48, 60, 72];
  const loanTenureForInstantLoan = [1, 2, 3];
  const tradeLicenseYears = Array.from({ length: 10 }, (_, i) => i + 1);

  function onSubmit(values: z.infer<typeof eligibilityCheckValidationSchema>) {
    const eligibilityData = {
      ...values,
      loanType,
    };

    sessionStorage.setItem("eligibilityData", JSON.stringify(eligibilityData));

    if (loanType === "INSTANT_LOAN") {
      router.push("/eligibility-instant-loan");
    } else {
      router.push("/eligibility");
    }
  }

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleNextTest = async () => {
    const isValid = await form.trigger(); // Trigger validation for the current step
    if (!isValid) {
      console.log("Validation Errors:", form.formState.errors); // Log validation errors
      return; // Prevent moving to the next step
    }
    setStep((prev) => prev + 1); // Move to the next step if valid
  };

  /* --------------------------------------------
     3A) Step Components
     -------------------------------------------- */
  const renderStep1 = () => (
    <div className="grid items-center gap-x-6 gap-y-4 md:grid-cols-2">
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
      <CustomDatePicker label="Date of Birth*" name="dateOfBirth" form={form} />
      {/* 
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
                value={
                  field.value ? field.value.toISOString().split("T")[0] : ""
                }
                onChange={(e) => field.onChange(new Date(e.target.value))}
                placeholder="Select your date"
                className="w-full rounded-md border px-2 py-1"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> 
      */}
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
                  <SelectItem key={profession} value={profession}>
                    {profession === "SALARIED" ? "Salaried" : "Business Owner"}
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
                    <SelectItem value="PROPRIETOR">
                      Sole Proprietorship
                    </SelectItem>
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
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
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
      {loanType === "CAR_LOAN" ? (
        <FormField
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
        />
      ) : null}
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
                  <SelectValue
                    className="text-gray-200"
                    placeholder="Selecet month"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {loanType === "INSTANT_LOAN"
                  ? loanTenureForInstantLoan.map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num} Month
                      </SelectItem>
                    ))
                  : loanTenure.map((num) => (
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
        <div className="grid items-center gap-x-6 gap-y-4 md:grid-cols-2">
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
        <div className="grid items-center gap-x-6 gap-y-4 md:grid-cols-2">
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
        <div className="grid items-center gap-x-6 gap-y-4 md:grid-cols-2">
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
    const formSteps = [
      { stepNumber: 1, title: "Step 1", description: "Personal Info" },
      { stepNumber: 2, title: "Step 2", description: "Financial Details" },
      { stepNumber: 3, title: "Step 3", description: "Contact Info" },
    ];
    return (
      <div className="px-0 lg:px-4">
        <div className="relative mb-2 px-10">
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="absolute left-0 right-0 top-[10px] mx-auto h-[4px] w-full -translate-y-1/2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${stepPercentage}%` }}
              />
            </div>
            {formSteps.map((formStep) => {
              const isCompleted = formStep.stepNumber < step;
              const isCurrent = formStep.stepNumber === step;

              return (
                <div
                  key={formStep.stepNumber}
                  className="group relative flex flex-col items-center"
                >
                  <div
                    className={cn(
                      "relative flex h-5 w-5 transform items-center justify-center rounded-full border-2 transition-all duration-300",
                      isCompleted &&
                        "border-primary bg-primary ring-4 ring-primary/30",
                      isCurrent &&
                        "border-primary bg-primary ring-4 ring-primary/30",
                      !isCompleted && !isCurrent && "border-gray-300 bg-white",
                    )}
                  >
                    {isCompleted ? (
                      <div className="h-2 w-2 rounded-full bg-white ring-4 ring-primary/30 transition-colors"></div>
                    ) : (
                      <div className="text-center">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            isCurrent ? "bg-white" : "bg-gray-300",
                          )}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-0 mt-4 flex w-full items-center justify-between px-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {formSteps.map((formStep) => {
            return (
              <div key={formStep.stepNumber} className="text-center">
                <h4 className="mb-1 font-bold text-primary">
                  {formStep.title}
                </h4>
                <p className="text-sm">{formStep.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* --------------------------------------------
     4) Render the Full Dialog
     -------------------------------------------- */
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      aria-describedby="loan-description"
    >
      <DialogContent
        className="max-w-2xl rounded-lg"
        onInteractOutside={(e) => {
          e.preventDefault(); // Keep if you want to prevent outside click closing. Remove otherwise.
        }}
      >
        <DialogHeader>
          <DialogTitle className="mb-10 text-center">
            Find the best Personal Loan for you
          </DialogTitle>

          {/* This ensures accessibility and removes aria-describedby warning */}
          <DialogDescription id="loan-description">
            Please provide your information to check your loan eligibility.
          </DialogDescription>

          <div className="mt-8">{renderStepIndicator()}</div>
        </DialogHeader>

        <ScrollArea className="max-h-96">
          <Card className="w-full border-none p-6 text-left shadow-none">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}

                <div className="flex justify-between pt-1">
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
                    <Button type="button" onClick={handleNextTest}>
                      {step === 3 ? "Check Eligibility" : "Continue"}
                    </Button>
                  ) : (
                    <Button type="submit">Check Eligibility</Button>
                  )}
                </div>
              </form>
            </Form>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default EligibilityCheckModal;
