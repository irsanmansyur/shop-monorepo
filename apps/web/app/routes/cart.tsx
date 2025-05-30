import { Button } from "~/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useWeb } from "~/store/zustan";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";
import { Skeleton } from "~/components/ui/skeleton";
import { ItemKeranjang } from "~/keranjang/item";

export default function CartPage() {
  const { keranjangs, orders } = useWeb();

  const total = orders.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0,
  );

  const itemCount = keranjangs.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 md:p-4">
      <div className="container mx-auto px-4 py-6 max-w-4xl bg-white">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hover:bg-white/80"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Shop
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-500 rounded-full text-white">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Keranjang Belanja
            </h1>
            <p className="text-gray-600">{itemCount} item(s) in your cart</p>
          </div>
        </div>

        {keranjangs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">Add some items to get started</p>
            <Button asChild className="bg-red-500 hover:bg-red-600">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {keranjangs.map((item, i) => (
                <ItemKeranjang key={item.id + i} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({itemCount})</span>
                    <span>$ {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>$ {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <ButtonProceed />

                <Button
                  variant="outline"
                  className="w-full mt-3 border-gray-200 text-gray-600 hover:bg-gray-50"
                  asChild
                >
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ButtonProceed() {
  const { orders } = useWeb();
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="w-full h-[30px] rounded-lg" />;
  }
  if (!data?.session) {
    return (
      <Button
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        asChild
      >
        <Link to="/login">Login Dulu</Link>
      </Button>
    );
  }
  if (orders.length < 1) {
    return (
      <Button className="w-full" disabled>
        Select Product
      </Button>
    );
  }

  return (
    <Button
      disabled={orders.length < 1}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      asChild
    >
      <Link to="/order">Order</Link>
    </Button>
  );
}
