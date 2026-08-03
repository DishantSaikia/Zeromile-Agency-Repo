import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Add testimonial</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
