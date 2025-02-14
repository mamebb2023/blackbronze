import React from "react";

const InfoCard = ({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: string | number }[];
}) => {
  return (
    <div className="p-3 bg-white rounded-md shadow-sm">
      <p className="font-bold text-lg">{title}</p>
      <div className="flex flex-col gap-1">
        {data.map(({ label, value }, index) => (
          <div key={index} className="text-xs">
            <p className="text-gray-500/80">{label}</p>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
