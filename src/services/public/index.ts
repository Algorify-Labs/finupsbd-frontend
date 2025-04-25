"use server";


export interface EmiCalculatorPayload {
  disbursementDate: string;
  loanAmount: string;
  numberOfMonths: number;
  numberOfSchedule?: number;
  interestRate: string
  emiAmount?: string;
 }


export const emiCalculatorApi = async (payload: EmiCalculatorPayload) => {
    // console.log(payload)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/public/emi-calculator`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const jsonData = await res.json();
    // console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};



export const applicationTracking = async (payload: {applicationId: string, phone: string}) => {
    console.log(payload)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/application/application-tracking`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const jsonData = await res.json();
    // console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
