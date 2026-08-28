import React from "react";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";
import ImageWithFallback from "./ImageWithFallback";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onToggleWishlist,
  onAddToCart,
}: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[150] cursor-pointer"
          />

          {/* Wishlist Panel Drawer (Right side) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col h-full overflow-hidden"
          >
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-rose-500 fill-current" />
                <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
                  Saved Wishlist
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-grow overflow-y-auto p-6">
              {wishlistItems.length > 0 ? (
                <div className="space-y-5">
                  {wishlistItems.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center space-x-4 border-b border-slate-50 pb-5 last:border-b-0 last:pb-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="h-20 w-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={prod.image}
                          alt={prod.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          fallbackText={prod.name}
                        />
                      </div>

                      {/* Product Info & Actions */}
                      <div className="flex-grow">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {prod.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-1 leading-snug">
                          {prod.name}
                        </h3>
                        <span className="text-sm font-extrabold text-brand-purple mt-1 block">
                          ${prod.price}
                        </span>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between mt-3">
                          <button
                            onClick={() => {
                              onAddToCart(prod);
                              onToggleWishlist(prod); // remove from wishlist after cart add
                            }}
                            className="bg-brand-purple/10 hover:bg-brand-purple text-brand-purple hover:text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg flex items-center space-x-1 transition-colors cursor-pointer"
                          >
                            <ShoppingCart className="h-3 w-3" />
                            <span>Add to Cart</span>
                          </button>

                          <button
                            onClick={() => onToggleWishlist(prod)}
                            className="p-2 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center my-12">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <Heart className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs font-medium">
                    Tap the heart icon on any products to save them to your custom wishlist folder!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
