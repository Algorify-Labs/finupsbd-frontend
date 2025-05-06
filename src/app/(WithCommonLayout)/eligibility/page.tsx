"use client";

import LoadingComponent from "@/components/loading/LoadingComponent";
import EligibilityCheckDataShow from "@/components/modules/eligibility/EligibilityCheckDataShow";
import { TEligibilityCheckDataShow } from "@/components/modules/eligibility/EligibilityTypes";
import { Button } from "@/components/ui/button";
import { eligibilityCheckData } from "@/services/eligibilityCheck";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface QueryData {
  amount: number;
  interestRate: number;
  searchTerm: string[];
  sortOrder: string;
  page: number;
  sortKey: string;
}

const EligibilityPage = () => {
  const [submissionData, setSubmissionData] = useState<TEligibilityCheckDataShow>({
    data: [],
    pagination: {page: 1, pageSize: 10, totalLoans: 0},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [queryData, setQueryData] = useState<QueryData>({
    sortKey: "desc",
    page: 1,
    sortOrder: "desc",
    interestRate: 0,
    searchTerm: [],
    amount: 100000,
  });
  const searchParams = useSearchParams();
  const loanType = searchParams.get("loanType");
  const compareValue = searchParams.get("compare");



  const handleQueryData = (data: QueryData) => {
    setQueryData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = sessionStorage.getItem("eligibilityData");
        if (data) {
          const parsedData = JSON.parse(data);
          // Await the fetch response and parse it
          const result = await eligibilityCheckData(parsedData, queryData)
           setSubmissionData(result?.data);
          // if (result?.status === 200) {
          //   setSubmissionData(result?.data);
          //   toast.success("Eligibility check completed successfully.");
          // } else {
          //   toast.error("Eligibility check failed. Please try again.");
          // }


          // sessionStorage.removeItem("eligibilityData");
        }
      } catch (error) {
        console.error("Error parsing eligibility data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [queryData])


  if (isLoading) {
    return <LoadingComponent />;
  }



  function handleStartEligibilityCheck(): void {
    // Redirect to the eligibility check page or trigger the eligibility check process
    window.location.href = "/";
  }

  return (
    <div>
      {submissionData ? (
        <EligibilityCheckDataShow
          submissionData={submissionData}
          onSendData={handleQueryData}
        />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center py-8">
          <p className="mb-4 text-lg font-semibold text-gray-700">
            Eligibility Check Pending
          </p>
          <p className="text-md mb-6 max-w-md text-center text-gray-500">
            We have not received your eligibility data yet. Please complete the
            eligibility check to view personalized results and offers.
          </p>
          <Button
            variant="default"
            onClick={() => handleStartEligibilityCheck()}
          >
            Start Eligibility Check
          </Button>
        </div>
      )}
    </div>
  );
};

export default EligibilityPage;
