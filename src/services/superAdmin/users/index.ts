"use server"

import { cookies } from "next/headers";



export const getAllUsers = async () => {
  try {
    // Retrieve the token from cookies (cookies() is synchronous)
    const token = (await cookies()).get("accessToken")?.value;
    
    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    console.log("Response Status:", res.status);

    // if (!res.ok) {
    //   const errorData = await res.json().catch(() => null);
    //   console.error("API Error Response:", errorData);
    //   throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
    // }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user info:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
      error,
  };
  }
}


export const getSingleUsers = async (id: string) => {
  try {
    // Retrieve the token from cookies (cookies() is synchronous)
    const token = (await cookies()).get("accessToken")?.value;
    
    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    console.log("Response Status:", res.status);

    // if (!res.ok) {
    //   const errorData = await res.json().catch(() => null);
    //   console.error("API Error Response:", errorData);
    //   throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
    // }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user info:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
      error,
  };
  }
}