import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedWishlistButtonProps {
  isFavorited: boolean;
  onToggle: (e?: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  labelActive?: string;
  labelInactive?: string;
  id?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export default function AnimatedWishlistButton({
  isFavorited,
  onToggle,
  className = "",
  size = "md",
  showLabel = false,
  labelActive = "Saved",
  labelInactive = "Save to Wishlist",
  id,
}: AnimatedWishlistButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 600);

    // If adding to favorites, trigger celebratory sparkle/heart particles
    if (!isFavorited) {
      const newParticles: Particle[] = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 50,
        y: -20 - Math.random() * 35,
        scale: 0.6 + Math.random() * 0.5,
        rotation: Math.random() * 40 - 20,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 800);
    }

    onToggle(e);
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5 w-5",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Floating Burst Particles on Favorite */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, p.scale, 0],
              x: p.x,
              y: p.y,
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute pointer-events-none z-30 text-rose-500"
          >
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Interactive Button */}
      <motion.button
        id={id}
        type="button"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.08 }}
        onClick={handleClick}
        className={`relative inline-flex items-center justify-center cursor-pointer transition-colors select-none ${className}`}
      >
        {/* Heart Icon with Spring Pop Animation */}
        <motion.div
          animate={
            isPopping
              ? {
                  scale: [1, 0.65, 1.45, 0.95, 1.1, 1],
                  rotate: isFavorited ? [0, -12, 12, 0] : [0, 15, -15, 0],
                }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <Heart
            className={`${iconSizes[size]} transition-all duration-300 ${
              isFavorited
                ? "fill-rose-500 text-rose-500 filter drop-shadow-[0_2px_6px_rgba(244,63,94,0.35)]"
                : "text-slate-400 hover:text-rose-500"
            }`}
          />
        </motion.div>

        {showLabel && (
          <span className="ml-2 font-bold tracking-tight">
            {isFavorited ? labelActive : labelInactive}
          </span>
        )}
      </motion.button>
    </div>
  );
}
