import Hero from "@/components/Hero";
import WhatIsSublime from "@/components/WhatIsSublime";
import HowItSupports from "@/components/HowItSupports";
import KeyAdvantages from "@/components/KeyAdvantages";
import InsightsGuidance from "@/components/InsightsGuidance";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <WhatIsSublime />
      <HowItSupports />
      <KeyAdvantages />
      <InsightsGuidance />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
