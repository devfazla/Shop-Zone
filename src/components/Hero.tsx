import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import heroImage from "../assets/images/hero-section-img.png";

interface HeroProps {
  onShopNowClick: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F3F5FC] py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 text-center lg:text-left"
        >
          <span className="inline-block text-[13px] sm:text-[14px] font-bold text-brand-purple tracking-widest uppercase mb-4 md:mb-5">
            New Arrivals
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight md:leading-[1.1] mb-6 font-sans">
            Elevate Your <br />
            <span className="text-brand-purple">Everyday</span>
          </h1>
          <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 font-normal">
            Discover premium quality essentials curated to upgrade your everyday lifestyle.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShopNowClick}
            className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/30 transition-all cursor-pointer group text-[15px]"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right: Image Container without box framing or Starting From badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-8 flex justify-center"
        >
          <img
            src={heroImage}
            alt="ShopZone Hero Showroom Collection"
            className="w-full max-w-[750px] md:max-w-[870px] h-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

      </div>
    </section>
  );
}
