import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicle } from "../actions";

export default function NewVehiclePage() {
  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Add vehicle</h1>
      <div className="mt-6">
        <VehicleForm action={createVehicle} />
      </div>
    </div>
  );
}
