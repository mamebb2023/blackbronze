import React from "react";

const Footer = () => {
  return (
    <div className="px-5 md:px-10 text-white">
      <div className="h-[50vh] bg-black flex flex-col">
        <div className="flex-1"></div>
        <div className="border-t mx-20 px-10 py-5 flex items-center justify-end">
          <p className="text-sm">&copy; All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
