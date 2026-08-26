import React, { useState } from "react";
import { Home, Search, Heart, ShoppingBag, User, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES } from "../data";

interface BottomNavProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (query: string) => void;
  currentPage: string;
  onNavigate: (page: "home" | "explore" | "account" | "about" | "contact" | "faq") => void;
  onExploreClick?: (catId: string) => void;
}

export default function BottomNav({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearch,
  currentPage,
  onNavigate,
  onExploreClick,
}: BottomNavProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    onSearch(searchVal.trim());
    setIsSearchModalOpen(false);
    setSearchVal("");
  };

  const handleCategoryQuickSearch = (catId: string) => {
    setIsSearchModalOpen(false);
    setSearchVal("");
    onExploreClick?.(catId);
  };

  const isHomeActive = currentPage === "home" && !isSearchModalOpen;
  const isAccountActive = currentPage === "account" && !isSearchModalOpen;

  return (
    <>
      {/* Mobile Floating / Docked Bottom Navigation Bar */}
      <nav
        id="mobile-bottom-nav"
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-[120] md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-transform duration-300"
      >
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* 1. Home / Shop */}
          <button
            id="mobile-nav-home"
            onClick={() => {
              setIsSearchModalOpen(false);
              onNavigate("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              isHomeActive
                ? "text-brand-purple font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className="relative">
              <Home className={`h-5 w-5 transition-transform duration-200 ${isHomeActive ? "scale-110" : ""}`} />
              {isHomeActive && (
                <motion.span
                  layoutId="bottomNavDot"
                  className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-brand-purple rounded-full"
                />
              )}
            </div>
            <span className="text-[10.5px] mt-1 tracking-tight">Shop</span>
          </button>

          {/* 2. Search */}
          <button
            id="mobile-nav-search"
            onClick={() => setIsSearchModalOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              isSearchModalOpen
                ? "text-brand-purple font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className="relative">
              <Search className={`h-5 w-5 transition-transform duration-200 ${isSearchModalOpen ? "scale-110" : ""}`} />
            </div>
            <span className="text-[10.5px] mt-1 tracking-tight">Search</span>
          </button>

          {/* 3. Wishlist */}
          <button
            id="mobile-nav-wishlist"
            onClick={() => {
              setIsSearchModalOpen(false);
              onOpenWishlist();
            }}
            className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer text-slate-500 hover:text-slate-900 font-medium relative active:scale-95"
          >
            <div className="relative">
              <Heart className="h-5 w-5 transition-transform duration-200" />
              {wishlistCount > 0 && (
                <div className="absolute -top-1.5 -right-2 flex items-center justify-center">
                  <motion.span
                    key={`mobile-wish-ping-${wishlistCount}`}
                    initial={{ scale: 0.8, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute h-3 w-3 rounded-full bg-rose-500 pointer-events-none"
                  />
                  <motion.span
                    key={`mobile-wish-${wishlistCount}`}
                    initial={{ scale: 0.3 }}
                    animate={{ scale: [0.3, 1.4, 0.95, 1] }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-4 min-w-4 px-1 bg-rose-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs border border-white"
                  >
                    {wishlistCount}
                  </motion.span>
                </div>
              )}
            </div>
            <span className="text-[10.5px] mt-1 tracking-tight">Wishlist</span>
          </button>

          {/* 4. Cart */}
          <button
            id="mobile-nav-cart"
            onClick={() => {
              setIsSearchModalOpen(false);
              onOpenCart();
            }}
            className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer text-slate-500 hover:text-slate-900 font-medium relative active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5 transition-transform duration-200" />
              {cartCount > 0 && (
                <div className="absolute -top-1.5 -right-2.5 flex items-center justify-center">
                  <motion.span
                    key={`mobile-cart-ping-${cartCount}`}
                    initial={{ scale: 0.8, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute h-3.5 w-3.5 rounded-full bg-brand-purple pointer-events-none"
                  />
                  <motion.span
                    key={`mobile-cart-${cartCount}`}
                    initial={{ scale: 0.3 }}
                    animate={{ scale: [0.3, 1.45, 0.95, 1] }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative h-4 min-w-4 px-1 bg-brand-purple text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs border border-white"
                  >
                    {cartCount}
                  </motion.span>
                </div>
              )}
            </div>
            <span className="text-[10.5px] mt-1 tracking-tight">Cart</span>
          </button>

          {/* 5. Account */}
          <button
            id="mobile-nav-account"
            onClick={() => {
              setIsSearchModalOpen(false);
              onNavigate("account");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              isAccountActive
                ? "text-brand-purple font-bold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <div className="relative">
              <User className={`h-5 w-5 transition-transform duration-200 ${isAccountActive ? "scale-110" : ""}`} />
              {isAccountActive && (
                <motion.span
                  layoutId="bottomNavDot"
                  className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-brand-purple rounded-full"
                />
              )}
            </div>
            <span className="text-[10.5px] mt-1 tracking-tight">Account</span>
          </button>

        </div>
      </nav>

      {/* Mobile Search Modal / Bottom Sheet */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[130] md:hidden"
            />

            {/* Slide-up Search Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-x-0 bottom-0 z-[140] bg-white rounded-t-3xl shadow-2xl border-t border-slate-100 p-5 pb-8 md:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Sheet Drag Handle & Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-lg bg-brand-purple-light text-brand-purple flex items-center justify-center">
                    <Search className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-base">Search Store</span>
                </div>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search Form Input */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative flex items-center">
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-20 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                  autoFocus
                />
                <Search className="h-4.5 w-4.5 text-slate-400 absolute left-4 pointer-events-none" />
                
                {searchVal && (
                  <button
                    type="button"
                    onClick={() => setSearchVal("")}
                    className="absolute right-14 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-2 bg-brand-purple text-white px-3 py-2 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-transform"
                >
                  Go
                </button>
              </form>

              {/* Popular Categories Shortcut */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
                  <span>Browse By Category</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCategoryQuickSearch("all")}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-left hover:border-brand-purple/30 hover:bg-brand-purple/5 transition-all group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-brand-purple">All Products</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-purple group-hover:translate-x-0.5 transition-all" />
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryQuickSearch(cat.id)}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-left hover:border-brand-purple/30 hover:bg-brand-purple/5 transition-all group"
                    >
                      <span className="text-xs font-bold text-slate-800 group-hover:text-brand-purple">{cat.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-purple group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
