import { useState } from "react";
import { Button } from "../components/ui/button";
import { useWeb } from "~/store/zustan";
import OptionButton from "./option-button";
import ColorOption from "./variants/color";
import { StartOrder } from "./button-start-order";

// Define the Bubble interface for type safety
interface Bubble {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  // Optional properties for animation state
  progress?: number;
  isComplete?: boolean;
}

type Props = {
  product: WEB.Product;
};

const ProductVariations = ({ product }: Props) => {
  const { addToCart, set } = useWeb();
  const [selectedColor, setSelectedColor] = useState("Gray");
  const [selectedRam, setSelectedRam] = useState("16g");
  const [selectedStorage, setSelectedStorage] = useState("1TB");
  const [selectedPlug, setSelectedPlug] = useState("UK");

  const colors = [
    { name: "Gray", value: "bg-gray-600", selected: true },
    { name: "Gold", value: "bg-yellow-600" },
    { name: "Black", value: "bg-black" },
    { name: "Purple", value: "bg-purple-700" },
    { name: "Pink", value: "bg-pink-300" },
    { name: "Green", value: "bg-green-400" },
  ];

  const ramOptions = ["16g"];
  const storageOptions = ["1TB"];
  const plugOptions = ["UK", "AU", "US", "EU"];
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const handleAddToCart = () => {
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const cartIcon = document.getElementById("cart");

    if (addToCartBtn && cartIcon) {
      const btnRect = addToCartBtn.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      // Generate unique ID for bubble
      const bubbleId = Date.now();

      // Create new bubble
      const newBubble = {
        id: bubbleId,
        startX: btnRect.left + btnRect.width / 2,
        startY: btnRect.top + btnRect.height / 2,
        endX: cartRect.left + cartRect.width / 2,
        endY: cartRect.top + cartRect.height / 2,
      };

      setBubbles((prev) => [...prev, newBubble]);

      // Remove bubble after animation
      setTimeout(() => {
        setBubbles((prev) => prev.filter((bubble) => bubble.id !== bubbleId));
        addToCart(product);
      }, 800);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      {/* Bubbles Container */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute w-8 h-8 bg-orange-500 rounded-full opacity-80 shadow-lg"
            style={
              {
                left: bubble.startX - 16,
                top: bubble.startY - 16,
                animation: `flyToCart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                "--end-x": `${bubble.endX - bubble.startX}px`,
                "--end-y": `${bubble.endY - bubble.startY}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900">Variations</h2>
        <button className="text-sm text-gray-600 underline hover:text-gray-900">
          Select now
        </button>
      </div>

      {/* Color Selection */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-900">
            color(7):{" "}
          </span>
          <span className="text-sm text-gray-600">{selectedColor}</span>
        </div>
        <div className="flex gap-3">
          {colors.map((color, index) => (
            <ColorOption
              key={index}
              color={color}
              isSelected={selectedColor === color.name}
              onClick={() => setSelectedColor(color.name)}
            />
          ))}
        </div>
      </div>

      {/* RAM Selection */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-900">ram(1): </span>
          <span className="text-sm text-gray-600">{selectedRam}</span>
        </div>
        <div className="flex gap-2">
          {ramOptions.map((ram, index) => (
            <OptionButton
              key={index}
              option={ram}
              isSelected={selectedRam === ram}
              onClick={() => setSelectedRam(ram)}
            />
          ))}
        </div>
      </div>

      {/* Storage Selection */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-900">
            storage capacity(1):{" "}
          </span>
          <span className="text-sm text-gray-600">{selectedStorage}</span>
        </div>
        <div className="flex gap-2">
          {storageOptions.map((storage, index) => (
            <OptionButton
              key={index}
              option={storage}
              isSelected={selectedStorage === storage}
              onClick={() => setSelectedStorage(storage)}
            />
          ))}
        </div>
      </div>

      {/* Plug Selection */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-900">plug(4)</span>
        </div>
        <div className="flex gap-2">
          {plugOptions.map((plug, index) => (
            <OptionButton
              key={index}
              option={plug}
              isSelected={selectedPlug === plug}
              onClick={() => setSelectedPlug(plug)}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <StartOrder product={product} />
        <Button
          id="add-to-cart-btn"
          onClick={handleAddToCart}
          variant="outline"
          className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all"
        >
          Add to cart
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-full hover:border-gray-400"
        >
          Chat now
        </Button>
      </div>

      {/* Selection Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Current Selection:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            Color: <span className="font-medium">{selectedColor}</span>
          </div>
          <div>
            RAM: <span className="font-medium">{selectedRam}</span>
          </div>
          <div>
            Storage: <span className="font-medium">{selectedStorage}</span>
          </div>
          <div>
            Plug: <span className="font-medium">{selectedPlug}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariations;
