"use client";

import LoadingComponent from "@/components/loading/LoadingComponent";
import { LoanResponse, TEligibilityCheckDataShow } from "@/components/modules/eligibility/EligibilityTypes";
import EligibilityInstantLoanDataShow from "@/components/modules/eligibility/instantLoan/EligibilityInstantLoanDataShow";
import { Button } from "@/components/ui/button";
import { eligibilityCheckData } from "@/services/eligibilityCheck";
import { useEffect, useState } from "react";


export interface QueryDataProps {
  amount: number;
  tenure: number;
  interestRate: number;
  searchTerm: string[];
  sortOrder: string;
  page: number;
  sortKey: string;
}


const InastantLoanPage = () => {
  const [submissionData, setSubmissionData] = useState<LoanResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 const [queryData, setQueryData] = useState<QueryDataProps>({ tenure: 1, sortKey: "desc", page: 1, sortOrder: "desc", interestRate: 0, searchTerm: [], amount: 100000 });



  const handleQueryData = (data: QueryDataProps) => {
    setQueryData(data);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = sessionStorage.getItem("eligibilityData");
        if (data) {
          const parsedData = JSON.parse(data);
          const result = await eligibilityCheckData(parsedData, queryData);
          setSubmissionData(result?.data);

          // sessionStorage.removeItem("eligibilityData");
        }
      } catch (error) {
        console.error("Error parsing eligibility data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [queryData]);

  if (isLoading) {
    return <LoadingComponent />;
  }


  function handleStartEligibilityCheck(): void {
    window.location.href = "/";
  }


  return (
    <div>
      {submissionData ? (
        <EligibilityInstantLoanDataShow
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

export default InastantLoanPage;
