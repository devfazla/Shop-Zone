import React from "react";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../data";
import { motion } from "motion/react";
import ImageWithFallback from "./ImageWithFallback";

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
  scrollToProducts: () => void;
}

export default function Categories({ onCategorySelect, scrollToProducts }: CategoriesProps) {
  const handleCategoryClick = (id: string) => {
    onCategorySelect(id);
    scrollToProducts();
  };

  return (
    <section id="categories-section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Top Categories
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick("all")}
            className="inline-flex items-center text-[13.5px] font-bold text-brand-purple border border-brand-purple/20 hover:border-brand-purple bg-transparent hover:bg-brand-purple hover:text-white rounded-xl px-4.5 py-2.5 transition-all duration-300 cursor-pointer shadow-xs"
          >
            <span>View All Categories</span>
          </button>
        </div>

        {/* Categories Grid (Responsive) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
              onClick={() => handleCategoryClick(cat.id)}
              className="bg-[#F8FAFC] border border-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
            >
              {/* Circular cropped image of item */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white mb-5 shadow-inner border border-slate-100 flex items-center justify-center p-1.5 group">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  fallbackText={cat.name}
                />
              </div>

              {/* Title and items count */}
              <h3 className="text-[15px] font-bold text-slate-800 leading-tight">
                {cat.name}
              </h3>
              <p className="text-[11px] sm:text-[12px] text-slate-400 font-semibold mt-1 bg-white border border-slate-100 rounded-full px-3 py-0.5 shadow-sm">
                {cat.count} Items
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
