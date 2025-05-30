import Header from "~/components/Header";
import type { Route } from "./+types/home";
import MainOrder from "~/order/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order Summary | Shop" },
    {
      name: "description",
      content:
        "Lihat detail pesanan Anda, termasuk produk, variasi, dan status order di Shop.",
    },
    {
      name: "keywords",
      content: "order, pesanan, shop, detail order, status pesanan, checkout",
    },
    { name: "robots", content: "index,follow" },
  ];
}

export default function Order() {
  return (
    <>
      <Header />
      <MainOrder />
    </>
  );
}
