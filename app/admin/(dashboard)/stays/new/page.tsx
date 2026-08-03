import { StayForm } from "@/components/admin/StayForm";
import { createStay } from "../actions";

export default function NewStayPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Add stay</h1>
      <div className="mt-6">
        <StayForm action={createStay} />
      </div>
    </div>
  );
}
