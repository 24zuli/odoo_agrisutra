// import BookEquipment from "../../../components/BookEquipment";
// import { fetchCategories } from "@/lib/apiCalls";

// // ✅ Ensure correct static params to allow category-based pages
// export async function generateStaticParams() {
//   const categories = await fetchCategories();
//   return categories.map((cat: { name: string }) => ({
//     category: cat.name.toLowerCase(),
//   }));
// }

// export default function BookEquipmentPage({ params }: { params: { category: string } }) {
//   return <BookEquipment category={params.category} />;
// }
import BookEquipment from "../../../components/BookEquipment";
import { fetchCategories } from "@/lib/apiCalls";

// ✅ Static params generation for category-based routing
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat: { name: string }) => ({
    category: cat.name.toLowerCase(),
  }));
}

// ✅ Component with correct typing for Next.js 13+/14+/15+
interface PageProps {
  params: {
    category: string;
  };
}

export default function BookEquipmentPage({ params }: PageProps) {
  return <BookEquipment category={params.category} />;
}
