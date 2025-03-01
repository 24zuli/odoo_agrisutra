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