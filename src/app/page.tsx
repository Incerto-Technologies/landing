import Hero from "@/components/sections/hero"
import dynamic from "next/dynamic"

const Features = dynamic(() => import("@/components/sections/features"))
const Impact = dynamic(() => import("@/components/sections/impact"))
const CTA = dynamic(() => import("@/components/sections/cta"))

export default function Home() {


  return (
    <main>
      <Hero />
      <Features />
      <Impact />
      <CTA />
    </main>
  )
}