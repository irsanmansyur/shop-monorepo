"use client";
import React from "react";
import { ImageProductCarausel } from "~/components/image-product-caraousel";
import ExpandableText from "~/components/ui/ExpandableText";
interface CarauselDetailsProps {
  product: WEB.Product;
}

const CarauselDetails: React.FC<CarauselDetailsProps> = ({ product }) => {
  return (
    <div className="space-y-2 px-2">
      <ImageProductCarausel imageUrl={product.imageUrl} />
      <div className="bg-slate-100 p-2 border rounded border-slate-50">
        <div className="font-bold text-lg"> US${product.price}</div>
      </div>
      <ExpandableText
        text={
          "Smart Phone 2024 Cellphone S24 Ultra Original Smartphone 7inch  Unlocked Dual Sim Card 4G Phones Android 13.0 Mobile Phones"
        }
      />
    </div>
  );
};

export default CarauselDetails;
