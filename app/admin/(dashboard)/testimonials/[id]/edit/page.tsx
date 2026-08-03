import { notFound } from "next/navigation";
import { getTestimonials } from "@/lib/data/testimonials";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { id: string };

export default async function EditTestimonialPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((t) => t.id === id);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">
        Edit {testimonial.name}
      </h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, testimonial.id)} />
      </div>
    </div>
  );
}
