"use client";
import { useEffect, useState } from "react";
// (Below imports assume you have these shadcn (or Radix-based) components set up in a non-Next.js project)
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MoveUpRight, Terminal } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import EligibilityCheckModal from "../modules/eligibility/EligibilityCheckModal";
import { loanTypes } from "../modules/eligibility/form-steps/form-data-oprions";

function EligibilityNavigation() {
  // Track the selected loan type
  const [loanType, setLoanType] = useState("");
  const [openEligibility, setOpenEligibility] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  // Send data to backend (Compare Loan)
  async function handleCompareLoan() {
    if (loanType == "") {
      setError(true);
      return toast.error("Please Select any loan option for compare Loan");
    }
    router.push(`/eligibility?loanType=${loanType}&compare=true`);
  }

  // Send data to backend (Check Eligibility)
  async function handleCheckEligibility() {
    if (loanType == "") {
      setError(true);
      return toast.error("Select any loan");
    }
    setOpenEligibility(true);
  }

  useEffect(() => {
    console.log("Loan Type:", loanType);
    if (loanType !== "") {
      setError(false);
    }
  }, [loanType]);

  return (
    <div className="container-md relative z-10 p-6">
      {/* Outer container */}
      <div className="flex items-center justify-center">
        <Tabs defaultValue="loans" className="w-full">
          {/* Tabs List */}

          {/* Loans tab content */}
          <div className="relative m-2 min-h-48 rounded-xl bg-white p-6 pt-10 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.1)] lg:pt-14">
            <div className="flex items-center justify-center">
              <TabsList className="absolute -top-6 z-10 bg-white px-2 py-6 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.1)] md:space-x-12">
                <TabsTrigger
                  value="loans"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Loans
                </TabsTrigger>
                <TabsTrigger
                  value="cards"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Cards
                </TabsTrigger>
                <TabsTrigger
                  value="insurance"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Bima/Insurance
                </TabsTrigger>
                <TabsTrigger
                  value="investment"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Investment
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="loans">
              {error ? (
                <Alert variant="destructive" className="mb-4">
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>
                    Please Select any loan option !!
                  </AlertDescription>
                </Alert>
              ) : null}
              <div className="flex flex-col space-y-4">
                {/* Radio buttons for loan types */}
                <RadioGroup
                  value={loanType}
                  onValueChange={setLoanType} // track changes
                  className="gird mb-4 mt-2 flex-none grid-cols-2 gap-6 lg:flex lg:flex-row lg:items-center"
                >
                  {loanTypes?.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem id={type.value} value={type.value} />
                      <Label className="cursor-pointer" htmlFor={type.value}>
                        {type.label}
                      </Label>
                    </div>
                  ))}

                  {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem id="PEOSONAL_LOAN" value="PERSONAL_LOAN" />
                    <Label className="cursor-pointer" htmlFor="PEOSONAL_LOAN">
                      Personal Loan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="INSTANT_LOAN" value="INSTANT_LOAN" />
                    <Label className="cursor-pointer" htmlFor="INSTANT_LOAN">
                      Instant Loan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="HOME_LOAN" value="HOME_LOAN" />
                    <Label className="cursor-pointer" htmlFor="HOME_LOAN">
                      Home Loan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="CAR_LOAN" value="CAR_LOAN" />
                    <Label className="cursor-pointer" htmlFor="CAR_LOAN">
                      Car Loan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="SME_LOAN" value="SME_LOAN" />
                    <Label className="cursor-pointer" htmlFor="SME_LOAN">
                      SME Loan
                    </Label>
                  </div> */}
                </RadioGroup>

                {/* Action buttons */}
                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  <Button
                    variant="default"
                    className="h-12 w-full lg:w-1/2"
                    onClick={handleCompareLoan}
                  >
                    Compare Loan
                    <MoveUpRight size={28} strokeWidth={2.5} />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full lg:w-1/2"
                    onClick={handleCheckEligibility}
                  >
                    Check Eligibility
                    <MoveUpRight size={28} strokeWidth={2.5} />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Other tabs: Cards, Investment, Bima/Insurance */}
            <TabsContent value="cards">
              <div className="flex flex-col space-y-4">
                {/* Radio buttons for loan types */}
                <RadioGroup
                  value={loanType}
                  onValueChange={setLoanType} // track changes
                  className="gird mb-4 mt-2 flex-none grid-cols-2 gap-6 lg:flex lg:flex-row lg:items-center"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="PEOSONAL_LOAN" value="CREDIT_CARDS" />
                    <Label htmlFor="PEOSONAL_LOAN">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="HOME_LOAN" value="DEBIT_CARDS" />
                    <Label htmlFor="HOME_LOAN">Debit Cards</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="CAR_LOAN" value="PREPAID_CARDS" />
                    <Label htmlFor="CAR_LOAN">Prepaid Cards</Label>
                  </div>
                </RadioGroup>

                {/* Action buttons */}
                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  <Button
                    variant="default"
                    className="h-12 w-full lg:w-1/2"
                    onClick={handleCompareLoan}
                  >
                    Compare Loan
                    <MoveUpRight size={28} strokeWidth={2.5} />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full lg:w-1/2"
                    onClick={handleCheckEligibility}
                  >
                    Check Eligibility
                    <MoveUpRight size={28} strokeWidth={2.5} />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="insurance">
              <div>Comming Soon.........</div>
            </TabsContent>
            <TabsContent value="investment">
              <div>Comming Soon.........</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <EligibilityCheckModal
        open={openEligibility}
        onOpenChange={setOpenEligibility} // pass setState so the modal can close itself
        loanType={loanType}
      />
    </div>
  );
}

export default EligibilityNavigation;
