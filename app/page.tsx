import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import Quote from "@/components/landing/Quote";
import CtaFooter from "@/components/landing/CtaFooter";

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Projects />
      <Quote />
      <CtaFooter />
    </div>
  );
}
