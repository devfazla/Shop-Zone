import React, { useState } from "react";
import { ShoppingCart, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedAddToCartButtonProps {
  onAdd: (e?: React.MouseEvent) => void;
  className?: string;
  variant?: "icon-only" | "full" | "compact";
  label?: string;
  successLabel?: string;
  disabled?: boolean;
  id?: string;
}

export default function AnimatedAddToCartButton({
  onAdd,
  className = "",
  variant = "icon-only",
  label = "ADD TO CART",
  successLabel = "ADDED!",
  disabled = false,
  id,
}: AnimatedAddToCartButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showRipples, setShowRipples] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    setIsSuccess(true);
    setShowRipples(true);

    onAdd(e);

    setTimeout(() => {
      setShowRipples(false);
    }, 600);

    setTimeout(() => {
      setIsSuccess(false);
    }, 1400);
  };

  if (variant === "icon-only") {
    return (
      <div className="relative inline-flex items-center justify-center">
        {/* Radiating Ripple Wave on Click */}
        {showRipples && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-xl bg-brand-purple pointer-events-none z-10"
          />
        )}

        <motion.button
          id={id}
          type="button"
          disabled={disabled}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className={`relative p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center select-none shadow-md overflow-hidden ${
            isSuccess
              ? "bg-emerald-600 text-white shadow-emerald-500/25"
              : "bg-brand-purple hover:bg-brand-purple-dark text-white shadow-brand-purple/15 hover:shadow-brand-purple/25"
          } ${className}`}
          title={isSuccess ? "Added to Cart!" : "Quick Add to Cart"}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center justify-center"
              >
                <Check className="h-4.5 w-4.5 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="cart"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="flex items-center justify-center"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  }

  // Full or Compact Variant (with label and icon)
  return (
    <div className="relative w-full">
      {/* Radiating Ripple Wave */}
      {showRipples && (
        <motion.span
          initial={{ scale: 0.95, opacity: 0.6 }}
          animate={{ scale: 1.06, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 rounded-xl bg-brand-purple pointer-events-none z-10"
        />
      )}

      <motion.button
        id={id}
        type="button"
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={handleClick}
        className={`relative w-full h-12 rounded-xl font-black text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-2.5 transition-all select-none shadow-lg cursor-pointer overflow-hidden ${
          disabled
            ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            : isSuccess
            ? "bg-emerald-600 text-white shadow-emerald-600/25"
            : "bg-brand-purple hover:bg-brand-purple-dark text-white shadow-brand-purple/20"
        } ${className}`}
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="flex items-center space-x-2 text-white font-black"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </motion.div>
              <span className="tracking-widest uppercase">{successLabel}</span>
              <Sparkles className="h-4 w-4 text-emerald-200 animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              key="default-state"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center space-x-2.5"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              <span>{label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
