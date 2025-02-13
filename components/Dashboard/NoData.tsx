import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoData = () => {
  return (
    <div className="flex-1 flex-center flex-col">
      <Image src="/icons/server.png" width={70} height={70} alt="Server" />
      <h4 className="h4">No Data</h4>
      <p className="body-2 text-sm text-gray-500/50">
        Deploy your first host with just simple steps
      </p>
      <Link href="/docs/get-started" className="text-color-tertiary underline">
        Get Started
      </Link>
    </div>
  );
};

export default NoData;
