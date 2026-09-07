import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  crumb: string;
};

/**
 * Shorter photo banner for inner listing pages - same full-bleed-photo
 * language as the homepage Hero, pulled up behind the fixed transparent
 * header the same way. Swap the placeholder for a real travel/vehicle
 * photo (~1920x600) when one is supplied.
 */
export function PageBanner({ title, crumb }: Props) {
  return (
    <div className="relative -mt-16 flex h-64 items-end overflow-hidden lg:-mt-20 lg:h-80">
      <Image src="https://placehold.co/1920x600/1a1a1a/1a1a1a.png" alt="" fill unoptimized className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(15,20,15,0.5) 0%, rgba(15,20,15,0.7) 100%)" }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">|</span>
          {crumb}
        </p>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
