import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { useDetails } from "./useDetails";

export function MenubarDemo() {
  const [opacity, setOpacity] = useState(0);
  const { activeTab, set } = useDetails();

  useEffect(() => {
    const parent = document.getElementById("parentMain");
    if (!parent) return () => {};

    const start = 200;
    const end = 600;

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

  return (
    <div
      className={`fixed left-0 right-0 md:hidden top-[81px] z-[99999] pb-2`}
      style={{
        opacity,
      }}
    >
      <div className="flex justify-center gap-2 items-center py-1 bg-slate-50 shadow border-b border-b-slate-300">
        {["overview", "details", "recommended"].map((s, i) => {
          return (
            <NavLink
              key={i}
              to={`./#${s}`}
              onClick={() =>
                set({ activeTab: s as unknown as WEB.DetailsActiveTab })
              }
            >
              <Button
                variant={s == activeTab ? "destructive" : "outline"}
                className="py-[2px] px-2 capitalize "
              >
                {s}
              </Button>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
