import { getCategoryThumbnails } from "@/lib/data/category-thumbnails";
import { SingleImageForm } from "@/components/admin/SingleImageForm";
import type { CategoryThumbnailKey } from "@/lib/data/types";
import { updateCategoryThumbnail } from "./actions";

export const dynamic = "force-dynamic";

const SECTIONS: { key: CategoryThumbnailKey; label: string; description: string }[] = [
  { key: "self-drive", label: "Self Drive", description: "Photo shown on the homepage's Self Drive card." },
  {
    key: "commercial-vehicles",
    label: "Commercial Vehicle Rental",
    description: "Photo shown on the homepage's Commercial Vehicle Rental card.",
  },
  { key: "stays", label: "Stays", description: "Photo shown on the homepage's Stays card." },
  { key: "packages", label: "Packages", description: "Photo shown on the homepage's Packages card." },
];

export default async function AdminHomepagePage() {
  const thumbnails = await getCategoryThumbnails();
  const byKey = new Map(thumbnails.map((t) => [t.key, t]));

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Homepage Thumbnails</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        The photo shown for each service on the homepage. Leave a section empty to keep the illustrated
        placeholder there instead.
      </p>

      <div className="mt-6 rounded-2xl border border-hairline bg-surface px-6">
        {SECTIONS.map((section) => {
          const thumbnail = byKey.get(section.key);
          return (
            <SingleImageForm
              key={section.key}
              label={section.label}
              description={section.description}
              defaultImage={
                thumbnail?.image ? { src: thumbnail.image, alt: thumbnail.imageAlt ?? section.label } : undefined
              }
              action={updateCategoryThumbnail.bind(null, section.key)}
            />
          );
        })}
      </div>
    </div>
  );
}
