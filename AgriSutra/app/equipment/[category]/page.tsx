import { fetchEquipmentByCategory, fetchCategories } from "@/lib/apiCalls";
import EquipmentCard from "../../components/EquipmentCard"; // ✅ Ensure correct import
import CategoryActions from "../../components/CategoryActions"; // ✅ Client Component

interface Props {
  params: { category: string };
}

// ✅ Keep `page.tsx` as a Server Component
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat: { name: string }) => ({
    category: cat.name.toLowerCase(),
  }));
}

export default async function EquipmentCategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = await params; // ✅ Await params before destructuring
    const { category } = resolvedParams;
    const equipment = await fetchEquipmentByCategory(category);
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* ✅ Move the header (Back button + Category title) to the top */}
      <CategoryActions category={category} />

      {/* Available Equipment Section */}
      <h2 className="text-2xl font-semibold mt-8">Available Equipment in {category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {equipment.length > 0 ? (
          equipment.map((item: any) => <EquipmentCard key={item.equipment_id} equipment={item} />)
        ) : (
          <p className="text-gray-500">No equipment available for this category.</p>
        )}
      </div>
    </div>
  );
}
