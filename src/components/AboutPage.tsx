import React from "react";
import { motion } from "motion/react";
import { 
  Store, 
  Sparkles, 
  Shield, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Compass,
  Heart,
  Package,
  Clock
} from "lucide-react";

// Our custom-generated, high-quality, solid flat vector illustrations
const curationImg = "/src/assets/images/about_collection_curation_1784522126982.jpg";
const packagingImg = "/src/assets/images/about_premium_packaging_1784522141123.jpg";
const craftImg = "/src/assets/images/about_craft_design_1784522154639.jpg";

interface AboutPageProps {
  onShopClick: () => void;
}

export default function AboutPage({ onShopClick }: AboutPageProps) {
  
  // Brand values in zigzag format - real story, highly polished text
  const storeMilestones = [
    {
      step: "01",
      title: "Thoughtful & Curated Sourcing",
      subtitle: "Quality Above Everything",
      description: "We hand-select every piece in our collection with an uncompromising focus on premium quality. From materials to design aesthetics, our goal is to bring you everyday lifestyle essentials that look beautiful and are built to last.",
      image: curationImg,
      badge: "Sourcing Standards",
      tech: "Carefully Selected Essentials"
    },
    {
      step: "02",
      title: "Sustainable & Premium Packaging",
      subtitle: "Uncompromising Attention to Detail",
      description: "Our commitment to excellence extends all the way to your doorstep. We pack every order using clean, sustainable materials, ensuring your items arrive in pristine condition while keeping our environmental impact minimal.",
      image: packagingImg,
      badge: "Eco-Conscious",
      tech: "Plastic-Free Delivery"
    },
    {
      step: "03",
      title: "Designed for Modern Living",
      subtitle: "Aesthetics Meet Daily Utility",
      description: "We believe the products you use every day should bring a sense of order and quiet joy to your life. Our curation focuses on clean lines, neutral colors, and high functionality to blend seamlessly with your contemporary space.",
      image: craftImg,
      badge: "Design Intent",
      tech: "Functional Minimalist"
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* HERO SECTION: Refined Editorial Brand Hero */}
      <section className="relative overflow-hidden bg-[#F3F5FC] py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60">
        
        {/* Soft solid decorative ambient accents */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Brand Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-6"
            id="about-hero-text"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-purple-light text-brand-purple px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
              <Store className="h-3.5 w-3.5" />
              <span>About ShopZone</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight md:leading-[1.1] font-sans">
              Thoughtfully Curated <br />
              <span className="text-brand-purple">For Modern Living</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              ShopZone was founded by <strong className="font-bold text-slate-900">Fazla</strong> on a simple principle: modern essentials should be beautifully designed, exceptionally durable, and completely free of digital clutter.
            </p>

            {/* Core Brand Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-2.5">
                <Shield className="h-4 w-4 text-brand-purple flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">100% Curated</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-2.5">
                <Sparkles className="h-4 w-4 text-brand-purple flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">Pure Quality</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1 flex items-center space-x-2.5">
                <CheckCircle className="h-4 w-4 text-brand-purple flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">Fast Support</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShopClick}
                className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-brand-purple/20 transition-all cursor-pointer group text-[14px]"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Clean Editorial Founder Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
            id="about-hero-image"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Main Portrait Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl shadow-slate-200/60 group">
                <img 
                  src="https://raw.githubusercontent.com/devfazla/free-writer/refs/heads/main/assets/images/fazla.png"
                  alt="Fazla - Founder & Creator of ShopZone"
                  className="w-full h-full object-cover filter grayscale contrast-105 brightness-95 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Solid minimal founder badge pinned to bottom */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm leading-tight">Fazla</h4>
                    <p className="text-brand-purple text-[11px] font-bold uppercase tracking-wider mt-0.5">Founder & Curator</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-brand-purple text-white flex items-center justify-center flex-shrink-0">
                    <Store className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Floating verified badge in top corner */}
              <div className="absolute -top-3 -right-3 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md border border-slate-800 flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Verified Creator</span>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ZIGZAG VALUES SECTION: Pure, solid flat vectors, no gradients */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-[11px] font-bold text-brand-purple bg-brand-purple-light px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Our Core Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              Behind the Curation
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every detail is chosen with intent. Discover how we select, bundle, and deliver our premium collections.
            </p>
          </div>

          {/* Alternating ZigZag Grid */}
          <div className="space-y-20 lg:space-y-28">
            {storeMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  
                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-4 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-brand-purple font-mono font-black text-lg">
                        {milestone.step}
                      </span>
                      <span className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">
                        {milestone.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-[14px] sm:text-[15px] text-slate-500 leading-relaxed font-normal">
                      {milestone.description}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 font-sans text-[11px] font-bold py-1 px-3 rounded-full">
                        <CheckCircle className="h-3 w-3 text-brand-purple" />
                        <span>{milestone.tech}</span>
                      </span>
                    </div>
                  </div>

                  {/* Image Column: Solid borders, no gradients, clean vector */}
                  <div className={`lg:col-span-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/60 bg-slate-50"
                    >
                      <img 
                        src={milestone.image} 
                        alt={milestone.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Solid light overlay on hover */}
                      <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/5 transition-colors duration-300 pointer-events-none" />
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* VALUE BENTO GRID: Solid, beautifully spaced cards */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-brand-purple bg-brand-purple-light px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Our Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
              What We Standardize
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              The promises we keep to ensure a premium experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Secure & Protected</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Every transaction and inquiry form processed by our systems complies with standard security procedures, keeping your data secure.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Curated Explorer</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We don't believe in endless clutter. Our store offers a curated feed of beautiful items so you spend less time searching and more time enjoying.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Support Under 24h</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Got questions about products, dimensions, or shipping? Our active contact desk is open to assist you with quick, real support.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA SECTION: Highly structured with solid slate-900 card and brand button */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            {/* Solid decorative ambient highlights with zero gradient color blending */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-purple-light">
                <Store className="h-3.5 w-3.5" />
                <span>ShopZone Collections</span>
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Ready to Upgrade Your Essentials?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-md mx-auto">
                Explore our handpicked curated premium selections, fill your wishlist, experience the responsive layout, and find what you need today.
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={onShopClick}
                  className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/30 transition-all cursor-pointer group text-[15px]"
                >
                  <span>EXPLORE OUR PRODUCTS</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
