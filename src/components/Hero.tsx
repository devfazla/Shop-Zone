import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import heroImage from "../assets/images/hero-section-img.png";

interface HeroProps {
  onShopNowClick: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F3F5FC] pt-5 sm:pt-7 md:pt-9 lg:pt-10 pb-7 sm:pb-9 md:pb-11 lg:pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 text-center lg:text-left"
        >
          <span className="inline-block text-[12px] sm:text-[13px] font-bold text-brand-purple tracking-widest uppercase mb-2.5 md:mb-3">
            New Arrivals
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-tight md:leading-[1.1] mb-3.5 sm:mb-4 font-sans">
            Elevate Your <br className="hidden sm:inline" />
            <span className="text-brand-purple">Everyday</span>
          </h1>
          <p className="text-[14px] sm:text-[16px] text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0 mb-5 sm:mb-6 font-normal">
            Discover premium quality essentials curated to upgrade your everyday lifestyle.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShopNowClick}
            className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/30 transition-all cursor-pointer group text-[14px] sm:text-[15px]"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right: Constrained Image Container to fit smoothly within viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-7 flex justify-center items-center"
        >
          <img
            src={heroImage}
            alt="ShopZone Hero Showroom Collection"
            className="w-auto h-auto max-w-full max-h-[260px] sm:max-h-[340px] md:max-h-[400px] lg:max-h-[450px] object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
        </motion.div>

      </div>
    </section>
  );
}
