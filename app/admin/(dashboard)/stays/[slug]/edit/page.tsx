import { notFound } from "next/navigation";
import { getStayBySlug } from "@/lib/data/stays";
import { StayForm } from "@/components/admin/StayForm";
import { updateStay } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditStayPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const stay = await getStayBySlug(slug);
  if (!stay) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Edit {stay.title}</h1>
      <div className="mt-6">
        <StayForm stay={stay} action={updateStay.bind(null, stay.id)} />
      </div>
    </div>
  );
}
