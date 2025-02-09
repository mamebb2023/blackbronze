import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  bx_icon?: string;
  image?: string;
}

const Title = ({ title, bx_icon, image }: Props) => {
  return (
    <h5 className="flex items-center gap-2 h5 font-bold">
      {image && <Image src={image} width={40} height={40} alt="Title Image" />}
      {bx_icon && <i className={bx_icon}></i>}
      {title}
    </h5>
  );
};

export default Title;
