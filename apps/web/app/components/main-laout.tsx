import React from "react";
import { RangeHarga } from "./range-harga";
import { MenuFilter } from "~/product/MenuFilter";
interface ProductLayoutProps {
  children: React.ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="py-10 md:pt-20 container sm:px-4 relative">
        <div className="flex gap-4 pt-3 relative">
          <div className="hidden sm:inline w-[240px] shrink-0 static top-0">
            <div className="border rounded shadow bg-slate-50 p-4 space-y-4">
              <h2 className="font-bold text-xl">Filter</h2>
              <RangeHarga />
            </div>
          </div>
          <div className="p-2 sm:p-4  space-y-4 w-full md:border md:rounded md:shadow bg-slate-50 relative">
            <MenuFilter />
            <h1 className="font-bold text-xl">List Product</h1>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLayout;
