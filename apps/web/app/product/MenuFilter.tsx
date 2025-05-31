import { Filter, Grid3X3, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { SortPrice } from "~/components/product/sorting-price";
import { RangeHarga } from "~/components/range-harga";
import { Button } from "~/components/ui/button";

import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function MenuFilter() {
  const [activeTab, setActiveTab] = useState("products");

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const parent = document.getElementById("parentMain");
    if (!parent) return () => {};

    const start = 200;
    const end = 300;

    const handleScroll = () => {
      const scrollY = parent.scrollTop;

      if (scrollY <= start) {
        setOpacity(0);
      } else if (scrollY >= end) {
        setOpacity(1);
      } else {
        const ratio = (scrollY - start) / (end - start); // hasil antara 0 - 1
        setOpacity(ratio);
      }
    };

    parent.addEventListener("scroll", handleScroll);
    return () => parent.removeEventListener("scroll", handleScroll);
  }, []);
  const tabs = [{ id: "products", label: "Products" }];
  return (
    <div
      className={`fixed left-0 right-0 md:hidden top-[81px] z-[10]`}
      style={{
        opacity,
      }}
    >
      <div className="bg-white border-b border-gray-200 shadow">
        <div className="flex items-center justify-between px-2 py-1">
          {/* Tab Navigation */}
          <div className="flex items-center">
            {tabs.map((tab, index) => (
              <div key={tab.id + index} className="relative">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>

                {/* Active Tab Underline */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            <SheetDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Filter size={20} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Gunakan opsi di bawah untuk memfilter produk. Jangan lupa simpan
            perubahanmu.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-6">
          <RangeHarga />
          <div>
            <h3 className="font-bold pb-2">Sort Price</h3>
            <SortPrice />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
