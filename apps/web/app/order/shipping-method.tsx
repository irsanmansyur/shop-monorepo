import { Clock, Package, Truck } from "lucide-react";
import { formatPrice } from "~/lib/utils";
import { useWeb } from "~/store/zustan";

interface ShippingMethodProps {}

export const ShippingMethod: React.FC<ShippingMethodProps> = ({}) => {
  const { orderData, set } = useWeb();
  const shippingMethods = [
    { id: "regular", name: "Reguler (3-5 hari)", price: 0, icon: Truck },
    { id: "express", name: "Express (1-2 hari)", price: 20, icon: Clock },
    {
      id: "same_day",
      name: "Same Day (hari ini)",
      price: 34,
      icon: Package,
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Metode Pengiriman
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {shippingMethods.map((shippingMethod) => {
            const IconComponent = shippingMethod.icon;
            return (
              <label
                key={shippingMethod.id}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value={shippingMethod.id}
                  checked={orderData.shippingMethod.id === shippingMethod.id}
                  onChange={() =>
                    set({
                      orderData: {
                        ...orderData,
                        shippingMethod,
                      },
                    })
                  }
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    orderData.shippingMethod.id === shippingMethod.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  {orderData.shippingMethod.id === shippingMethod.id && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <IconComponent className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {shippingMethod.name}
                  </div>
                </div>
                <div className="font-semibold text-gray-900">
                  {shippingMethod.price === 0
                    ? "GRATIS"
                    : formatPrice(shippingMethod.price, "USD", 2, "en-US")}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
