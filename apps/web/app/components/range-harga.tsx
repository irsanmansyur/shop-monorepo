import { cn } from "../lib/utils";
import { Slider } from "../components/ui/slider";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useWeb } from "~/store/zustan";

type SliderProps = React.ComponentProps<typeof Slider>;

export function RangeHarga({ className, ...props }: SliderProps) {
  const [price, setPrice] = useState([5, 2000]);
  const { set } = useWeb();

  useEffect(() => {
    const handler = setTimeout(() => {
      set({ filterPrice: price });
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [price]);

  return (
    <>
      <div className="w-full space-y-3">
        <Label htmlFor="terms">Price</Label>
        <Slider
          defaultValue={price}
          max={2000}
          step={2}
          min={5}
          onValueChange={(v) => {
            setPrice(v);
          }}
          className={cn("w-full", className)}
          {...props}
        />
        <div className="flex justify-between text-slate-400">
          <small className="">${price[0].toLocaleString()}</small>
          <small className="">${price[1].toLocaleString()}</small>
        </div>
      </div>
    </>
  );
}
