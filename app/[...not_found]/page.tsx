import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

const Page = () => {
  notFound();
};

export default Page;
