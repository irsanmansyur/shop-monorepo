"use client";
import React, { useEffect, useRef } from "react";
import { useDetails } from "./useDetails";

interface DetailsProductProps {
  product: WEB.Product;
}

const DetailsProduct: React.FC<DetailsProductProps> = ({
  product: { description },
}) => {
  const { set } = useDetails();
  const ref = useRef<HTMLDivElement>(null);
  const descNoImgStyle = description.replace(
    /<img\b([^>]*?)\sstyle="[^"]*"/gi,
    "<img$1",
  );

  useEffect(() => {
    if (ref?.current) {
      set({ sectionDetails: ref });
    }
  }, [ref]);

  return (
    <div id="details" ref={ref} className="overflow-x-hidden pt-10">
      <h3 className="border-b font-bold text-slate-600 border-slate-600 text-lg">
        Product Description
      </h3>
      <div
        className="break-words whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: descNoImgStyle }}
      ></div>
    </div>
  );
};

export default DetailsProduct;
