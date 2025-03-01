import GiveEquipmentForm from "../../../components/GiveEquipmentFrom"; // ✅ Import Form Component
import { fetchCategories } from "@/lib/apiCalls";

interface Props {
  params: { category: string };
}



export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat: { name: string }) => ({
    category: cat.name.toLowerCase(),
  }));
}


export default function GiveEquipmentPage({ params }: Props) {
  return <GiveEquipmentForm category={params.category} />;
}
