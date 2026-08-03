import { getTestimonials } from "@/lib/data/testimonials";
import { AdminTable } from "@/components/admin/AdminTable";
import { deleteTestimonial } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Testimonials</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Client quotes shown on the homepage.</p>

      <div className="mt-6">
        <AdminTable
          emptyLabel="No testimonials yet - add your first one."
          newHref="/admin/testimonials/new"
          newLabel="Add testimonial"
          rows={testimonials.map((testimonial) => ({
            key: testimonial.id,
            title: testimonial.name,
            subtitle: `${testimonial.context} · ${testimonial.rating}/5`,
            editHref: `/admin/testimonials/${testimonial.id}/edit`,
            onDelete: deleteTestimonial.bind(null, testimonial.id),
          }))}
        />
      </div>
    </div>
  );
}
