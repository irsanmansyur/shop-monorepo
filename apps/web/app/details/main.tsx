"use client";
import React, { useEffect } from "react";
import DetailsProduct from "./details";
import OverviewDetails from "./overview-details";
import { MenubarDemo } from "./MenuBar";
import "./index.css";
import { useDetails } from "./useDetails";
import ProductVariations from "./pilih-variant";
interface MainDetailsProps {
  product: WEB.Product;
}

const MainDetails: React.FC<MainDetailsProps> = ({ product }) => {
  const { sectionOverview, sectionDetails, set } = useDetails();
  useEffect(() => {
    const parent = document.getElementById("parentMain");
    if (!parent) return () => {};

    const handleScroll = () => {
      const sections = [
        { id: "overview", ref: sectionOverview },
        { id: "details", ref: sectionDetails },
      ];
      // Hitung area yang terlihat di viewport untuk setiap section
      const visibleAreas = sections.map(({ id, ref }) => {
        if (!ref || !ref.current) return { id, visible: 0 };
        const rect = ref.current.getBoundingClientRect();
        const height =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visible = Math.max(0, height);
        return { id, visible };
      });

      // Cari section dengan area terlihat paling besar
      const mostVisible = visibleAreas.reduce((a, b) =>
        a.visible > b.visible ? a : b,
      );
      set({ activeTab: mostVisible.id as WEB.DetailsActiveTab });
    };

    parent.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => parent.removeEventListener("scroll", handleScroll);
  }, [sectionOverview, sectionDetails]);
  return (
    <>
      <div className="py-10 container px-2 md:px-0 whitespace-break-spaces ">
        <div className="flex gap-2 flex-col md:flex-row px-2 w-full  mt-10 justify-between">
          <div className="flex-1 min-w-0">
            <MenubarDemo />
            <OverviewDetails product={product} />
            <DetailsProduct product={product} />
          </div>
          <div className="md:w-[400px] shrink-0">
            <div className="sticky top-[120px] border p-2 h-[87vh]">
              <ProductVariations product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDetails;
