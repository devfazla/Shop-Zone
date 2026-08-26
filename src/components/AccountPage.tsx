import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, ShoppingBag, MapPin, Settings, Check, CreditCard, ChevronRight, Package, Truck, Calendar, Lock } from "lucide-react";
import { PRODUCTS } from "../data";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses" | "security">("profile");

  // User Profile state
  const [name, setName] = useState("devfazla");
  const [email, setEmail] = useState("hello@devfazla.com");
  const [phone, setPhone] = useState("+88 01845 855131");
  const [isSaved, setIsSaved] = useState(false);

  // Address State
  const [street, setStreet] = useState("Shuloghar, Sunamganj");
  const [city, setCity] = useState("Sylhet");
  const [zip, setZip] = useState("3000");
  const [state, setState] = useState("G");
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  // Password / Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSaved, setIsPasswordSaved] = useState(false);

  // Load actual products to represent mock orders
  const sampleProduct1 = PRODUCTS[0] || { name: "Premium Device", price: 99, image: "" };
  const sampleProduct2 = PRODUCTS[2] || { name: "Fashion Apparel", price: 45, image: "" };
  const sampleProduct3 = PRODUCTS[4] || { name: "Home Curator Item", price: 120, image: "" };

  const orders = [
    {
      id: "SZ-82710",
      date: "July 15, 2026",
      total: sampleProduct1.price + 9.99,
      status: "Delivered",
      statusColor: "bg-emerald-500",
      textColor: "text-emerald-700 font-bold",
      items: [
        { name: sampleProduct1.name, price: sampleProduct1.price, image: sampleProduct1.image, quantity: 1 }
      ]
    },
    {
      id: "SZ-91044",
      date: "July 18, 2026",
      total: sampleProduct2.price + sampleProduct3.price,
      status: "In Transit",
      statusColor: "bg-brand-purple animate-pulse",
      textColor: "text-brand-purple font-bold",
      items: [
        { name: sampleProduct2.name, price: sampleProduct2.price, image: sampleProduct2.image, quantity: 1 },
        { name: sampleProduct3.name, price: sampleProduct3.price, image: sampleProduct3.image, quantity: 1 }
      ]
    }
  ];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressSaved(true);
    setTimeout(() => setIsAddressSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) return;
    setIsPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setIsPasswordSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left column: Profile Summary & Tab controls */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-900/5">
          <div className="text-center pb-6 border-b border-slate-100 mb-6">
            <div className="h-20 w-20 bg-brand-purple/10 border-2 border-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black">
              {name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">{name}</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">{email}</p>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <User className="h-4.5 w-4.5" />
                <span>Profile Settings</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-4.5 w-4.5" />
                <span>My Orders</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "addresses"
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-4.5 w-4.5" />
                <span>Shipping Addresses</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "security"
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Lock className="h-4.5 w-4.5" />
                <span>Password & Security</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right column: Tab content block */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 min-h-[450px]">
          <AnimatePresence mode="wait">
            
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-black text-slate-900">Profile Settings</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    Update your primary personal detail identifiers and contact information
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        Username
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                    />
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      className="bg-brand-purple hover:bg-brand-purple-dark text-white font-black text-xs sm:text-sm tracking-widest h-11 px-6 rounded-xl shadow-lg shadow-brand-purple/10 cursor-pointer transition-all"
                    >
                      SAVE PROFILE DETAIL
                    </button>
                    {isSaved && (
                      <span className="flex items-center text-xs font-bold text-emerald-600 space-x-1.5">
                        <Check className="h-4 w-4 bg-emerald-50 rounded-full border border-emerald-100 p-0.5" />
                        <span>Changes saved successfully</span>
                      </span>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

            {/* My Orders list */}
            {activeTab === "orders" && (
              <motion.div
                key="orders-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-black text-slate-900">Purchase History</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    Track details, courier status, and download receipts for active orders
                  </p>
                </div>

                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-slate-150/70 rounded-2xl overflow-hidden shadow-xs"
                    >
                      {/* Top Header */}
                      <div className="bg-slate-50/70 px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-4 text-slate-500 font-semibold">
                          <div>
                            <span className="text-slate-400 font-black">ORDER ID:</span>{" "}
                            <span className="text-slate-900 font-bold font-mono">{order.id}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{order.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`h-2 w-2 rounded-full ${order.statusColor}`} />
                          <span className={order.textColor}>{order.status}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-5 divide-y divide-slate-100 space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-4 pt-4 first:pt-0">
                            <div className="h-16 w-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <h4 className="text-sm font-bold text-slate-900 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                                Qty: {item.quantity} | ${item.price} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="bg-slate-50/20 px-5 py-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold">Grand Total:</span>
                          <span className="block text-sm font-black text-brand-purple">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                        <button className="inline-flex items-center space-x-2 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all bg-white shadow-xs cursor-pointer">
                          <Truck className="h-3.5 w-3.5" />
                          <span>Track Courier</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Shipping Addresses */}
            {activeTab === "addresses" && (
              <motion.div
                key="addresses-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-black text-slate-900">Shipping Addresses</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    Manage default destination coordinates for seamless, fast shipping setups
                  </p>
                </div>

                <form onSubmit={handleAddressSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2 col-span-1">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-2 col-span-1">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-2 col-span-1">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      className="bg-brand-purple hover:bg-brand-purple-dark text-white font-black text-xs sm:text-sm tracking-widest h-11 px-6 rounded-xl shadow-lg shadow-brand-purple/10 cursor-pointer transition-all"
                    >
                      SAVE ADDRESS DETAILS
                    </button>
                    {isAddressSaved && (
                      <span className="flex items-center text-xs font-bold text-emerald-600 space-x-1.5">
                        <Check className="h-4 w-4 bg-emerald-50 rounded-full border border-emerald-100 p-0.5" />
                        <span>Address saved successfully</span>
                      </span>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

            {/* Password & Security */}
            {activeTab === "security" && (
              <motion.div
                key="security-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-black text-slate-900">Password & Security</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    Set up authentication locks and update primary login account credentials
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Min. 8 characters"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Match password exactly"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      className="bg-brand-purple hover:bg-brand-purple-dark text-white font-black text-xs sm:text-sm tracking-widest h-11 px-6 rounded-xl shadow-lg shadow-brand-purple/10 cursor-pointer transition-all"
                    >
                      UPDATE PASSWORDS
                    </button>
                    {isPasswordSaved && (
                      <span className="flex items-center text-xs font-bold text-emerald-600 space-x-1.5">
                        <Check className="h-4 w-4 bg-emerald-50 rounded-full border border-emerald-100 p-0.5" />
                        <span>Security credentials modified</span>
                      </span>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
