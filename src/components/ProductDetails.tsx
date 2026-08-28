import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Minus, Plus, Star, ShieldCheck, Truck, RotateCcw, ArrowRight, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { Product, ColorOption } from "../types";
import { PRODUCTS, MOCK_REVIEWS } from "../data";
import AnimatedWishlistButton from "./AnimatedWishlistButton";
import AnimatedAddToCartButton from "./AnimatedAddToCartButton";
import ImageWithFallback from "./ImageWithFallback";

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedSize?: string,
    selectedColor?: ColorOption
  ) => void;
  onToggleWishlist: (product: Product) => void;
  isFavorited: boolean;
  onProductClick: (product: Product) => void;
}

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isFavorited,
  onProductClick,
}: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ColorOption | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isShareTooltipVisible, setIsShareTooltipVisible] = useState(false);

  // Sync active states when the product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const handleQtyChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc" && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddSubmit = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleShareClick = () => {
    setIsShareTooltipVisible(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setIsShareTooltipVisible(false);
    }, 2000);
  };

  // Filter 3 related products within the same category (excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="product-details-container">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-semibold">
          <button
            onClick={onBack}
            className="hover:text-brand-purple transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>Home</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="capitalize">{product.category}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 line-clamp-1 max-w-[200px]">{product.name}</span>
        </div>

        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-brand-purple bg-white border border-slate-100 hover:border-brand-purple/20 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Details Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6 sm:p-10 lg:p-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Block: Gallery */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="relative aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
              <ImageWithFallback
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
                fallbackText={product.name}
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md shadow-emerald-500/10 z-10">
                  NEW IN
                </span>
              )}
              {product.isTrending && (
                <span className="absolute top-4 left-4 bg-brand-purple text-white text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md shadow-brand-purple/10 z-10">
                  TRENDING
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-3 mt-6 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-20 rounded-xl overflow-hidden bg-white border-2 flex-shrink-0 transition-all cursor-pointer ${
                      activeImage === img
                        ? "border-brand-purple scale-95 shadow-md shadow-brand-purple/5"
                        : "border-slate-100 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} gallery image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      fallbackText={`Thumb ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Block: Configuration Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md">
                  {product.category}
                </span>

                <div className="flex items-center space-x-2">
                  {/* Share button */}
                  <div className="relative">
                    <button
                      onClick={handleShareClick}
                      className="p-2 rounded-xl border border-slate-100 hover:border-slate-200 text-slate-400 hover:text-slate-600 cursor-pointer transition-all bg-white"
                      title="Copy link to clipboard"
                    >
                      <Share2 className="h-4.5 w-4.5" />
                    </button>
                    {isShareTooltipVisible && (
                      <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-md">
                        Link copied!
                      </span>
                    )}
                  </div>

                  {/* Wishlist toggle */}
                  <AnimatedWishlistButton
                    id={`details-wishlist-${product.id}`}
                    isFavorited={isFavorited}
                    onToggle={() => onToggleWishlist(product)}
                    showLabel={true}
                    labelActive="Saved"
                    labelInactive="Save to Wishlist"
                    size="sm"
                    className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all border ${
                      isFavorited
                        ? "bg-rose-50 border-rose-100 text-rose-500"
                        : "bg-white border-slate-100 hover:border-slate-200 text-slate-500 hover:text-brand-purple"
                    }`}
                  />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Verified Ratings */}
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4.5 w-4.5 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500 font-semibold">
                  {product.reviewCount} verified buyer reviews
                </span>
              </div>

              {/* Premium Pricing Panel */}
              <div className="flex items-baseline space-x-4 mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                <span className="text-3xl font-black text-brand-purple">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 font-bold line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    SAVE ${product.originalPrice - product.price} (
                    {Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    )}
                    %)
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5">
                  Overview:
                </h3>
                <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
                  {product.description}
                </p>
              </div>

              {/* Options selectors */}
              <div className="space-y-6 border-t border-slate-100 pt-6 mb-8">
                
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                      Selected Color: <span className="text-slate-800 lowercase">{selectedColor?.name}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`h-10 w-10 rounded-full border-2 flex items-center justify-center shadow-sm cursor-pointer transition-all ${
                            selectedColor?.name === color.name
                              ? "border-brand-purple scale-110 ring-4 ring-brand-purple/10"
                              : "border-slate-200 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor?.name === color.name && (
                            <Check
                              className={`h-5 w-5 ${
                                color.hex === "#ffffff" ? "text-slate-900" : "text-white"
                              }`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                      Selected Size: <span className="text-slate-800">{selectedSize}</span>
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`h-11 min-w-[3rem] px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
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

              {/* Key Features block */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    Product Features:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock constraints */}
              <div className="flex items-center space-x-2 mb-8">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    product.stock <= 8 ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                  }`}
                />
                <span className="text-xs font-bold text-slate-600">
                  {product.stock <= 8
                    ? `Limited availability: Only ${product.stock} items left in stock!`
                    : "In Stock & ready for overnight delivery"}
                </span>
              </div>
            </div>

            {/* Shopping Controls Area */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 bg-slate-50/50 rounded-xl p-1 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => handleQtyChange("dec")}
                    className="h-10 w-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-black text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange("inc")}
                    className="h-10 w-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add To Cart Button */}
                <div className="w-full sm:flex-grow">
                  <AnimatedAddToCartButton
                    id={`details-add-${product.id}`}
                    variant="full"
                    label="ADD TO SHOPPING CART"
                    successLabel="ADDED TO CART!"
                    onAdd={handleAddSubmit}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Quick confidence guarantees */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-center text-[10px] sm:text-xs text-slate-500 font-bold">
                <div className="flex flex-col items-center space-y-1.5">
                  <Truck className="h-5 w-5 text-brand-purple" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <RotateCcw className="h-5 w-5 text-brand-purple" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <ShieldCheck className="h-5 w-5 text-brand-purple" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Verified Customer Reviews Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 mb-12 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Customer Reviews
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {product.rating.toFixed(1)} out of 5
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-xl">
              <Check className="h-3.5 w-3.5 mr-1" />
              100% Verified Purchases
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3.5">
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-white flex-shrink-0">
                    <ImageWithFallback
                      src={rev.avatar}
                      alt={rev.userName}
                      className="h-full w-full object-cover"
                      fallbackText={rev.userName}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {rev.userName}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {rev.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-2.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center text-[11px] font-semibold text-emerald-600">
                <Check className="h-3 w-3 mr-1" /> Verified Buyer
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div id="related-products-section">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Recommended For You
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
                Customers who viewed this item also loved these selections:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => {
              const saved = false; // We don't have wishlist array check here but we can delegate clicks.
              return (
                <div
                  key={p.id}
                  onClick={() => onProductClick(p)}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="bg-slate-50 aspect-square relative flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      fallbackText={p.name}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      {p.category}
                    </span>
                    <h4 className="text-[15px] font-bold text-slate-800 group-hover:text-brand-purple transition-colors mb-2 line-clamp-1">
                      {p.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-brand-purple text-lg">
                        ${p.price}
                      </span>
                      <span className="text-[12px] text-slate-500 font-bold flex items-center">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-1" />
                        {p.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
