import { CTASection } from "@/components/sections/cta"
import { FeaturesSection } from "@/components/sections/features"
import { HeroSection } from "@/components/sections/hero"
import { ImpactSection } from "@/components/sections/impact"

export default function Home() {
  return (
    <main className="font-inter">
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <CTASection />
    </main>
  )
}
