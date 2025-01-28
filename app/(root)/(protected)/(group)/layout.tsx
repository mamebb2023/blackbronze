import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-start p-1 px-5 shadow-md">
        notification bar and other things
      </div>

      <div className="flex-1 flex flex-col p-3 bg-gray-500/5">{children}</div>
    </div>
  );
};

export default Layout;
