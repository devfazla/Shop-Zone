import React, { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Home, Layers, BookOpen, Mail, Store, ArrowRight, MapPin, Phone, User, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  scrollToProducts: () => void;
  onBackToHome?: () => void;
  onExploreClick?: (catId: string) => void;
  currentPage?: string;
  onNavigate?: (page: "home" | "explore" | "account" | "about" | "contact" | "faq") => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearch,
  activeCategory,
  setActiveCategory,
  scrollToProducts,
  onBackToHome,
  onExploreClick,
  currentPage = "home",
  onNavigate,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    scrollToProducts();
    setIsSearchOpen(false);
  };

  const getLinkIcon = (id: string, name: string) => {
    if (name === "Home") return <Home className="h-5 w-5" />;
    switch (id) {
      case "all":
        return <Store className="h-5 w-5" />;
      case "categories-menu":
        return <Layers className="h-5 w-5" />;
      case "about":
        return <BookOpen className="h-5 w-5" />;
      case "contact":
        return <Mail className="h-5 w-5" />;
      case "faq":
        return <HelpCircle className="h-5 w-5" />;
      default:
        return <Store className="h-5 w-5" />;
    }
  };

  const navLinks = [
    { name: "Home", href: "#", id: "home" },
    { name: "Shop", href: "#shop", id: "all" },
    { name: "Categories", href: "#categories", id: "categories-menu" },
    { name: "About Us", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
    { name: "FAQs", href: "#faq", id: "faq" },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left Brand & Mobile Menu Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-slate-700 hover:text-brand-purple p-2 -ml-1 rounded-xl hover:bg-slate-100/80 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onBackToHome?.();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center space-x-2.5 py-1 group"
                id="brand-logo"
              >
                <ImageWithFallback
                  src="/logo.png"
                  alt="ShopZone Logo"
                  className="h-8 w-8 sm:h-9 sm:w-9 object-contain group-hover:scale-105 transition-transform duration-200"
                  width={36}
                  height={36}
                  fallbackSrc="/logo.svg"
                />
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans select-none">
                  Shop<span className="text-brand-purple font-black">Zone</span>
                </span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = 
                (link.id === "home" && currentPage === "home") ||
                (link.id === "all" && currentPage === "explore") ||
                (link.id === "about" && currentPage === "about") ||
                (link.id === "contact" && currentPage === "contact") ||
                (link.id === "faq" && currentPage === "faq");

              return (
                <div key={link.name} className="relative group py-2">
                  <button
                    onClick={() => {
                      if (link.id === "home") {
                        onNavigate?.("home");
                      } else if (link.id === "all") {
                        onNavigate?.("explore");
                        onExploreClick?.("all");
                      } else if (link.id === "categories-menu") {
                        onNavigate?.("explore");
                        onExploreClick?.("all");
                      } else if (link.id === "about") {
                        onNavigate?.("about");
                      } else if (link.id === "contact") {
                        onNavigate?.("contact");
                      } else if (link.id === "faq") {
                        onNavigate?.("faq");
                      }
                    }}
                    className={`flex items-center text-[15px] py-1 cursor-pointer transition-colors relative ${
                      isActive
                        ? "font-extrabold text-brand-purple"
                        : "font-medium text-slate-700 hover:text-brand-purple"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.id === "categories-menu" && (
                      <ChevronDown className="ml-1 h-4 w-4 text-slate-400 group-hover:text-brand-purple transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-[-4px] inset-x-0 h-[3px] bg-brand-purple rounded-full"
                      />
                    )}
                  </button>

                {link.id === "categories-menu" && (
                  <div className="absolute left-0 mt-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                      <button
                        onClick={() => {
                          onExploreClick?.("all");
                        }}
                        className={`flex items-center justify-between w-full text-left px-3.5 py-2 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                          activeCategory === "all"
                            ? "bg-brand-purple/10 text-brand-purple"
                            : "text-slate-600 hover:text-brand-purple hover:bg-slate-50"
                        }`}
                      >
                        <span>All Products</span>
                        {activeCategory === "all" && <ArrowRight className="h-3.5 w-3.5 text-brand-purple" />}
                      </button>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onExploreClick?.(cat.id);
                          }}
                          className={`flex items-center justify-between w-full text-left px-3.5 py-2 rounded-xl text-[13.5px] font-semibold transition-all cursor-pointer ${
                            activeCategory === cat.id
                              ? "bg-brand-purple/10 text-brand-purple"
                              : "text-slate-600 hover:text-brand-purple hover:bg-slate-50"
                          }`}
                        >
                          <span>{cat.name}</span>
                          {activeCategory === cat.id && <ArrowRight className="h-3.5 w-3.5 text-brand-purple" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </nav>

          {/* Header Action Buttons - Visible on desktop, moved to bottom nav on mobile */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4" id="header-actions">
            
            {/* Search Trigger */}
            <div className="relative">
              <button
                id="search-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full text-slate-600 hover:text-brand-purple hover:bg-slate-50 transition-all cursor-pointer"
                title="Search Products"
              >
                <Search className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                  >
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                      <input
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[14px] text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="ml-2 bg-brand-purple hover:bg-brand-purple-dark text-white p-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites Trigger */}
            <motion.button
              id="wishlist-btn"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full text-slate-600 hover:text-brand-purple hover:bg-slate-50 transition-all relative cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="h-5 w-5 transition-colors" />
              {wishlistCount > 0 && (
                <div className="absolute top-1 right-1 flex items-center justify-center">
                  {/* Ping Ring Effect on Count Change */}
                  <motion.span
                    key={`wish-ping-${wishlistCount}`}
                    initial={{ scale: 0.8, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute h-3.5 w-3.5 rounded-full bg-rose-500 pointer-events-none"
                  />
                  {/* Badge */}
                  <motion.span
                    key={`wish-${wishlistCount}`}
                    initial={{ scale: 0.3, y: -4 }}
                    animate={{ scale: [0.3, 1.35, 0.95, 1], y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative h-4.5 min-w-[1.125rem] px-1 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm"
                  >
                    {wishlistCount}
                  </motion.span>
                </div>
              )}
            </motion.button>

            {/* Cart Trigger */}
            <motion.button
              id="cart-btn"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={onOpenCart}
              className="p-2.5 rounded-full text-slate-600 hover:text-brand-purple hover:bg-slate-50 transition-all relative cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 transition-colors" />
              {cartCount > 0 && (
                <div className="absolute top-0.5 right-0.5 flex items-center justify-center">
                  {/* Ping Ring Effect on Cart Count Change */}
                  <motion.span
                    key={`cart-ping-${cartCount}`}
                    initial={{ scale: 0.8, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute h-4 w-4 rounded-full bg-brand-purple pointer-events-none"
                  />
                  {/* Badge */}
                  <motion.span
                    key={`cart-${cartCount}`}
                    initial={{ scale: 0.3, y: -4 }}
                    animate={{ scale: [0.3, 1.4, 0.95, 1], y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative h-5 min-w-5 px-1 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                </div>
              )}
            </motion.button>

            {/* Account/Profile Button */}
            <button
              id="account-btn"
              onClick={() => onNavigate?.("account")}
              className={`p-2.5 rounded-full transition-all relative cursor-pointer ${
                currentPage === "account"
                  ? "text-brand-purple bg-brand-purple/10"
                  : "text-slate-600 hover:text-brand-purple hover:bg-slate-50"
              }`}
              title="My Account"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Drawer Navigation */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop with elegant frosted glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[150] md:hidden"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 left-0 w-72 max-w-[75vw] bg-white shadow-2xl z-[160] flex flex-col md:hidden overflow-hidden rounded-r-3xl border-r border-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <ImageWithFallback
                  src="/logo.png"
                  alt="ShopZone Logo"
                  className="h-7 w-7 object-contain"
                  width={28}
                  height={28}
                  fallbackSrc="/logo.svg"
                />
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Shop<span className="text-brand-purple font-black">Zone</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="flex-grow overflow-y-auto px-5 py-6 space-y-2">
              {navLinks.map((link) => {
                const isCategories = link.id === "categories-menu";
                const isActive = 
                  (link.id === "home" && currentPage === "home") ||
                  (link.id === "all" && currentPage === "explore") ||
                  (link.id === "about" && currentPage === "about") ||
                  (link.id === "contact" && currentPage === "contact") ||
                  (link.id === "faq" && currentPage === "faq");

                return (
                  <div key={link.name} className="flex flex-col">
                    <button
                      onClick={() => {
                        if (isCategories) {
                          setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
                        } else {
                          setIsMobileMenuOpen(false);
                          if (link.id === "home") {
                            onNavigate?.("home");
                          } else if (link.id === "all") {
                            onNavigate?.("explore");
                            onExploreClick?.("all");
                          } else if (link.id === "about") {
                            onNavigate?.("about");
                          } else if (link.id === "contact") {
                            onNavigate?.("contact");
                          } else if (link.id === "faq") {
                            onNavigate?.("faq");
                          }
                        }
                      }}
                      className={`group flex items-center justify-between w-full text-[15px] rounded-xl px-4 py-3 transition-all cursor-pointer ${
                        isActive
                          ? "font-extrabold bg-brand-purple/10 text-brand-purple"
                          : "font-semibold text-slate-700 hover:text-brand-purple hover:bg-slate-50/80"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`transition-colors ${isActive ? "text-brand-purple" : "text-slate-400 group-hover:text-brand-purple"}`}>
                          {getLinkIcon(link.id, link.name)}
                        </span>
                        <span>{link.name}</span>
                      </div>
                      {isCategories && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isMobileCategoriesOpen
                              ? "rotate-180 text-brand-purple"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                      )}
                    </button>

                    {/* Expandable categories list inline */}
                    {isCategories && isMobileCategoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-11 pr-2 mt-1 mb-2 flex flex-col space-y-1 overflow-hidden border-l border-slate-100 ml-6"
                      >
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            onExploreClick?.("all");
                          }}
                          className={`flex items-center justify-between text-[13.5px] font-semibold py-2 px-3 rounded-lg text-left cursor-pointer transition-all ${
                            activeCategory === "all"
                              ? "bg-brand-purple/10 text-brand-purple"
                              : "text-slate-500 hover:text-brand-purple hover:bg-slate-50/60"
                          }`}
                        >
                          <span>All Products</span>
                          {activeCategory === "all" && (
                            <ArrowRight className="h-3.5 w-3.5 text-brand-purple" />
                          )}
                        </button>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              onExploreClick?.(cat.id);
                            }}
                            className={`flex items-center justify-between text-[13.5px] font-semibold py-2 px-3 rounded-lg text-left cursor-pointer transition-all ${
                              activeCategory === cat.id
                                ? "bg-brand-purple/10 text-brand-purple"
                                : "text-slate-500 hover:text-brand-purple hover:bg-slate-50/60"
                            }`}
                          >
                            <span>{cat.name}</span>
                            {activeCategory === cat.id && (
                              <ArrowRight className="h-3.5 w-3.5 text-brand-purple" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Premium Drawer Footer */}
            <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-3 text-slate-500 text-xs font-semibold">
                  <Phone className="h-4 w-4 text-brand-purple" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-500 text-xs font-semibold">
                  <MapPin className="h-4 w-4 text-brand-purple" />
                  <span>New York, NY 10001, USA</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                © 2026 ShopZone. Crafted for high-fidelity shopping experiences.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
