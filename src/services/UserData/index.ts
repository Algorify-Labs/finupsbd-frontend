"use server";

import { cookies } from "next/headers";
// Removed unused import: import { getCurrentUser } from "../AuthService";






///////////////////////////////////////////////////////////////////////////////////////////////////



// const [user, setUser] = useState<any>(null)
// const [loading, setLoading] = useState(true)

// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       setLoading(true)
//       const { data } = await userInfo()
//       setUser(data)
//     } catch (err) {
//       setError("Failed to load user profile")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchUserData()
// }, [])





///////////////////////////////////////////////////////////////////////////////////////////////////





export const userInfo = async () => {
  try {
    // Retrieve the token from cookies (cookies() is synchronous)
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/my-profile`, {
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





export const updateUserProfile = async (payload: any) => {

  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    throw new Error("No authentication token found in cookies");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profiles`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: payload,
    });

    console.log("Response Status:", res);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("API Error Response:", errorData);
      throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
    }


    return res.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
      error,
    };
  }
}

