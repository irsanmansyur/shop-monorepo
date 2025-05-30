"use client";
import React from "react";

const CardProduct: React.FC<{ product: WEB.Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-5">
          {product.name}
        </h3>

        {/* Price Range */}
        <div className="text-lg font-semibold text-gray-900 mb-2">
          {product.price}
        </div>

        {/* MOQ and Duration */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{product.weightGrams} Gram</span>
          <span className="text-xs">{product.stockQuantity}</span>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-2">
          {product.tags.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-8 h-8 rounded-full"
            >
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                {badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
