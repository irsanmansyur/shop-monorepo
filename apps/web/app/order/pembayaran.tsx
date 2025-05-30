import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { formatPrice } from "~/lib/utils";
import { useWeb } from "~/store/zustan";

interface PaySectionProps {}

export const PaySection: React.FC<PaySectionProps> = ({}) => {
  const [belanja, setBelanja] = useState({
    total: 0,
    totalBelanja: 0,
  });
  const { orders, orderData } = useWeb();

  useEffect(() => {
    const totalBelanja = orders.reduce((a, b) => (a += +b.price), 0);
    setBelanja({
      totalBelanja,
      total: totalBelanja + orderData.shippingMethod.price,
    });
    return () => {};
  }, [orders, orderData]);

  return (
    <div className="bg-gray-50 p-2 md:p-4  border rounded-lg space-y-2 md:space-y-4">
      <div className="p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            {formatPrice(belanja.totalBelanja, "USD", 2, "en-US")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ongkos Kirim</span>
          <span className="font-medium">
            {orderData.shippingMethod.price === 0
              ? "GRATIS"
              : formatPrice(orderData.shippingMethod.price, "USD", 2, "en-US")}
          </span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-xl text-blue-600">
            {formatPrice(belanja.total, "USD", 2, "en-US")}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-2 flex-col md:flex-row">
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          onClick={() => {
            toast.info("Payment Gateway Coming Soon! 🚀");
          }}
        >
          Pay Now
        </Button>
        <Button
          className="font-semibold py-3 rounded-lg transition-colors duration-200"
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
