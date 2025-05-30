import { Truck } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = WEB.Product & { quantity: number; selected: boolean };
type OrderItem = WEB.Product & { quantity: number };
type Base = {
  productSearch?: string;
  detailsActiveTab?: WEB.DetailsActiveTab;
  filterPrice?: number[];
  product?: WEB.Product;
  keranjangs: CartItem[];
  orders: OrderItem[];
  orderData: {
    shippingMethod: { id: string; name: string; price: number; icon: React.FC };
    paymentMethod: string;
    shipping: {
      name: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
      notes: string;
    };
  };
};

export const useWeb = create(
  persist<
    Base & {
      set: (partial: Partial<Base>) => void;
      addToCart: (product: WEB.Product) => void;
      removeFromCart: (productId: string) => void;
      updateQuantity: (productId: string, quantity: number) => void;
    }
  >(
    (set, get) => ({
      keranjangs: [],
      set: (partial) => set((state) => ({ ...state, ...partial })),
      detailsActiveTab: "overview",

      addToCart: (product) => {
        const cart = get().keranjangs;
        const existing = cart.find((p) => p.id === product.id);

        if (existing) {
          // jika sudah ada, tambah quantity
          set({
            keranjangs: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // jika belum ada, tambah produk dengan quantity = 1
          set({
            keranjangs: [...cart, { ...product, quantity: 1, selected: false }],
          });
        }
      },
      removeFromCart: (productId) => {
        set((state) => ({
          keranjangs: state.keranjangs.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          const updatedKeranjangs = state.keranjangs
            .map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0); // hapus item jika quantity <= 0

          return { keranjangs: updatedKeranjangs };
        });
      },
      orderData: {
        shipping: {
          name: "",
          phone: "",
          address: "",
          city: "",
          postalCode: "",
          notes: "",
        },
        paymentMethod: "bank_transfer",
        shippingMethod: {
          id: "regular",
          name: "Reguler (3-5 hari)",
          price: 0,
          icon: Truck,
        },
      },
      orders: [],
    }),
    {
      name: "web-store",
    },
  ),
);

type BaseSearch = {
  q?: string;
  result: WEB.Product[];
};
export const useSearch = create<
  BaseSearch & {
    set: (partial: Partial<BaseSearch>) => void;
  }
>((set) => {
  return {
    result: [],
    q: undefined,
    set,
  };
});
