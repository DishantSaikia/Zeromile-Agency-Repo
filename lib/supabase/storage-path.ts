// Listing photos are stored in the DB as full public URLs, but Storage's
// delete API wants the bucket-relative path. Extracts that path so removed
// photos actually get cleaned up from Storage, not just unlinked in the DB.
export function storagePathFromPublicUrl(url: string, bucket: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}
