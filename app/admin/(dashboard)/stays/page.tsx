import { getStays } from "@/lib/data/stays";
import { AdminTable } from "@/components/admin/AdminTable";
import { getListingImages } from "@/lib/images";
import { deleteStay } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminStaysPage() {
  const stays = await getStays();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Stays</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Short-term stays shown on the public site.</p>

      <div className="mt-6">
        <AdminTable
          emptyLabel="No stays yet - add your first one."
          newHref="/admin/stays/new"
          newLabel="Add stay"
          rows={stays.map((stay) => ({
            key: stay.id,
            title: stay.title,
            subtitle: stay.location,
            meta: `₹${stay.pricePerNight.toLocaleString("en-IN")}/night`,
            image: getListingImages(stay)[0],
            editHref: `/admin/stays/${stay.slug}/edit`,
            onDelete: deleteStay.bind(null, stay.id),
          }))}
        />
      </div>
    </div>
  );
}
