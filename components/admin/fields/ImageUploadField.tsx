"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type ImageItem = { src: string; alt: string; status: "done" | "uploading" | "error" };

type Props = {
  label: string;
  defaultImages?: { src: string; alt: string }[];
  onBusyChange?: (busy: boolean) => void;
};

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const BUCKET = "listing-photos";

export function ImageUploadField({ label, defaultImages = [], onBusyChange }: Props) {
  const [items, setItems] = useState<ImageItem[]>(
    defaultImages.map((img) => ({ ...img, status: "done" as const }))
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onBusyChange?.(items.some((item) => item.status === "uploading"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const supabase = createClient();

    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setItems((prev) => [...prev, { src: "", alt: `${file.name} (unsupported type)`, status: "error" }]);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setItems((prev) => [...prev, { src: "", alt: `${file.name} (too large)`, status: "error" }]);
        continue;
      }

      const placeholder: ImageItem = { src: "", alt: file.name, status: "uploading" };
      setItems((prev) => [...prev, placeholder]);

      const path = `${crypto.randomUUID()}-${file.name}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file);
      const publicUrl = error ? "" : supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

      setItems((prev) =>
        prev.map((item) =>
          item === placeholder
            ? error
              ? { ...item, status: "error" as const }
              : { src: publicUrl, alt: file.name, status: "done" as const }
            : item
        )
      );
    }

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const doneImages = items.filter((item) => item.status === "done");

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input type="hidden" name="images" value={JSON.stringify(doneImages.map((i) => i.src))} readOnly />
      <input type="hidden" name="imageAlt" value={JSON.stringify(doneImages.map((i) => i.alt))} readOnly />

      {items.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative h-20 w-28 overflow-hidden rounded-xl border border-hairline-strong bg-surface-2"
            >
              {item.status === "done" && item.src && (
                <Image src={item.src} alt={item.alt} fill unoptimized sizes="112px" className="object-cover" />
              )}
              {item.status === "uploading" && (
                <div className="flex h-full items-center justify-center px-2 text-center text-xs text-ink-muted">
                  Uploading…
                </div>
              )}
              {item.status === "error" && (
                <div className="flex h-full items-center justify-center px-2 text-center text-xs text-danger">
                  {item.alt}
                </div>
              )}
              <button
                type="button"
                onClick={() => removeItem(i)}
                aria-label={`Remove ${item.alt}`}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-xs text-white transition-colors hover:bg-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-xl border border-hairline-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
      >
        Add photos
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />
      <p className="mt-1.5 text-xs text-ink-faint">JPEG, PNG, or WebP - up to 8MB each.</p>
    </div>
  );
}
