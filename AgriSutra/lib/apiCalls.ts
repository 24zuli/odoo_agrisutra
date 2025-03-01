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
  