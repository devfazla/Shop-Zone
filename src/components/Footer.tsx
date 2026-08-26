import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Send, ArrowUp, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  setActiveCategory: (catId: string) => void;
  scrollToProducts: () => void;
  onNavigate?: (page: "home" | "explore" | "account" | "about" | "contact" | "faq") => void;
}

export default function Footer({ setActiveCategory, scrollToProducts, onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLinkClick = (id: string) => {
    setActiveCategory(id);
    scrollToProducts();
  };

  return (
    <footer id="footer-section" className="bg-navy-dark text-slate-400 pt-16 md:pt-20 pb-20 md:pb-8 relative">
      
      {/* Upper Footer: 4 Grid Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800 pb-12 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-5 font-sans">
              Shop<span className="text-brand-purple">Zone</span>
            </h3>
            <p className="text-slate-400 text-[13.5px] leading-relaxed mb-6 font-medium max-w-sm">
              Your one-stop shop for the best products at the best prices. Experience curated quality, secure payment systems, and lightning-fast logistics.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-slate-800 hover:border-brand-purple hover:bg-brand-purple text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Facebook Link"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-slate-800 hover:border-brand-purple hover:bg-brand-purple text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Twitter Link"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-slate-800 hover:border-brand-purple hover:bg-brand-purple text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Instagram Link"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-extrabold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[13.5px]">
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("explore");
                    handleQuickLinkClick("all");
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("explore");
                    handleQuickLinkClick("electronics");
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-extrabold text-white uppercase tracking-widest mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3 text-[13.5px]">
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("account");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("account");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("faq");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.("faq");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left focus:outline-none"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-[13px] font-extrabold text-white uppercase tracking-widest mb-5">
              Newsletter
            </h4>
            <p className="text-slate-400 text-[13.5px] leading-relaxed mb-5 font-medium">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribeSubmit}
                  className="flex items-center relative"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-12 py-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 bg-brand-purple hover:bg-brand-purple-dark text-white p-2.5 rounded-lg transition-colors cursor-pointer"
                    aria-label="Subscribe Email Button"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/40 border border-emerald-800/50 p-4 rounded-xl flex items-start space-x-2.5"
                >
                  <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-emerald-300">
                      Subscribed!
                    </span>
                    <span className="block text-[11px] text-emerald-500/80 mt-0.5 font-medium">
                      Welcome to ShopZone. Check your inbox for your 15% discount code!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* We Accept row */}
            <div className="mt-8">
              <span className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                We Accept
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#1A2035] text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-black tracking-wider shadow-sm">
                  VISA
                </span>
                <span className="bg-[#1A2035] text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-black tracking-wider shadow-sm">
                  MasterCard
                </span>
                <span className="bg-[#1A2035] text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-black tracking-wider shadow-sm">
                  PayPal
                </span>
                <span className="bg-[#1A2035] text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-black tracking-wider shadow-sm">
                  AMEX
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Footer: Copyrights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <div>
          <p>© 2026 ShopZone. All Rights Reserved.</p>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
        </div>
      </div>

      {/* Scroll to Top Floating Button */}
      <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8 z-20">
        <motion.button
          whileHover={{ y: -4 }}
          onClick={scrollToTop}
          className="h-10 w-10 sm:h-11 sm:w-11 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-purple/20 transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </div>

    </footer>
  );
}
