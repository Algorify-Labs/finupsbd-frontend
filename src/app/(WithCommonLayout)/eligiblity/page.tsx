"use client";

import LoadingComponent from "@/components/loading/LoadingComponent";
import EligiblityCheckDataShow from "@/components/modules/eligiblity/EligiblityCheckDataShow";
import { Button } from "@/components/ui/button";
import { eligiblityCheckData } from "@/services/eligiblityCheck";
import { useSearchParams } from "next/navigation";


import { useEffect, useState } from "react";

export interface QueryData {
  amount: number;
  interestRate: number;
  searchTerm: string[];
  sortOrder: string,
  page: number,
  sortKey: string
}


const EligiblityPage = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [queryData, setQueryData] = useState<QueryData>({ sortKey: "desc", page: 1, sortOrder: "desc", interestRate: 0, searchTerm: [], amount: 100000 });
  const searchParams = useSearchParams();
  const loanType = searchParams.get("loanType")
  const compareValue = searchParams.get("compare")


  const compareData = {
    loanType,
    compareValue
  }



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

          if (compareValue) {
            const result = await eligiblityCheckData(compareData, queryData)
            console.log("555555555555555")
            setSubmissionData(result?.data);
          } else {
            const result = await eligiblityCheckData(parsedData, queryData)
            setSubmissionData(result?.data);
          }

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
    // Redirect to the eligibility check page or trigger the eligibility check process
    window.location.href = "/";
  }

  return (
    <div>
      {submissionData ? (
        <EligiblityCheckDataShow submissionData={submissionData} onSendData={handleQueryData} />
      ) : (
        <div className="flex flex-col items-center justify-center py-8 h-screen ">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Eligibility Check Pending
          </p>
          <p className="text-md text-gray-500 mb-6 text-center max-w-md">
            We have not received your eligibility data yet. Please complete the eligibility check to view personalized results and offers.
          </p>
          <Button variant="default" onClick={() => handleStartEligibilityCheck()}>
            Start Eligibility Check
          </Button>
        </div>
      )}
    </div>
  );
};

export default EligiblityPage;