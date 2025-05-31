import Header from "~/components/Header";
import type { Route } from "./+types/details";
import MainDetails from "~/details/main";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { stripHtml } from "~/lib/utils";
import { trpc } from "~/lib/trpc";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug as string;
  const product = await trpc.useUtils().product.getOne.fetch({ slug });

  // Konversi ke JSON agar data benar-benar serializable
  const safeProduct = product ? JSON.parse(JSON.stringify(product)) : null;

  return { product: safeProduct };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.product) {
    return [{ title: "Produk Tidak Ditemukan" }];
  }

  const { name, description, imageUrl, id } = data.product;
  return [
    { title: `${name} | Shop Name` },
    {
      name: "description",
      content: stripHtml(description).slice(0, 130),
    },
    { property: "og:title", content: `${name} | Shop Name` },
    { property: "og:description", content: description },
    { property: "og:type", content: "product" },
    { property: "og:url", content: `https://shop.chank.my.id/details/${id}` },
    { property: "og:image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${name} | Shop Name` },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}

export default function Details() {
  const { product } = useLoaderData<typeof loader>();
  return (
    <>
      <Header />
      <MainDetails product={product as unknown as WEB.Product} />
    </>
  );
}
