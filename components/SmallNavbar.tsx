"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface NavbarProps {
  view: string;
  setView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavLinkProps {
  to: string;
  view: string;
  setView: (view: string) => void;
  children: React.ReactNode;
  closeMenu?: () => void;
}

/* ---------------------------------------------
    ✅ NavLink Component (Declared OUTSIDE render)
---------------------------------------------- */
const NavLink: React.FC<NavLinkProps> = ({
  to,
  view,
  setView,
  children,
  closeMenu,
}) => (
  <button
    onClick={() => {
      setView(to);
      closeMenu?.();
    }}
    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 
      ${view === to ? "text-purple-500" : "text-zinc-700 dark:text-zinc-300"}`}
  >
    {children}

    {view === to && (
      <motion.span
        layoutId="nav-indicator"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500"
      />
    )}
  </button>
);

/* ---------------------------------------------
    ✅ Main Navbar Component
---------------------------------------------- */
const SmallNavbar: React.FC<NavbarProps> = ({
  view,
  setView,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg dark:shadow-zinc-900/50 border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => setView("work")}
            className="text-xl font-extrabold tracking-widest text-zinc-900 dark:text-white"
          >
            THE WORK
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              href="/about"
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
            >
              About
            </Link>
            <Link
              href="/work"
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
            >
              Work
            </Link>
            <Link
              href="/service"
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
            >
              Services
            </Link>
            <Link
              href="mailto:support@zoga.studio"
              className="px-4 py-2 bg-purple-500 text-white rounded-full font-semibold text-sm hover:bg-purple-600 transition-colors duration-300 shadow-md shadow-purple-500/30"
            >
              Contact Us
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-4 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? "moon" : "sun"}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={isDarkMode ? "moon-m" : "sun-m"}>
                  {isDarkMode ? (
                    <Sun className="w-6 h-6" />
                  ) : (
                    <Moon className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-6 pb-6 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex flex-col space-y-1 pt-4">
              <Link
                href="/about"
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/work"
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/service"
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="mailto:support@zoga.studio"
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 text-zinc-700 dark:text-zinc-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SmallNavbar;
