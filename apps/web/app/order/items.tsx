import { formatPrice } from "~/lib/utils";
import { useWeb } from "~/store/zustan";

export const Items = () => {
  const { orders } = useWeb();
  return (
    <div className="border-b pb-2">
      <div className="space-y-3">
        {orders.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg border"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium">
              {formatPrice(+item.price * item.quantity, "USD", 2, "en-US")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
