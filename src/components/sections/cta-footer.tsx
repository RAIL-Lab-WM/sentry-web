import Image from "next/image";
import { nsfGrant } from "@/lib/site-data";

const footerLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#who-we-are", label: "Who we are" },
];

export function CtaFooter() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-ink-950 pt-14 pb-10"
    >
      <div className="grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="border-t border-line-on-dark pt-8">
          <div className="flex flex-wrap items-center gap-4 pb-8">
            <span className="font-mono-label shrink-0 text-[10px] uppercase text-white/40">
              Funded &amp; supported by
            </span>
            <div className="relative h-8 w-16">
              <Image
                src={nsfGrant.logos.nsf}
                alt="National Science Foundation"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="rounded-md bg-white px-2.5 py-1.5">
              <div className="relative h-5 w-24">
                <Image
                  src={nsfGrant.logos.civic}
                  alt="NSF Civic Innovation Challenge"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <span className="font-mono-label text-[10px] uppercase text-white/40">
              NSF Award #{nsfGrant.awardNumber}
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 border-t border-line-on-dark py-8 md:flex-row md:justify-between">
            <span className="text-lg font-semibold tracking-tight text-white">
              SENTRY
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono-label text-xs uppercase text-white/60 transition-colors hover:text-blue-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <span className="font-mono-label text-[11px] uppercase text-white/40">
              © {new Date().getFullYear()} SENTRY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
