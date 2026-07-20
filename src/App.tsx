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
import { Product, CartItem, ColorOption } from "./types";
import { PRODUCTS } from "./data";
import { Sparkles, Check, Heart, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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

  // Toast System State
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "info" | "heart";
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

  // Helper: Trigger custom animated toast
  const triggerToast = (message: string, type: "success" | "info" | "heart" = "success") => {
    setToast({ visible: true, message, type });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
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
        triggerToast(`Updated quantity of ${product.name} in cart!`, "success");
      } else {
        triggerToast(`Cannot exceed total available stock (${product.stock} items)!`, "info");
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
      triggerToast(`Added ${product.name} to your Shopping Cart!`, "success");
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
      triggerToast(`Saved ${product.name} to Wishlist!`, "heart");
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
      <div className="bg-brand-purple text-white text-[12px] font-bold text-center py-2 px-4 shadow-sm" id="promo-ribbon">
        <span className="inline-flex items-center gap-1.5 justify-center">
          <Sparkles className="h-3.5 w-3.5 animate-bounce" />
          Grand Summer Sale: Enjoy FREE worldwide shipping on all orders over $100!
        </span>
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

      {/* Global Animated Action Toasts */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-[190] max-w-sm"
          >
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-4 shadow-xl shadow-slate-900/10 flex items-center space-x-3.5">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  toast.type === "success"
                    ? "bg-brand-purple-light text-brand-purple"
                    : toast.type === "heart"
                    ? "bg-rose-100 text-rose-500"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {toast.type === "success" && <ShoppingCart className="h-4.5 w-4.5" />}
                {toast.type === "heart" && <Heart className="h-4.5 w-4.5 fill-current" />}
                {toast.type === "info" && <Check className="h-4.5 w-4.5" />}
              </div>
              <div>
                <p className="text-[12.5px] font-bold tracking-wide">
                  {toast.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

