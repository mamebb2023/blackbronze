import Button from "@/components/shared/Button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex-center h-screen">
      <div className="flex-center gap-2 flex-col">
        <h1 className="text-[10em] font-bold">404</h1>
        <p className="body-2">Page not found</p>
        <Link href="/">
          <Button className="w-[200px] h-[50px]">Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
