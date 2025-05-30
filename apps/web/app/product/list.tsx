import { trpc } from "@packages/trpc";
import { ProductList } from "../components/ProductList";
import { useSearch, useWeb } from "~/store/zustan";
import { useEffect, useRef, useState } from "react";

export default function ProductsPage() {
  const { q } = useSearch();
  const { filterPrice } = useWeb();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<WEB.Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isFetching } = trpc.product.all.useQuery({
    ...(filterPrice && {
      minPrice: filterPrice[0],
      maxPrice: filterPrice[1],
    }),
    limit: 10,
    page,
    ...(q && q.length > 1 && { search: q }),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
      if (page === 1) {
        setProducts(data.items as WEB.Product[]);
      } else {
        setProducts((prev) => [...prev, ...(data.items as WEB.Product[])]);
      }
    }
  }, [data]);

  // Reset page & products saat q/filter berubah
  useEffect(() => {
    setPage(1);
  }, [q, filterPrice]);

  // Infinite scroll handler
  const loader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = document.getElementById("parentMain");
    if (!loader.current || !parent) return;

    const handleScroll = () => {
      if (
        loader.current &&
        loader.current.getBoundingClientRect().top < window.innerHeight &&
        !isFetching &&
        page < totalPages
      ) {
        setPage((p) => p + 1);
      }
    };
    parent.addEventListener("scroll", handleScroll);
    return () => parent.removeEventListener("scroll", handleScroll);
  }, [isFetching, page, totalPages]);

  return (
    <>
      <ProductList products={products} />
      <div ref={loader} />
      {isFetching && <div className="text-center py-4">Loading...</div>}
    </>
  );
}
