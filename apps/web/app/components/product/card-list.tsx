import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Star, Package, Scale } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router";
import { useWeb } from "~/store/zustan";

const CardProductInList = ({ product }: { product: WEB.Product }) => {
  const { addToCart, updateQuantity, keranjangs } = useWeb();
  const [isSelected, setIsSelected] = useState(
    keranjangs.find((k) => k.id === product.id),
  );
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(
    isSelected ? isSelected.quantity : 1,
  );

  useEffect(() => {
    const exist = keranjangs.find((k) => k.id === product.id);
    setIsSelected(exist);
    if (exist) {
      setQuantity(exist.quantity);
    } else {
      setQuantity(0);
    }
  }, [keranjangs]);

  return (
    <div className="bg-white rounded md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative group">
        <NavLink to={"/details/" + product.slug}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-50 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </NavLink>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.category && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>
          )}
          {product.stockQuantity < 10 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Low Stock
            </span>
          )}
        </div>

        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
        >
          <Heart
            size={20}
            className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} transition-colors duration-200`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-6">
        {/* Product Name & Rating */}
        <div className="flex items-start justify-between mb-2">
          <Link
            to={"/details/" + product.slug}
            className="text-sm font-bold text-gray-900 line-clamp-2"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-1 ml-2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        {/* Description */}
        <div
          className="text-gray-600 text-sm mb-4 line-clamp-2 overflow-hidden max-h-[40px]"
          dangerouslySetInnerHTML={{
            __html: product.description.replace(/<img[^>]*>/gi, ""),
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-1 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Package size={14} />
            <span>SKU: {product.sku}</span>
          </div>
          {product.weightGrams && (
            <div className="flex items-center gap-1">
              <Scale size={14} />
              <span>{product.weightGrams}g</span>
            </div>
          )}
        </div>

        {/* Price & Stock */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <p className="text-sm text-gray-500">
              {product.stockQuantity} in stock
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              Min order: {product.minimumOrderQuantity}
            </p>
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={!isSelected}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="px-4 py-2 text-gray-900 font-medium border-x border-gray-300 min-w-[10px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={!isSelected || quantity >= product.stockQuantity}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => addToCart(product)}
            disabled={!product.isActive}
            className="py-0 px-1 cursor-pointer truncate"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500">
            <span>
              Added: {new Date(product.createdAt).toLocaleDateString()}
            </span>
            <span>
              Updated: {new Date(product.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductInList;
