import { fetchSchemes, fetchSchemeById } from "@/lib/api";
import SchemeDetailClient from "././SchemeDetailClient";

export async function generateStaticParams() {
  const schemes = await fetchSchemes();
  return schemes.map((scheme) => ({
    id: scheme.id.toString(),
  }));
}

export default async function SchemeDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const scheme = await fetchSchemeById(id);

  if (!scheme) {
    return <div>Scheme not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <SchemeDetailClient scheme={scheme} />
    </div>
  );
}