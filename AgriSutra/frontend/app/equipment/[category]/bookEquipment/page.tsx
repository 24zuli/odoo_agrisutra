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

// ✅ Next.js expects this function to return an array of params
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat: { name: string }) => ({
    category: cat.name.toLowerCase(),
  }));
}

// ✅ Page component receives params directly
export default function BookEquipmentPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  return <BookEquipment category={category} />;
}
