import React, { useState, useEffect } from "react";
import { X, Star, Minus, Plus, Check } from "lucide-react";
import { Product, ColorOption } from "../types";
import { MOCK_REVIEWS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import AnimatedWishlistButton from "./AnimatedWishlistButton";
import AnimatedAddToCartButton from "./AnimatedAddToCartButton";
import ImageWithFallback from "./ImageWithFallback";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: ColorOption) => void;
  onToggleWishlist: (product: Product) => void;
  isFavorited: boolean;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isFavorited,
}: ProductModalProps) {
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState<ColorOption | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  // Initialize selections when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleQtyChange = (type: "inc" | "dec") => {
    if (type === "dec") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
    }
  };

  const handleAddSubmit = () => {
    onAddToCart(product, quantity, selectedSize || undefined, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[170] overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Panel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="md:w-1/2 p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-between">
            <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-slate-100">
              <ImageWithFallback
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
                fallbackText={product.name}
              />
            </div>

            {/* Thumbnails list */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-3.5 mt-5 overflow-x-auto pb-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-white border-2 flex-shrink-0 transition-all cursor-pointer ${
                      (activeImage || product.image) === imgUrl ? "border-brand-purple scale-95 shadow-md" : "border-slate-100 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <ImageWithFallback
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      fallbackText={`Thumb ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Meta Info Form */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] md:max-h-[600px] overflow-y-auto">
            <div>
              {/* Category, Badges, Save button */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                  {product.category}
                </span>
                
                <AnimatedWishlistButton
                  id={`modal-wishlist-${product.id}`}
                  isFavorited={isFavorited}
                  onToggle={() => onToggleWishlist(product)}
                  showLabel={true}
                  labelActive="Saved"
                  labelInactive="Save"
                  size="sm"
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all border ${
                    isFavorited
                      ? "bg-rose-50 border-rose-100 text-rose-500"
                      : "bg-slate-50 border-slate-100 text-slate-600 hover:text-brand-purple"
                  }`}
                />
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                {product.name}
              </h2>

              {/* Ratings and reviews summary */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-[13px] font-bold text-slate-700">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[12px] text-slate-400 font-semibold">
                  ({product.reviewCount} Reviews verified)
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline space-x-3.5 mb-5 bg-slate-50/70 p-3 rounded-2xl border border-slate-50">
                <span className="text-2xl font-black text-brand-purple">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-[14px] text-slate-400 font-bold line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[13.5px] leading-relaxed text-slate-500 mb-6 font-medium">
                {product.description}
              </p>

              {/* Customizing Options */}
              <div className="space-y-5 border-t border-slate-100 pt-5 mb-5">
                
                {/* Colors Selector (Swatches) */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="block text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                      Select Color: {selectedColor?.name}
                    </span>
                    <div className="flex items-center space-x-2.5">
                      {product.colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col)}
                          className={`h-9 w-9 rounded-full border-2 flex items-center justify-center shadow-sm cursor-pointer transition-transform ${
                            selectedColor?.name === col.name ? "border-brand-purple scale-110" : "border-slate-200 hover:scale-105"
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {selectedColor?.name === col.name && (
                            <Check className={`h-4.5 w-4.5 ${col.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <span className="block text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                      Select Size: {selectedSize}
                    </span>
                    <div className="flex items-center space-x-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`h-10 px-4 rounded-xl text-[13px] font-bold border cursor-pointer transition-all ${
                            selectedSize === sz
                              ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/10"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <span className="block text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                    Key Features:
                  </span>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600 font-medium">
                        <Check className="h-3.5 w-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <span className={`h-2 w-2 rounded-full ${product.stock <= 8 ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
                <span className="text-xs font-bold text-slate-600">
                  {product.stock <= 8 ? `Only ${product.stock} left in stock - order soon!` : "In stock & ready to ship"}
                </span>
              </div>
            </div>

            {/* Action Row: Qty & Add Button */}
            <div className="flex items-center space-x-4 border-t border-slate-100 pt-5 mt-5">
              
              {/* Quantity selectors */}
              <div className="flex items-center border border-slate-200 bg-slate-50/50 rounded-xl p-1">
                <button
                  onClick={() => handleQtyChange("dec")}
                  className="h-9 w-9 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQtyChange("inc")}
                  className="h-9 w-9 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Submit Add to Cart */}
              <div className="flex-grow">
                <AnimatedAddToCartButton
                  id={`modal-add-${product.id}`}
                  variant="full"
                  label="ADD TO CART"
                  successLabel="ADDED TO CART!"
                  onAdd={handleAddSubmit}
                  className="h-11"
                />
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
