import Image from "next/image";
import Hero from "@/src/layouts/Hero";
import Partners from "@/src/layouts/Partners";
import Features from "@/src/layouts/Features";
import Solutions from "@/src/layouts/Solutions";
import Cta from "@/src/layouts/Cta";
import Faq from "@/src/layouts/Faq";
import Newsletter from "@/src/layouts/Newsletter";
import Footer from "@/src/layouts/Footer";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center text-white overflow-hidden">
      <Hero />
      <Partners />
      <Features />
      <Solutions />
      <Cta />
      <Faq />
      <Newsletter />
      <Footer />
    </main>
  );
}
