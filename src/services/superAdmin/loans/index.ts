"use server";
import { cookies } from "next/headers";



export const homeLoan = async (fromdata: globalThis.FormData) => {
    // const formDataObj: any = {};
    // fromdata.forEach((value, key) => (formDataObj[key] = value));
    // console.log(formDataObj);

    const token = (await cookies()).get("accessToken")?.value; 
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }   
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/personal-loan`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: fromdata
        });
        console.log("Response Status:", res.status);

        return await res.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
            error,
        };
    }

}


export const carLoan = async (fromdata: globalThis.FormData) => {
    // const formDataObj: any = {};
    // fromdata.forEach((value, key) => (formDataObj[key] = value));
    // console.log(formDataObj);

    const token = (await cookies()).get("accessToken")?.value; 
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }   
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/personal-loan`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: fromdata
        });
        console.log("Response Status:", res.status);

        return await res.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
            error,
        };
    }

}

export const craditCard = async (fromdata: globalThis.FormData) => {
    // const formDataObj: any = {};
    // fromdata.forEach((value, key) => (formDataObj[key] = value));
    // console.log(formDataObj);

    const token = (await cookies()).get("accessToken")?.value; 
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }   
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/personal-loan`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: fromdata
        });
        console.log("Response Status:", res.status);

        return await res.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
            error,
        };
    }

}