import Header from "~/components/Header";
import type { Route } from "./+types/home";
import MainDetails from "~/details/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Produk Details" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Details() {
  return (
    <>
      <Header />
      <MainDetails />
    </>
  );
}
