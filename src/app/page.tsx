import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marketplace } from "@/components/Marketplace";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30">
      {/* Global Background Mesh */}
      <div className="fixed inset-0 bg-mesh opacity-40 pointer-events-none -z-20" />
      
      <Navbar />
      <Hero />
      <section id="marketplace" className="scroll-mt-20">
        <Marketplace />
      </section>
      <Footer />
    </main>
  );
}
