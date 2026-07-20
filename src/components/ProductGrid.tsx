import React, { useState, useMemo } from "react";
import { Star, ShoppingCart, Heart, Search, Filter, X, Check, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS, CATEGORIES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSimplified?: boolean;
  onExploreAllClick?: () => void;
}

export default function ProductGrid({
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  isSimplified = false,
  onExploreAllClick,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (isSimplified) {
      // Return 8 featured/popular/new items for home page
      return result.filter(p => p.isTrending || p.isNew || p.rating >= 4.5).slice(0, 8);
    }

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [isSimplified, activeCategory, searchQuery, sortBy]);

  return (
    <section id="products-catalog" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Explore Our Products
          </h2>
          <p className="text-[14px] text-slate-400 mt-2 font-medium">
            Discover our curated selections across categories, designed to bring beauty and technology together.
          </p>
        </div>

        {/* Filter Controls Bar */}
        {!isSimplified && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-10 flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Categories Tab Selector - Hidden on mobile/tablet, shown on desktop */}
            <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeCategory === "all"
                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                All Products
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-[14px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Categories Mobile Filter Selector - Trigger button on mobile/tablet */}
            <div className="md:hidden flex flex-col gap-3 w-full">
              <button
                onClick={() => setIsFilterDialogOpen(true)}
                className="w-full flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/50 rounded-xl px-4 py-3 text-slate-700 text-[14px] font-semibold cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <Filter className="h-4.5 w-4.5 text-brand-purple" />
                  <span className="text-slate-500">Category:</span>
                  <span className="text-slate-900 font-bold capitalize">
                    {activeCategory === "all" ? "All Products" : CATEGORIES.find(c => c.id === activeCategory)?.name || activeCategory}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-bold bg-white border border-slate-150 px-2.5 py-1 rounded-lg">
                  Choose
                </span>
              </button>
            </div>

            {/* Search and Sort Sub-block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              
              {/* Search Input */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-[14px] text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
              </div>

              {/* Sorting Select */}
              <div className="relative flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-medium text-slate-700 focus:outline-none focus:border-brand-purple cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <Filter className="h-4 w-4" />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {filteredProducts.map((prod) => {
                const isFavorited = wishlistIds.includes(prod.id);
                return (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col relative"
                  >
                    {/* Top badging & Wishlist button */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      {/* Left Badge */}
                      <div className="flex flex-col space-y-1">
                        {prod.isNew && (
                          <span className="bg-brand-purple text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider">
                            New
                          </span>
                        )}
                        {prod.isTrending && (
                          <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider">
                            Trending
                          </span>
                        )}
                      </div>
                      
                      {/* Save Button */}
                      <button
                        onClick={() => onToggleWishlist(prod)}
                        className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                          isFavorited
                            ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
                            : "bg-white/85 text-slate-400 hover:text-brand-purple hover:bg-white"
                        }`}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>

                    {/* Image Section */}
                    <div
                      onClick={() => onProductClick(prod)}
                      className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer relative"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Quick view overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Meta Section */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Category Label */}
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                          {prod.category}
                        </span>
                        
                        {/* Title */}
                        <h3
                          onClick={() => onProductClick(prod)}
                          className="text-[15px] font-bold text-slate-800 leading-snug mt-1 hover:text-brand-purple cursor-pointer line-clamp-1 transition-colors"
                        >
                          {prod.name}
                        </h3>

                        {/* Stars rating */}
                        <div className="flex items-center space-x-1 mt-2.5">
                          <div className="flex items-center text-amber-400">
                            <Star className="h-3.5 w-3.5 fill-current" />
                          </div>
                          <span className="text-[12px] font-bold text-slate-700">
                            {prod.rating.toFixed(1)}
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold">
                            ({prod.reviewCount} Reviews)
                          </span>
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-4">
                        <div className="flex flex-col">
                          {prod.originalPrice && (
                            <span className="text-xs text-slate-400 line-through leading-none mb-1">
                              ${prod.originalPrice}
                            </span>
                          )}
                          <span className="text-lg font-extrabold text-brand-purple leading-none">
                            ${prod.price}
                          </span>
                        </div>

                        {/* Quick Add To Cart */}
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="bg-brand-purple hover:bg-brand-purple-dark text-white p-3 rounded-xl shadow-md shadow-brand-purple/10 hover:shadow-brand-purple/20 transition-all cursor-pointer"
                          title="Quick Add to Cart"
                        >
                          <ShoppingCart className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm max-w-md mx-auto"
            >
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">No products found</h3>
              <p className="text-[13px] text-slate-400 mt-2 font-medium">
                We couldn't find any products matching your current search or category filters. Try clearing some options!
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md mt-6 cursor-pointer"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {isSimplified && (
          <div className="flex justify-center mt-12 sm:mt-16">
            <button
              onClick={onExploreAllClick}
              className="group inline-flex items-center space-x-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-black text-sm px-8 py-4 rounded-2xl shadow-lg shadow-brand-purple/10 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Our Catalog</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>

      {/* Mobile Categories Filter Drawer / Dialog */}
      <AnimatePresence>
        {isFilterDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDialogOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[180] md:hidden"
            />

            {/* Bottom Sheet Dialog */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl z-[190] md:hidden flex flex-col overflow-hidden border-t border-slate-100"
            >
              {/* Drag indicator bar */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
              </div>

              {/* Title Header */}
              <div className="px-6 pb-4 pt-1 flex items-center justify-between border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Filter Categories</h3>
                  <p className="text-xs text-slate-400 font-medium">Select a category to view items</p>
                </div>
                <button
                  onClick={() => setIsFilterDialogOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categories list/grid content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-3">
                {/* All products button */}
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setIsFilterDialogOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-brand-purple/10 border-brand-purple text-brand-purple"
                      : "bg-slate-50 hover:bg-slate-100/50 border-transparent text-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-xs ${
                      activeCategory === "all" ? "bg-brand-purple text-white" : "bg-white text-slate-400 border border-slate-200"
                    }`}>
                      ALL
                    </div>
                    <div>
                      <span className="text-[14px] font-extrabold block">All Products</span>
                      <span className="text-[11px] font-semibold text-slate-400">View everything in stock</span>
                    </div>
                  </div>
                  {activeCategory === "all" ? (
                    <div className="h-5 w-5 rounded-full bg-brand-purple flex items-center justify-center text-white">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>

                {/* Specific categories */}
                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setIsFilterDialogOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? "bg-brand-purple/10 border-brand-purple text-brand-purple"
                          : "bg-slate-50 hover:bg-slate-100/50 border-transparent text-slate-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="h-11 w-11 rounded-xl overflow-hidden bg-white border border-slate-100 relative flex items-center justify-center">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="text-[14px] font-extrabold block">{cat.name}</span>
                          <span className="text-[11px] font-semibold text-slate-400">{cat.count} curated items</span>
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="h-5 w-5 rounded-full bg-brand-purple flex items-center justify-center text-white">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
