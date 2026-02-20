
import AvailableEquipment from "../../../components/AvailableEquipment";
import { fetchCategories } from "@/lib/apiCalls";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  
  // ✅ Ensure all category paths include `takeEquipment`
  return categories.map((cat: { name: string }) => ({
    category: cat.name.toLowerCase(), // Convert category name to lowercase for consistency
  }));
}

export default function TakeEquipmentPage({ params }: { params: { category: string } }) {
    return <AvailableEquipment category={params.category} />;
}