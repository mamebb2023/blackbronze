export const links = [
  { href: "#services", label: "Services" },
  { href: "#works", label: "Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const works = [
  {
    title: "LotusFlow",
    mini_title: "AI-Powered React Component Generator",
    description: "AI-powered tool to generate React components just from text prompts.",
    color:
      "bg-gradient-to-tr from-blue-950/80 via-transparent to-transparent",
    textColor: "text-blue-300",
    images: [
      "/assets/lotusflow/lotusflow-1.png",
      "/assets/lotusflow/lotusflow-2.png",
      "/assets/lotusflow/lotusflow-3.png",
      "/assets/lotusflow/lotusflow-4.png",
      "/assets/lotusflow/lotusflow-5.png",
      "/assets/lotusflow/lotusflow-6.png",
    ],
  },
  {
    color: "#6BCF91",
    title: "WeMD Africa",
    mini_title: "Online Dermatology Clinic",
    description: "Connecting patients with dermatologists across Africa.",
    links: { live: "https://wemd-africa.vercel.app/" },
    features: [
      "Light/Dark Theme",
      "Fully Responsive",
      "Localization (English and Amharic)",
      "Doctor Consultation Stepped Form",
      "Chat Page",
      "Animations ...",
    ],
    logo: "/assets/wemd/wemd-logo.webp",
    images: [
      "/assets/wemd/wemd-1.jpg",
      "/assets/wemd/wemd-2.jpg",
      "/assets/wemd/wemd-3.jpg",
      "/assets/wemd/wemd-4.jpg",
      "/assets/wemd/wemd-5.jpg",
      "/assets/wemd/wemd-6.jpg",
    ],
  },
  {
    color: "#00D9FF",
    forClient: true,
    title: "SanAI",
    mini_title: "Your Personal AI Doctor",
    description: "AI-powered health assistant for personalized care.",
    links: { live: "https://sanai-nu.vercel.app/" },
    features: [
      "AI Voice Chatbot",
      "Image Recognition",
      "Symptom Checker",
      "Health Tips",
      "Personalized Health Insights",
      "Responsive Design",
    ],
    logo: "/assets/sanai/sanai-logo.png",
    images: [
      "/assets/sanai/sanai-1.png",
      "/assets/sanai/sanai-2.png",
      "/assets/sanai/sanai-3.png",
      "/assets/sanai/sanai-4.png",
      "/assets/sanai/sanai-5.png",
      "/assets/sanai/sanai-6.png",
    ],
  },
  {
    color: "#1010a0",
    title: "CalHabit",
    mini_title: "Habit tracking web app",
    description:
      "Modern habit tracker designed to help you stay on top of your goals",
    links: { live: "https://cal-habit.vercel.app/", code: "https://github.com/mamebb2023/CalHabit" },
    features: ["Easy Habit Tracking", "Responsive Design"],
    logo: "/assets/calhabit/calhabit-logo.png",
    images: [
      "/assets/calhabit/calhabit-1.png",
      "/assets/calhabit/calhabit-2.png",
      "/assets/calhabit/calhabit-3.png",
      "/assets/calhabit/calhabit-4.png",
      "/assets/calhabit/calhabit-5.png",
      "/assets/calhabit/calhabit-6.png",
    ],
  },
];

export const services = [
  {
    id: "web-design",
    title: "Custom Web Design",
    description:
      "Bespoke websites tailored to your brand identity.",
    variant: "featured",
    span: "md:col-span-3 lg:col-span-4 md:row-span-2",
    cta: "Learn more",
  },
  {
    id: "brand",
    title: "Brand Identity",
    description: "Cohesive visual language across all touchpoints",
    variant: "outline",
    span: "md:col-span-2",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Rank higher, reach further",
    variant: "gold",
    span: "md:col-span-2",
  },
  {
    id: "responsive",
    title: "Responsive Design",
    description: "Perfect on every device",
    variant: "darkSmall",
    span: "md:col-span-2",
  },
  {
    id: "performance",
    title: "Lightning Fast",
    description: "Optimized performance",
    variant: "performance",
    span: "md:col-span-2 lg:col-span-3",
    extra: "<1s",
  },
];