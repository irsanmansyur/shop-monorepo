import Header from "~/components/Header";
import type { Route } from "./+types/home";
import ProductsPage from "~/product/list";
import ProductLayout from "~/components/main-laout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <ProductLayout>
        <ProductsPage />
      </ProductLayout>
    </>
  );
}
