"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Tracker = () => {
  const pathname = usePathname();

  // Split the pathname into parts and generate breadcrumb items
  const breadcrumbItems = pathname
    .split("/")
    .filter((path) => path) // Filter out empty segments
    .map((path, index, array) => {
      // Generate the full path for each segment
      const href = "/" + array.slice(0, index + 1).join("/");
      return { name: path.charAt(0).toUpperCase() + path.slice(1), href };
    });

  return (
    <div className="my-1 py-1 px-5 text-gray-500/50 text-sm">
      <div className="flex items-center gap-1 text-gray-700">
        <Link href="/" className="text-blue-600 hover:underline">
          <i className="bx bx-home-alt text-md"></i>
        </Link>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="mx-1 text-gray-400">/</span>
            {breadcrumbItems.length !== index + 1 ? (
              <Link
                href={item.href}
                className={`${
                  index === breadcrumbItems.length - 1
                    ? "text-gray-500"
                    : "text-blue-600 hover:underline"
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
