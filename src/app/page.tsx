import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Workflow } from "@/components/sections/how-it-works";
import { TryIt } from "@/components/sections/try-it";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { Faq } from "@/components/sections/faq";
import { CtaFooter } from "@/components/sections/cta-footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Workflow />
        <TryIt />
        <WhoWeAre />
        <Faq />
        <CtaFooter />
      </main>
    </div>
  );
}
