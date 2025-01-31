'use client'

import { FC } from "react";

const Description : FC<{ itemDescriptionProps: string }> = ({ itemDescriptionProps }) => {

  return (
    <p className="mb-3 font-normal text-gray-700 flex-grow">
      {itemDescriptionProps}
    </p>
  );
};

export default Description;