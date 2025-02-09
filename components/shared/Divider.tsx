import React from "react";

const Divider = ({ opacity, width }: { width: string; opacity: string }) => {
  return (
    <div className="w-full my-2 flex-center">
      <div
        style={{ width: `${width}%`, opacity: `${opacity}` }}
        className={`border-t border-gray-500`}
      />
    </div>
  );
};

export default Divider;
