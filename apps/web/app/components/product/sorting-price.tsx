import {
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useState } from "react";
import { useWeb } from "~/store/zustan";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SortPrice: React.FC = ({}) => {
  const { set } = useWeb();

  type Sort = "asc" | "desc" | "default";

  const sortProducts = (order: Sort) => {
    if (order === "default") return set({ productSort: { price: undefined } });
    set({ productSort: { price: order } });
  };

  return (
    <div className="relative">
      <Select
        onValueChange={(v) => {
          console.log(v);
          sortProducts(v as unknown as Sort);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              <>
                <ArrowUpDown size={26} />
                Default
              </>
            }
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default" className="flex items-center">
            <ArrowUpDown size={26} />
            Default
          </SelectItem>
          <SelectItem value="asc">
            <SortAsc width={26} />
            Kecil Ke Besar
          </SelectItem>
          <SelectItem value="desc">
            <SortDesc width={26} /> Besar Ke Kecil
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
