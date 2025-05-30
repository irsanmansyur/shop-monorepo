import { Button } from "../components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Link } from "react-router";

export default function ProductCard({ product }: { product: WEB.Product }) {
  return (
    <Card className="group relative space-y-4 overflow-hidden py-0">
      <div className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          <HeartIcon className="size-4" />
        </Button>
        <Link to={"/details/20"}>
          <img
            className="aspect-square w-full"
            src={product.imageUrl}
            width={300}
            height={500}
            alt={product.name}
          />
        </Link>
      </div>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg">
              <a href={product.id}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-lg font-semibold">{product.price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t">
        <Button variant="ghost" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </CardFooter>
    </Card>
  );
}
