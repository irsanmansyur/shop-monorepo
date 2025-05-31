"use client";
import React, { useEffect, useRef } from "react";
import CarauselDetails from "./caraousel-details";
import SupplierCard from "./toko-info";
import { useDetails } from "./useDetails";
interface OverviewDetailsProps {
  product: WEB.Product;
}

const OverviewDetails: React.FC<OverviewDetailsProps> = ({ product }) => {
  const { set } = useDetails();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current) set({ sectionOverview: ref });
  }, [ref]);

  return (
    <div id="overview" className="w-full" ref={ref}>
      <CarauselDetails product={product} />
      <SupplierCard />
    </div>
  );
};

export default OverviewDetails;
