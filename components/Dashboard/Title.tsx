import React from "react";

interface Props {
  title: string;
  bx_icon: string;
}

const Title = ({ title, bx_icon }: Props) => {
  return (
    <h5 className="flex items-center gap-2 h5 font-bold">
      <i className={bx_icon}></i>
      {title}
    </h5>
  );
};

export default Title;
