import React, { useState, useMemo, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Search,
  Filter,
  X,
  Check,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  Truck,
  Package,
  Sparkles
} from "lucide-react";
import { Product } from "../types";
import { PRODUCTS, CATEGORIES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface ExplorePageProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ExplorePage({
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: ExplorePageProps) {
  // Sorting & View States
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Advanced Filter States
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  // Mobile drawer state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Reset local state if active category changes from external (e.g. Header)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  // Handle Preset Price Filter
  const handlePricePreset = (min: number | null, max: number | null) => {
    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
    setTempMinPrice(min !== null ? min.toString() : "");
    setTempMaxPrice(max !== null ? max.toString() : "");
  };

  // Apply custom Min/Max price typed by user
  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = tempMinPrice === "" ? null : parseFloat(tempMinPrice);
    const max = tempMaxPrice === "" ? null : parseFloat(tempMaxPrice);
    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
  };

  // Clear all filters action
  const handleClearAllFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setAppliedMinPrice(null);
    setAppliedMaxPrice(null);
    setTempMinPrice("");
    setTempMaxPrice("");
    setSelectedRating(null);
    setInStockOnly(false);
    setFreeShippingOnly(false);
    setSortBy("featured");
  };

  // Core Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3. Price Filter
    if (appliedMinPrice !== null) {
      result = result.filter((p) => p.price >= appliedMinPrice);
    }
    if (appliedMaxPrice !== null) {
      result = result.filter((p) => p.price <= appliedMaxPrice);
    }

    // 4. Rating Filter
    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // 5. In Stock Filter
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // 6. Free Shipping Filter (Assuming products with price > 100 or specific categories have free shipping)
    if (freeShippingOnly) {
      result = result.filter((p) => p.price >= 80); // Treat $80+ as free shipping
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [
    activeCategory,
    searchQuery,
    appliedMinPrice,
    appliedMaxPrice,
    selectedRating,
    inStockOnly,
    freeShippingOnly,
    sortBy,
  ]);

  // Is any custom filter currently active?
  const isAnyFilterActive = useMemo(() => {
    return (
      activeCategory !== "all" ||
      searchQuery.trim() !== "" ||
      appliedMinPrice !== null ||
      appliedMaxPrice !== null ||
      selectedRating !== null ||
      inStockOnly ||
      freeShippingOnly
    );
  }, [
    activeCategory,
    searchQuery,
    appliedMinPrice,
    appliedMaxPrice,
    selectedRating,
    inStockOnly,
    freeShippingOnly,
  ]);

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 px-4 sm:px-6 lg:px-8" id="explore-page-root">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumbs & Summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-semibold mb-2">
              <span className="text-slate-400">ShopZone</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400">Shop</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold capitalize">
                {activeCategory === "all" ? "All Collections" : activeCategory}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Shop
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Showing <span className="text-slate-800 font-bold">{filteredProducts.length}</span> premium products matching your filters
            </p>
          </div>

          {/* Quick Stats Banner (Alibaba style) */}
          <div className="hidden lg:flex items-center space-x-6 bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-xs">
            <div className="flex items-center space-x-3 border-r border-slate-100 pr-6">
              <div className="h-10 w-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase">Total Items</span>
                <span className="block text-sm font-black text-slate-800">{PRODUCTS.length} products</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase">Shipping Guarantee</span>
                <span className="block text-sm font-black text-slate-800">Fast Express </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar Block (High accessibility header) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Main search field */}
          <div className="relative w-full md:max-w-xl flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by brand, keyword, specs or category..."
              className="w-full bg-slate-50/70 border border-slate-200/80 rounded-2xl pl-12 pr-10 py-3 text-[14.5px] text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sorter and display view mode toggler */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-2xl text-[14px] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-4.5 w-4.5" />
              <span>Filters</span>
              {isAnyFilterActive && (
                <span className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
              )}
            </button>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400 font-bold uppercase hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200/80 rounded-2xl pl-4 pr-10 py-3 text-[13.5px] font-bold text-slate-700 focus:outline-none focus:border-brand-purple cursor-pointer hover:bg-slate-100/50 transition-colors"
                >
                  <option value="featured">Featured Selections</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>

              {/* View layout selectors */}
              <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg cursor-pointer transition-all ${
                    viewMode === "grid"
                      ? "bg-slate-100 text-brand-purple"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg cursor-pointer transition-all ${
                    viewMode === "list"
                      ? "bg-slate-100 text-brand-purple"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title="List View"
                >
                  <List className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Core Layout Grid: Left Sidebar & Right Grid Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="explore-layout-grid">
          
          {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6" id="explore-desktop-sidebar">
            
            {/* Header / Clear Block */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-extrabold text-slate-800 flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4 text-brand-purple" />
                  <span>Interactive Filters</span>
                </span>
                {isAnyFilterActive && (
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center space-x-1 cursor-pointer transition-all"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              {/* Active badges */}
              {isAnyFilterActive ? (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {activeCategory !== "all" && (
                    <span className="inline-flex items-center space-x-1 bg-brand-purple/10 text-brand-purple font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      <span className="capitalize">{activeCategory}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setActiveCategory("all")} />
                    </span>
                  )}
                  {(appliedMinPrice !== null || appliedMaxPrice !== null) && (
                    <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-600 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      <span>
                        ${appliedMinPrice || 0} - ${appliedMaxPrice || "∞"}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          setAppliedMinPrice(null);
                          setAppliedMaxPrice(null);
                          setTempMinPrice("");
                          setTempMaxPrice("");
                        }}
                      />
                    </span>
                  )}
                  {selectedRating !== null && (
                    <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-600 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      <span>{selectedRating}+ Stars</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRating(null)} />
                    </span>
                  )}
                  {inStockOnly && (
                    <span className="inline-flex items-center space-x-1 bg-blue-50 text-blue-600 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      <span>In Stock</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
                    </span>
                  )}
                  {freeShippingOnly && (
                    <span className="inline-flex items-center space-x-1 bg-sky-50 text-sky-600 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      <span>Free Shipping</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setFreeShippingOnly(false)} />
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">
                  No filter overlays applied yet
                </p>
              )}
            </div>

            {/* Categories Selection */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-brand-purple/10 text-brand-purple"
                      : "text-slate-600 hover:text-brand-purple hover:bg-slate-50"
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">
                    {PRODUCTS.length}
                  </span>
                </button>

                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-purple/10 text-brand-purple"
                          : "text-slate-600 hover:text-brand-purple hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? "bg-brand-purple/20 text-brand-purple" : "bg-slate-100 text-slate-400"
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Column */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Price Limits ($)
              </h3>
              
              {/* Presets List */}
              <div className="space-y-2 mb-5">
                {[
                  { label: "Under $50", min: null, max: 50 },
                  { label: "$50 to $100", min: 50, max: 100 },
                  { label: "$100 to $200", min: 100, max: 200 },
                  { label: "$200 & Above", min: 200, max: null },
                ].map((preset, idx) => {
                  const isSelected =
                    appliedMinPrice === preset.min && appliedMaxPrice === preset.max;
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePricePreset(preset.min, preset.max)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100/75"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Min/Max Input Form */}
              <form onSubmit={handleApplyCustomPrice} className="space-y-3 pt-3 border-t border-slate-100">
                <span className="block text-[11px] text-slate-400 font-bold uppercase mb-1">
                  Custom Range:
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={tempMinPrice}
                    onChange={(e) => setTempMinPrice(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-brand-purple"
                  />
                  <span className="text-slate-300 text-xs">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={tempMaxPrice}
                    onChange={(e) => setTempMaxPrice(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] py-2 rounded-xl tracking-widest cursor-pointer transition-all"
                >
                  APPLY RANGE
                </button>
              </form>
            </div>

            {/* Customer Rating stars list */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5].map((rating) => {
                  const isSelected = selectedRating === rating;
                  return (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(isSelected ? null : rating)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-50 border-amber-300 text-amber-700"
                          : "bg-transparent border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(rating) ? "fill-amber-400" : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold">{rating.toFixed(1)} & up</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability Checks */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Service & Status
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple h-4 w-4"
                  />
                  <span>Exclude Out of Stock</span>
                </label>

                <label className="flex items-center space-x-3 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeShippingOnly}
                    onChange={(e) => setFreeShippingOnly(e.target.checked)}
                    className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple h-4 w-4"
                  />
                  <span>Free Worldwide Shipping</span>
                </label>
              </div>
            </div>

          </aside>

          {/* ================= RIGHT MAIN PRODUCTS CONTAINER ================= */}
          <main className="lg:col-span-9" id="explore-right-container">
            
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
                      : "space-y-6"
                  }
                >
                  {filteredProducts.map((prod) => {
                    const isFavorited = wishlistIds.includes(prod.id);
                    
                    if (viewMode === "grid") {
                      // GRID CARD LAYOUT
                      return (
                        <motion.div
                          key={prod.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 flex flex-col relative"
                        >
                          {/* Badges / Wishlist */}
                          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                            <div className="flex flex-col space-y-1">
                              {prod.isNew && (
                                <span className="bg-brand-purple text-white text-[9px] font-extrabold uppercase px-2 py-1 rounded-md tracking-wider">
                                  New
                                </span>
                              )}
                              {prod.isTrending && (
                                <span className="bg-amber-500 text-white text-[9px] font-extrabold uppercase px-2 py-1 rounded-md tracking-wider">
                                  Popular
                                </span>
                              )}
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWishlist(prod);
                              }}
                              className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                                isFavorited
                                  ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
                                  : "bg-white/90 text-slate-400 hover:text-rose-500"
                              }`}
                            >
                              <Heart className={`h-4.5 w-4.5 ${isFavorited ? "fill-current" : ""}`} />
                            </button>
                          </div>

                          {/* Image Box */}
                          <div
                            onClick={() => onProductClick(prod)}
                            className="aspect-square bg-slate-50 flex items-center justify-center cursor-pointer overflow-hidden relative"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {prod.stock <= 5 && (
                              <div className="absolute bottom-2 inset-x-2 bg-amber-500/95 text-white text-[10px] font-black tracking-widest uppercase py-1 text-center rounded-lg z-10">
                                Only {prod.stock} Left!
                              </div>
                            )}
                          </div>

                          {/* Contents */}
                          <div className="p-5 flex-grow flex flex-col justify-between">
                            <div onClick={() => onProductClick(prod)} className="cursor-pointer">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                {prod.category}
                              </span>
                              <h3 className="text-[15px] font-bold text-slate-800 group-hover:text-brand-purple transition-colors mt-1 mb-2 line-clamp-1">
                                {prod.name}
                              </h3>
                              
                              {/* Star Rating */}
                              <div className="flex items-center space-x-1.5 mb-3">
                                <div className="flex items-center text-amber-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(prod.rating)
                                          ? "fill-amber-400"
                                          : "text-slate-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-bold text-slate-600">
                                  {prod.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>

                            {/* Price / Add to cart */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                              <div className="flex flex-col">
                                {prod.originalPrice && (
                                  <span className="text-[11px] text-slate-400 line-through font-semibold leading-tight">
                                    ${prod.originalPrice}
                                  </span>
                                )}
                                <span className="text-lg font-extrabold text-brand-purple">
                                  ${prod.price}
                                </span>
                              </div>

                              <button
                                onClick={() => onAddToCart(prod)}
                                className="h-9.5 w-9.5 bg-slate-50 hover:bg-brand-purple hover:text-white border border-slate-100 hover:border-transparent text-slate-600 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                                title="Add to Cart"
                              >
                                <ShoppingCart className="h-4.5 w-4.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    } else {
                      // LIST CARD LAYOUT (Daraz/Alibaba style lists)
                      return (
                        <motion.div
                          key={prod.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row p-4 gap-6"
                        >
                          {/* Image Box */}
                          <div
                            onClick={() => onProductClick(prod)}
                            className="h-48 w-full sm:w-48 bg-slate-50 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 relative"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {prod.isNew && (
                              <span className="absolute top-2.5 left-2.5 bg-brand-purple text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded z-10">
                                New
                              </span>
                            )}
                          </div>

                          {/* Info Column */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                  {prod.category}
                                </span>
                                <button
                                  onClick={() => onToggleWishlist(prod)}
                                  className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                                    isFavorited
                                      ? "bg-rose-50 border-rose-100 text-rose-500"
                                      : "bg-transparent border-slate-100 text-slate-400 hover:text-rose-500"
                                  }`}
                                >
                                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                                </button>
                              </div>

                              <h3
                                onClick={() => onProductClick(prod)}
                                className="text-lg font-extrabold text-slate-800 hover:text-brand-purple transition-colors mt-1.5 cursor-pointer"
                              >
                                {prod.name}
                              </h3>

                              {/* Ratings */}
                              <div className="flex items-center space-x-1.5 mt-1 mb-3">
                                <div className="flex items-center text-amber-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(prod.rating)
                                          ? "fill-amber-400"
                                          : "text-slate-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-bold text-slate-600">
                                  {prod.rating.toFixed(1)}
                                </span>
                              </div>

                              <p className="text-xs text-slate-500 font-medium line-clamp-2 max-w-xl">
                                {prod.description}
                              </p>
                            </div>

                            {/* Price / Purchase row */}
                            <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-4">
                              <div className="flex items-baseline space-x-2.5">
                                <span className="text-xl font-black text-brand-purple">${prod.price}</span>
                                {prod.originalPrice && (
                                  <span className="text-xs text-slate-400 line-through font-bold">
                                    ${prod.originalPrice}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => onAddToCart(prod)}
                                className="bg-slate-900 hover:bg-brand-purple text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-2 cursor-pointer transition-all shadow-sm shadow-slate-900/10"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                <span>ADD TO CART</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center"
                >
                  <SlidersHorizontal className="h-12 w-12 text-slate-300 mb-4 animate-pulse" />
                  <h3 className="text-lg font-black text-slate-800">No Matching Products</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-sm mt-2 leading-relaxed">
                    We couldn't find any products matching your specific combination of filters. Try clearing your constraints and restarting your search!
                  </p>
                  <button
                    onClick={handleClearAllFilters}
                    className="mt-6 bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold text-xs tracking-widest px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all"
                  >
                    RESET ALL FILTERS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </main>
        </div>
      </div>

      {/* ================= MOBILE FILTERS DRAWER (Bottom Sheet) ================= */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[180] lg:hidden"
            />

            {/* Bottom Sheet filter drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl z-[190] lg:hidden flex flex-col overflow-hidden border-t border-slate-100"
            >
              {/* Drag bar */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
              </div>

              {/* Title Header */}
              <div className="px-6 pb-4 pt-1 flex items-center justify-between border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Advanced Filters</h3>
                  <p className="text-xs text-slate-400 font-medium">Refine your product search</p>
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable controls */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* Categories */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                    Category Selection
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-center transition-all ${
                        activeCategory === "all"
                          ? "bg-brand-purple/10 border-brand-purple text-brand-purple"
                          : "bg-slate-50 border-transparent text-slate-600"
                      }`}
                    >
                      All Products
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-center transition-all truncate ${
                          activeCategory === cat.id
                            ? "bg-brand-purple/10 border-brand-purple text-brand-purple"
                            : "bg-slate-50 border-transparent text-slate-600"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price presets & custom limits */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                    Price Range ($)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: "Under $50", min: null, max: 50 },
                      { label: "$50 to $100", min: 50, max: 100 },
                      { label: "$100 to $200", min: 100, max: 200 },
                      { label: "$200 & Above", min: 200, max: null },
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePricePreset(preset.min, preset.max)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          appliedMinPrice === preset.min && appliedMaxPrice === preset.max
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                            : "bg-slate-50 border-transparent text-slate-600"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700"
                    />
                    <span className="text-slate-300">-</span>
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                {/* Ratings */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                    Customer Ratings
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[4.5, 4.0, 3.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className={`px-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          selectedRating === rating
                            ? "bg-amber-50 border-amber-300 text-amber-700"
                            : "bg-slate-50 border-transparent text-slate-600"
                        }`}
                      >
                        {rating.toFixed(1)}+ Stars
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service conditions */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                    Service Preferences
                  </h4>
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center space-x-3 text-xs font-bold text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple h-4 w-4"
                      />
                      <span>In Stock Only</span>
                    </label>

                    <label className="flex items-center space-x-3 text-xs font-bold text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={freeShippingOnly}
                        onChange={(e) => setFreeShippingOnly(e.target.checked)}
                        className="rounded border-slate-300 text-brand-purple focus:ring-brand-purple h-4 w-4"
                      />
                      <span>Free Worldwide Shipping</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Confirm Bottom Sheet Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={handleClearAllFilters}
                  className="w-1/3 bg-white hover:bg-slate-50 text-slate-600 font-extrabold text-[12px] py-3.5 rounded-2xl border border-slate-200 transition-colors cursor-pointer text-center"
                >
                  RESET
                </button>
                <button
                  onClick={() => {
                    const min = tempMinPrice === "" ? null : parseFloat(tempMinPrice);
                    const max = tempMaxPrice === "" ? null : parseFloat(tempMaxPrice);
                    setAppliedMinPrice(min);
                    setAppliedMaxPrice(max);
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-2/3 bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold text-[12px] py-3.5 rounded-2xl transition-colors cursor-pointer text-center"
                >
                  APPLY FILTERS
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
