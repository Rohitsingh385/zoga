import { motion } from "framer-motion";
import React, { ReactNode, useRef, useState } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "outline";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    setPosition({
      x: (clientX - (left + width / 2)) * 0.2,
      y: (clientY - (top + height / 2)) * 0.2,
    });
  };

  const styles =
    variant === "primary"
      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-indigo-500/20"
      : "bg-transparent border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5";

  return (
    <motion.button
      ref={ref}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-bold text-sm transition-transform active:scale-95 ${styles} ${className}`}
    >
      {children}
    </motion.button>
  );
}
