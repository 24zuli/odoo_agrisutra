export async function fetchNews() {
  try {
    const response = await fetch(
      "https://backend-agrisutra.onrender.com/api/news"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}
