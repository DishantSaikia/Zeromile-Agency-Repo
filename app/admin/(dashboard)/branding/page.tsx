import { getSiteSettings } from "@/lib/data/site-settings";
import { SingleImageForm } from "@/components/admin/SingleImageForm";
import { updateLogo } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBrandingPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Branding</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Your logo, shown in the header and footer across the whole site.
      </p>

      <div className="mt-6 rounded-2xl border border-hairline bg-surface px-6">
        <SingleImageForm
          label="Logo"
          description="Replace the default logo with your own. Leave empty to keep the default."
          defaultImage={settings.logo ? { src: settings.logo, alt: settings.logoAlt ?? "Logo" } : undefined}
          action={updateLogo}
        />
      </div>
    </div>
  );
}
