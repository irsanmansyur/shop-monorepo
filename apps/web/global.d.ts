declare namespace WEB {
  type DetailsActiveTab = "overview" | "details" | "recommended";
  type Product = {
    description: string;
    name: string;
    id: string;
    price: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    sku: string;
    slug: string;
    stockQuantity: number;
    minimumOrderQuantity: number;
    weightGrams: number | null;
    isActive: boolean;
    category: string | null;
    tags: string[];
  };
  type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  };

  type CartItem = Product & { quantity: number; selected: boolean };
}
