"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type ImageState = { src: string; alt: string; status: "done" | "uploading" | "error" };

type Props = {
  label: string;
  defaultImage?: { src: string; alt: string };
  onBusyChange?: (busy: boolean) => void;
};

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const BUCKET = "listing-photos";

export function SingleImageUploadField({ label, defaultImage, onBusyChange }: Props) {
  const [item, setItem] = useState<ImageState | null>(
    defaultImage ? { ...defaultImage, status: "done" } : null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onBusyChange?.(item?.status === "uploading");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  async function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setItem({ src: "", alt: `${file.name} (unsupported type)`, status: "error" });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setItem({ src: "", alt: `${file.name} (too large)`, status: "error" });
      return;
    }

    setItem({ src: "", alt: file.name, status: "uploading" });

    const supabase = createClient();
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file);
    const publicUrl = error ? "" : supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

    setItem(
      error ? { src: "", alt: file.name, status: "error" } : { src: publicUrl, alt: file.name, status: "done" }
    );

    if (inputRef.current) inputRef.current.value = "";
  }

  const done = item?.status === "done" ? item : null;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input type="hidden" name="image" value={done?.src ?? ""} readOnly />
      <input type="hidden" name="imageAlt" value={done?.alt ?? ""} readOnly />

      <div className="flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-hairline-strong bg-surface-2">
          {item?.status === "done" && item.src && (
            <Image src={item.src} alt={item.alt} fill unoptimized sizes="112px" className="object-cover" />
          )}
          {item?.status === "uploading" && (
            <div className="flex h-full items-center justify-center px-2 text-center text-xs text-ink-muted">
              Uploading…
            </div>
          )}
          {item?.status === "error" && (
            <div className="flex h-full items-center justify-center px-2 text-center text-xs text-danger">
              {item.alt}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl border border-hairline-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              {item ? "Replace photo" : "Add photo"}
            </button>
            {item && (
              <button
                type="button"
                onClick={() => setItem(null)}
                className="text-sm font-medium text-ink-muted underline underline-offset-2 transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded"
              >
                Remove
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFile(e.target.files)}
            className="sr-only"
          />
          <p className="mt-1.5 text-xs text-ink-faint">JPEG, PNG, or WebP - up to 8MB.</p>
        </div>
      </div>
    </div>
  );
}
