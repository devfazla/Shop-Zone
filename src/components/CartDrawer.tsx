import React, { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Check, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, change: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  // Steps: 'cart' | 'checkout' | 'success'
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  
  // Checkout Shipping Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shippingCost = cartSubtotal > 100 || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = cartSubtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Full name is required";
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!form.address.trim()) errors.address = "Shipping address is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (form.cardNumber.replace(/\s+/g, "").length < 16) {
      errors.cardNumber = "Card must be 16 digits";
    }
    if (!form.expiry.trim() || !/^\d\d\/\d\d$/.test(form.expiry)) {
      errors.expiry = "MM/YY format required";
    }
    if (!form.cvv.trim() || form.cvv.length < 3) {
      errors.cvv = "CVV required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep("success");
    }
  };

  const handleSuccessClose = () => {
    onClearCart();
    setStep("cart");
    setForm({
      name: "",
      email: "",
      address: "",
      city: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    onClose();
  };

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

          {/* Cart Panel Drawer (Right side) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md sm:max-w-lg bg-white shadow-2xl z-[160] flex flex-col h-full overflow-hidden"
          >
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-brand-purple" />
                <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
                  {step === "cart" && "Your Shopping Cart"}
                  {step === "checkout" && "Secure Checkout"}
                  {step === "success" && "Order Completed"}
                </h2>
              </div>
              <button
                onClick={step === "success" ? handleSuccessClose : onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-grow overflow-y-auto">
              
              {/* STEP 1: Shopping Cart list */}
              {step === "cart" && (
                <div className="h-full flex flex-col">
                  {cartItems.length > 0 ? (
                    <>
                      {/* Items list */}
                      <div className="p-6 space-y-5 flex-grow overflow-y-auto">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 border-b border-slate-50 pb-5 last:border-b-0 last:pb-0"
                          >
                            {/* Product Thumb */}
                            <div className="h-20 w-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Product meta & counts */}
                            <div className="flex-grow">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {item.product.category}
                              </span>
                              <h3 className="text-sm font-bold text-slate-800 line-clamp-1 leading-snug">
                                {item.product.name}
                              </h3>
                              
                              {/* Selected customizations */}
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                {item.selectedSize && (
                                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                    Size: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                    <span
                                      className="inline-block h-2.5 w-2.5 rounded-full mr-1"
                                      style={{ backgroundColor: item.selectedColor.hex }}
                                    />
                                    {item.selectedColor.name}
                                  </span>
                                )}
                              </div>

                              {/* Action Row: pricing & counters */}
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-sm font-extrabold text-brand-purple">
                                  ${item.product.price}
                                </span>

                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg p-0.5">
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      className="h-7 w-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded transition-colors cursor-pointer"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      className="h-7 w-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded transition-colors cursor-pointer"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="p-2 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                    title="Remove item"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary Drawer bottom */}
                      <div className="p-6 bg-slate-50 border-t border-slate-100">
                        <div className="space-y-2.5 mb-6">
                          <div className="flex justify-between text-sm font-semibold text-slate-500">
                            <span>Subtotal</span>
                            <span className="text-slate-800">${cartSubtotal}</span>
                          </div>
                          <div className="flex justify-between text-sm font-semibold text-slate-500">
                            <span>Shipping</span>
                            <span className="text-slate-800">
                              {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                            </span>
                          </div>
                          {shippingCost > 0 && (
                            <p className="text-[10.5px] text-brand-purple font-semibold">
                              Add ${(100 - cartSubtotal).toFixed(0)} more to unlock FREE shipping!
                            </p>
                          )}
                          <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-slate-900">
                            <span>Grand Total</span>
                            <span className="text-brand-purple">${cartTotal}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setStep("checkout")}
                          className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold h-12 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-brand-purple/10 hover:shadow-brand-purple/20 transition-all cursor-pointer"
                        >
                          <span>PROCEED TO CHECKOUT</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center my-12">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                        <ShoppingBag className="h-7 w-7" />
                      </div>
                      <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                      <p className="text-xs text-slate-400 mt-2 max-w-xs font-medium">
                        Looks like you haven't added any products to your shopping cart yet.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                      >
                        Start Shopping Now
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Checkout Form details */}
              {step === "checkout" && (
                <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-5">
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="flex items-center space-x-1.5 text-xs font-extrabold text-brand-purple hover:text-brand-purple-dark mb-4 uppercase tracking-wider cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Cart</span>
                  </button>

                  <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                    Shipping Details
                  </h3>

                  {/* Shipping Name */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Fazlar Rahman"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Shipping Email */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                    {formErrors.address && (
                      <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                        {formErrors.address}
                      </span>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      City / Zip code
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      placeholder="San Francisco, CA"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                    {formErrors.city && (
                      <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                        {formErrors.city}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mt-6 mb-3">
                    Payment Details
                  </h3>

                  {/* Card Number */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-4 pr-11 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                      <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    </div>
                    {formErrors.cardNumber && (
                      <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                        {formErrors.cardNumber}
                      </span>
                    )}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleInputChange}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                      {formErrors.expiry && (
                        <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                          {formErrors.expiry}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                        placeholder="123"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                      {formErrors.cvv && (
                        <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                          {formErrors.cvv}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start space-x-3 mt-6">
                    <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      SSL Secure Payment. Your credentials are fully encrypted and securely processed using standard 256-bit bank encryption systems.
                    </p>
                  </div>

                  {/* Form Submit Button */}
                  <div className="pt-4 border-t border-slate-100 mt-6">
                    <div className="flex justify-between items-center text-base font-extrabold text-slate-900 mb-4">
                      <span>Total Due</span>
                      <span className="text-brand-purple">${cartTotal}</span>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold h-12 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-brand-purple/10 hover:shadow-brand-purple/20 transition-all cursor-pointer"
                    >
                      <span>AUTHORIZE SECURE PAYMENT</span>
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Order Success Screen */}
              {step === "success" && (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full my-10">
                  <motion.div
                    initial={{ scale: 0.6, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100"
                  >
                    <Check className="h-10 w-10" />
                  </motion.div>
                  
                  <h3 className="text-xl font-extrabold text-slate-800">Order Placed Successfully!</h3>
                  <p className="text-xs text-slate-400 mt-2 font-semibold max-w-sm">
                    Thank you for shopping at ShopZone, <span className="text-slate-700 font-bold">{form.name}</span>! Your order has been securely recorded and is being prepared for shipping.
                  </p>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full mt-6 text-left space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Order Number</span>
                      <span className="text-slate-800 font-bold">SZ-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Ship To</span>
                      <span className="text-slate-800 font-bold truncate max-w-[200px]">{form.address}, {form.city}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Email receipt</span>
                      <span className="text-slate-800 font-bold truncate max-w-[200px]">{form.email}</span>
                    </div>
                    <div className="flex justify-between text-xs font-extrabold text-slate-900 border-t border-slate-200 pt-2 mt-2">
                      <span>Paid Total</span>
                      <span className="text-brand-purple">${cartTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSuccessClose}
                    className="mt-8 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold h-11 px-8 rounded-xl shadow-md cursor-pointer text-sm"
                  >
                    Continue Shopping
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
