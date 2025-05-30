import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useWeb } from "~/store/zustan";

interface ItemProps {
  item: WEB.CartItem;
}

export const ItemKeranjang: React.FC<ItemProps> = ({ item }) => {
  const { keranjangs, set, orders } = useWeb();

  const handleItemSelection = (checked: boolean) => {
    if (checked) {
      // Tambah ke orders jika belum ada
      if (!orders.some((o) => o.id === item.id)) {
        set({
          orders: [...orders, { ...item }],
        });
      } else {
      }
    } else {
      // Hapus dari orders jika ada
      set({
        orders: orders.filter((o) => o.id !== item.id),
      });
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    set({
      keranjangs: keranjangs.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    });
  };

  const handleRemove = (id: string) => {
    set({
      keranjangs: keranjangs.filter((item) => item.id !== id),
    });
    toast.success("Item removed from cart");
  };

  const checkChecked = () => {
    return !!orders.find((i) => i.id === item.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition-shadow duration-200 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
      <div className="flex gap-3">
        {/* Checkbox for selection */}
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            id={`item-${item.id}`}
            checked={checkChecked()}
            onCheckedChange={(checked) =>
              handleItemSelection(checked as boolean)
            }
            className="h-5 w-5"
          />
        </div>

        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg bg-gray-100 border"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Product Name - Limited to 3 lines */}
          <h3
            className="font-semibold text-gray-800 leading-tight mb-2 line-clamp-3 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              maxHeight: "4.5rem",
            }}
          >
            {item.name}
          </h3>

          {/* Price and Subtotal Row */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm text-gray-500">Price</span>
              <p className="text-red-600 font-bold text-base">
                $ {Number(item.price).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Subtotal</span>
              <p className="font-bold text-gray-800 text-base">
                $ {(Number(item.price) * (item.quantity || 1)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Row: Quantity and Remove Button */}
      <div className="flex justify-between items-center mt-auto">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Qty:</span>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleQuantityChange(item.id, (item.quantity || 1) - 1)
              }
              className="h-8 w-8 p-0 hover:bg-gray-100"
              disabled={(item.quantity || 1) <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="w-12 text-center text-sm font-medium bg-gray-50 h-8 flex items-center justify-center">
              {item.quantity || 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleQuantityChange(item.id, (item.quantity || 1) + 1)
              }
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRemove(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
