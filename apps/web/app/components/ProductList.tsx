import { useSearch } from "~/store/zustan";
import CardProductInList from "./product/card-list";
import { useEffect } from "react";

export const ProductList = ({ products }: { products: WEB.Product[] }) => {
  const { set, q } = useSearch();
  useEffect(() => {
    set({ result: products });
    return () => {};
  }, [q]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <CardProductInList key={p.id} product={p} />
      ))}
    </div>
  );
};
