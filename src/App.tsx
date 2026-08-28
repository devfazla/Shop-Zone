import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import ExplorePage from "./components/ExplorePage";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import FAQPage from "./components/FAQPage";
import AccountPage from "./components/AccountPage";
import BottomNav from "./components/BottomNav";
import { Product, CartItem, ColorOption } from "./types";
import { PRODUCTS } from "./data";
import { Sparkles, Check, Heart, ShoppingCart, X, ArrowRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ImageWithFallback from "./components/ImageWithFallback";

export default function App() {
  // Application Global States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "explore" | "account" | "about" | "contact" | "faq">("home");
  
  // Interface Open/Close States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toast System State with richer metadata
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "info" | "heart";
    productImage?: string;
    actionLabel?: string;
    onAction?: () => void;
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  // Load cart and wishlist from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopzone_cart");
    const savedWishlist = localStorage.getItem("shopzone_wishlist");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlistIds(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse saved wishlist", e);
      }
    }
  }, []);

  // Save cart & wishlist to LocalStorage on modifications
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("shopzone_cart", JSON.stringify(newCart));
  };

  const saveWishlistToStorage = (newWishlist: string[]) => {
    setWishlistIds(newWishlist);
    localStorage.setItem("shopzone_wishlist", JSON.stringify(newWishlist));
  };

  // Helper: Trigger custom animated toast with rich details
  const triggerToast = (
    message: string,
    type: "success" | "info" | "heart" = "success",
    productImage?: string,
    actionLabel?: string,
    onAction?: () => void
  ) => {
    setToast({
      visible: true,
      message,
      type,
      productImage,
      actionLabel,
      onAction,
    });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
    return () => clearTimeout(timer);
  };

  // Action: Add to Cart with Options (detailed form)
  const handleAddToCartWithOptions = (
    product: Product,
    quantity: number,
    selectedSize?: string,
    selectedColor?: ColorOption
  ) => {
    // Generate unique ID based on product and selected configurations
    const sizePart = selectedSize ? `-${selectedSize}` : "";
    const colorPart = selectedColor ? `-${selectedColor.name}` : "";
    const cartItemId = `${product.id}${sizePart}${colorPart}`;

    const existingIndex = cart.findIndex((item) => item.id === cartItemId);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      // Increment quantity
      const newQty = updatedCart[existingIndex].quantity + quantity;
      if (newQty <= product.stock) {
        updatedCart[existingIndex].quantity = newQty;
        triggerToast(
          `Updated quantity of ${product.name} in cart!`,
          "success",
          product.image,
          "View Cart",
          () => setIsCartOpen(true)
        );
      } else {
        triggerToast(
          `Cannot exceed available stock (${product.stock} items)!`,
          "info"
        );
        return;
      }
    } else {
      // Add as new cart entry
      updatedCart.push({
        id: cartItemId,
        product,
        quantity,
        selectedSize,
        selectedColor,
      });
      triggerToast(
        `Added ${product.name} to your Shopping Cart!`,
        "success",
        product.image,
        "View Cart",
        () => setIsCartOpen(true)
      );
    }

    saveCartToStorage(updatedCart);
  };

  // Action: Quick Add to Cart (Default configurations)
  const handleQuickAddToCart = (product: Product) => {
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;
    handleAddToCartWithOptions(product, 1, defaultSize, defaultColor);
  };

  // Action: Update quantity inside drawer
  const handleUpdateCartQuantity = (cartItemId: string, change: number) => {
    const targetItem = cart.find((item) => item.id === cartItemId);
    if (!targetItem) return;

    const newQty = targetItem.quantity + change;
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }

    if (newQty > targetItem.product.stock) {
      triggerToast(`Only ${targetItem.product.stock} items left in stock!`, "info");
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === cartItemId ? { ...item, quantity: newQty } : item
    );
    saveCartToStorage(updatedCart);
  };

  // Action: Remove single item from cart drawer
  const handleRemoveCartItem = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    const updatedCart = cart.filter((i) => i.id !== cartItemId);
    saveCartToStorage(updatedCart);
    if (item) {
      triggerToast(`Removed ${item.product.name} from cart.`, "info");
    }
  };

  // Action: Reset entire cart state (after successful checkout purchase)
  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // Action: Toggle wishlist state
  const handleToggleWishlist = (product: Product) => {
    const isFavorited = wishlistIds.includes(product.id);
    let updatedWishlist: string[];

    if (isFavorited) {
      updatedWishlist = wishlistIds.filter((id) => id !== product.id);
      triggerToast(`Removed ${product.name} from Saved folder.`, "info");
    } else {
      updatedWishlist = [...wishlistIds, product.id];
      triggerToast(
        `Saved ${product.name} to Wishlist!`,
        "heart",
        product.image,
        "View Wishlist",
        () => setIsWishlistOpen(true)
      );
    }

    saveWishlistToStorage(updatedWishlist);
  };

  // Helpers to scroll the view smoothly
  const scrollToProducts = () => {
    const el = document.getElementById("products-catalog");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Resolve full wishlist products list
  const wishlistProducts = PRODUCTS.filter((prod) => wishlistIds.includes(prod.id));

  // Count items total inside cart
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAFBFD]" id="root-container">
      
      {/* Dynamic Promotion Ribbon header */}
      <div className="relative overflow-hidden bg-brand-purple text-white text-[12px] font-semibold text-center py-2 px-4 shadow-sm" id="promo-ribbon">
        <a
          href="https://devfazla.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center gap-2 group cursor-pointer transition-all duration-200 hover:opacity-95 active:scale-[0.99] focus:outline-hidden"
          id="promo-ribbon-link"
        >
          {/* Live pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
          </span>

          <span className="tracking-wide text-white/90 group-hover:text-white transition-colors duration-200">
            this is a portfolio project of <strong className="font-extrabold text-white underline decoration-white/50 decoration-2 underline-offset-4 group-hover:decoration-white transition-all">devFazla</strong>
          </span>

          {/* Action badge */}
          <span className="inline-flex items-center gap-1 bg-white/15 group-hover:bg-white/25 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border border-white/20 transition-all duration-200 shadow-xs">
            <span>Visit</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </span>
        </a>
      </div>

      {/* Primary Header Navigation */}
      <Header
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          setSelectedProduct(null);
          setCurrentPage("explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        scrollToProducts={scrollToProducts}
        onBackToHome={() => {
          setSelectedProduct(null);
          setCurrentPage("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onExploreClick={(catId) => {
          setSelectedProduct(null);
          setActiveCategory(catId);
          setCurrentPage("explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        currentPage={currentPage}
        onNavigate={(page) => {
          setSelectedProduct(null);
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCartWithOptions}
            onToggleWishlist={handleToggleWishlist}
            isFavorited={wishlistIds.includes(selectedProduct.id)}
            onProductClick={setSelectedProduct}
          />
        ) : currentPage === "explore" ? (
          <ExplorePage
            onProductClick={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : currentPage === "about" ? (
          <AboutPage
            onShopClick={() => {
              setSelectedProduct(null);
              setActiveCategory("all");
              setSearchQuery("");
              setCurrentPage("explore");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : currentPage === "contact" ? (
          <ContactPage />
        ) : currentPage === "faq" ? (
          <FAQPage
            onContactClick={() => {
              setSelectedProduct(null);
              setCurrentPage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : currentPage === "account" ? (
          <AccountPage />
        ) : (
          <>
            {/* Hero Section Banner */}
            <Hero
              onShopNowClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setCurrentPage("explore");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Feature badges (Free shipping, etc.) */}
            <Features />

            {/* Categories Section thumbnails */}
            <Categories
              onCategorySelect={(catId) => {
                setActiveCategory(catId);
                setCurrentPage("explore");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              scrollToProducts={() => {}}
            />

            {/* Core Products Catalog layout Grid */}
            <ProductGrid
              onProductClick={setSelectedProduct}
              onAddToCart={handleQuickAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSimplified={true}
              onExploreAllClick={() => {
                setCurrentPage("explore");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        )}
      </main>

      {/* Main Footer layout */}
      <Footer
        setActiveCategory={(catId) => {
          setActiveCategory(catId);
          setCurrentPage("explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        scrollToProducts={() => {}}
        onNavigate={(page) => {
          setSelectedProduct(null);
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Slide-over Right Cart Drawer Checkout Wizard */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Slide-over Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistProducts}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleQuickAddToCart}
      />

      {/* Mobile App-Style Bottom Navigation Bar */}
      <BottomNav
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          setSelectedProduct(null);
          setCurrentPage("explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        currentPage={currentPage}
        onNavigate={(page) => {
          setSelectedProduct(null);
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onExploreClick={(catId) => {
          setSelectedProduct(null);
          setActiveCategory(catId);
          setCurrentPage("explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Global Animated Action Toasts */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-[190] max-w-sm w-[calc(100%-2rem)] sm:w-auto"
          >
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/60 text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-slate-950/40 relative overflow-hidden">
              <div className="flex items-center space-x-3.5">
                {/* Product Thumbnail or Animated Icon */}
                {toast.productImage ? (
                  <div className="h-11 w-11 rounded-xl bg-white p-0.5 overflow-hidden flex-shrink-0 shadow-xs border border-slate-700">
                    <ImageWithFallback
                      src={toast.productImage}
                      alt="Item preview"
                      className="h-full w-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      fallbackText="Product"
                    />
                  </div>
                ) : (
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      toast.type === "success"
                        ? "bg-brand-purple text-white shadow-sm shadow-brand-purple/30"
                        : toast.type === "heart"
                        ? "bg-rose-500 text-white shadow-sm shadow-rose-500/30"
                        : "bg-amber-500 text-white shadow-sm shadow-amber-500/30"
                    }`}
                  >
                    {toast.type === "success" && <ShoppingCart className="h-5 w-5" />}
                    {toast.type === "heart" && <Heart className="h-5 w-5 fill-current" />}
                    {toast.type === "info" && <Check className="h-5 w-5 stroke-[2.5]" />}
                  </div>
                )}

                {/* Toast Message & Action */}
                <div className="flex-1 min-w-0 pr-1">
                  <p className="text-[12.5px] font-semibold text-slate-100 leading-snug line-clamp-2">
                    {toast.message}
                  </p>
                  {toast.actionLabel && toast.onAction && (
                    <button
                      onClick={() => {
                        toast.onAction?.();
                        setToast((prev) => ({ ...prev, visible: false }));
                      }}
                      className="mt-1 text-[11px] font-extrabold text-brand-purple-light hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <span>{toast.actionLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Animated Progress Timer Line */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3.2, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-[2.5px] ${
                  toast.type === "heart"
                    ? "bg-rose-500"
                    : toast.type === "info"
                    ? "bg-amber-400"
                    : "bg-brand-purple"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

