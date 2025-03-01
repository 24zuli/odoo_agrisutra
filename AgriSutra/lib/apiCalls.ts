
import { jwtDecode } from "jwt-decode";
export const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/categories"); // Your API URL
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await res.json(); // Parse the response and return data
      return data;
    } catch (err) {
      throw new Error("Failed to load categories. Please try again later.");
    }
  };

  
export const fetchEquipmentByCategory = async (category: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/equipment/${category}`);
      if (!response.ok) throw new Error("Failed to fetch equipment");
      return await response.json();
    } catch (error) {
      console.error("Error fetching equipment:", error);
      return [];
    }
  };


  export const fetchAvailableEquipment = async (category: string, availability?: string) => {
    try {
      let url = `http://localhost:3001/api/equipment/available`;
      const params = new URLSearchParams();
  
      if (category) params.append("category", category.toLowerCase()); // ✅ Pass category name
      if (availability && availability !== "All") params.append("availability", availability.toLowerCase()); // ✅ Pass availability filter
  
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
  
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch equipment: ${response.status}`);
  
      return await response.json();
    } catch (error) {
      console.error("🔥 Error fetching equipment:", error);
      return [];
    }
  };
  
  export const fetchEquipmentDetails = async (equipment_id: string) => {
    try {
        const response = await fetch(`http://localhost:3001/api/bookEquipment/${equipment_id}`);
        if (!response.ok) throw new Error("Failed to fetch equipment details");
        return await response.json();
    } catch (error) {
        console.error("🔥 Error fetching equipment details:", error);
        return null;
    }
  };
  
//   export const bookEquipment = async (equipment_id: string, start_date: string, end_date: string) => {
//     try {
//         const token = localStorage.getItem("token"); // ✅ Get token from storage
//         if (!token) throw new Error("User not authenticated");
  
//         const decodedToken: any = jwtDecode(token); // ✅ Decode token
//         const user_id = decodedToken.id; // ✅ Extract user_id from token
  
//         const response = await fetch(`http://localhost:3001/api/bookEquipment/${equipment_id}/book`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ user_id, start_date, end_date }), // ✅ Include user_id
//         });
  
//         const responseData = await response.json();
//         console.log("📩 API Response:", responseData); // ✅ Log response for debugging
  
//         if (!response.ok) {
//             throw new Error(responseData.error || "Booking failed");
//         }
  
//         return responseData;
//     } catch (error) {
//         console.error("🔥 Error booking equipment:", error.message);
//         return { success: false, message: error.message };
//     }
//   };

export const bookEquipment = async (equipment_id: string, start_date: string, end_date: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const decodedToken: any = jwtDecode(token);
        console.log("🔑 Decoded Token:", decodedToken);

        const user_id = decodedToken?.id;
        if (!user_id) throw new Error("Invalid token: User ID missing");

        const response = await fetch(`http://localhost:3001/api/bookEquipment/${equipment_id}/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ user_id, start_date, end_date }),
        });

        let responseData;
        try {
            responseData = await response.json();
        } catch (jsonError) {
            throw new Error("Failed to parse server response");
        }

        console.log("📩 API Response:", responseData);

        if (!response.ok) {
            throw new Error(responseData.error || "Booking failed");
        }

        return responseData;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error("🔥 Error booking equipment:", errorMessage);
        return { success: false, message: errorMessage };
    }
};
