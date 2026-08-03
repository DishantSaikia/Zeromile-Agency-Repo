import { CommercialVehicleForm } from "@/components/admin/CommercialVehicleForm";
import { createCommercialVehicle } from "../actions";

export default function NewCommercialVehiclePage() {
  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Add commercial vehicle</h1>
      <div className="mt-6">
        <CommercialVehicleForm action={createCommercialVehicle} />
      </div>
    </div>
  );
}
