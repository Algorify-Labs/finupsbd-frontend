"use server";


export const eligiblityCheckData = async (payload: any, queryData: any) => {

    console.log(payload)

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/eligibility-check?amount=${queryData?.amount}&intersteRate=${queryData?.interestRate}&searchTerm${queryData?.searchTerm}&sortOrder=${queryData?.sortOrder}&page=${queryData?.page}&sortKey=${queryData?.sortKey}&tenure=${queryData?.tenure}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        const jsonData = await res.json();
        return jsonData;
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}





