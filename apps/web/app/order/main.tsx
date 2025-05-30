import { Items } from "./items";
import { PaySection } from "./pembayaran";
import { ShippingMethod } from "./shipping-method";
export default function MainOrder() {
  return (
    <div className="py-18  px-2 md:px-4  space-y-2 md:space-y-4">
      <div className="bg-gray-50 p-2 md:p-4  border rounded-lg space-y-2 md:space-y-4">
        <div className="py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Ringkasan Pesanan
          </h2>
        </div>

        <Items />
      </div>
      <ShippingMethod />
      <PaySection />
    </div>
  );
}
