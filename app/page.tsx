import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import CtaFooter from "@/components/landing/CtaFooter";

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <CtaFooter />
    </div>
  );
}
