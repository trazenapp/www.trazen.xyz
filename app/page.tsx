import Image from "next/image";
import Hero from "@/layouts/Hero";
import Partners from "@/layouts/Partners";
import Features from "@/layouts/Features";
import Solutions from "@/layouts/Solutions";
import Cta from "@/layouts/Cta";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center text-white">
      <Hero />
      <Partners />
      <Features />
      <Solutions />
      <Cta />
    </main>
  );
}
