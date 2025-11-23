"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  /** The current view/page being displayed (e.g., 'about', 'work'). */
  view: string;
  /** Function to set the active view/page. */
  setView: (view: string) => void;
  /** Boolean state for dark mode. */
  isDarkMode: boolean;
  /** Function to toggle dark mode state. */
  toggleDarkMode: () => void;
}

/**
 * Fixed, Z-Indexed, and Dark/Light responsive navigation bar.
 * This component is designed to sit at the top of the viewport.
 */
const SmallNavbar: React.FC<NavbarProps> = ({ view, setView, isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper component for navigation links
  const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <button 
      onClick={() => {
        setView(to);
        setIsMobileMenuOpen(false); // Close menu on link click
      }}
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-500 
        ${view === to ? 'text-purple-500' : 'text-zinc-700 dark:text-zinc-300'}`}
    >
      {children}
      {/* Active Indicator - using Framer Motion for smooth transition */}
      {view === to && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500"
        />
      )}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 bg-pink-900 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg dark:shadow-zinc-900/50 transition-colors duration-300 border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <button onClick={() => setView('work')} className="text-xl font-extrabold tracking-widest text-zinc-900 dark:text-white transition-colors duration-300">
            THE WORK
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavLink to="about">About</NavLink>
            <NavLink to="work">Work</NavLink>
            <NavLink to="services">Services</NavLink>
            <NavLink to="contact">
              <span className="px-4 py-2 bg-purple-500 text-white rounded-full font-semibold text-sm hover:bg-purple-600 transition-colors duration-300 shadow-md shadow-purple-500/30">
                Contact Us
              </span>
            </NavLink>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-4 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'moon' : 'sun'}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu & Dark Mode Toggles */}
          <div className="flex lg:hidden items-center space-x-2">
             <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'moon-m' : 'sun-m'}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-6 pb-6 bg-white dark:bg-black overflow-hidden border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex flex-col space-y-1 pt-4 text-zinc-900 dark:text-white font-medium">
              <button 
                onClick={() => {setView('about'); setIsMobileMenuOpen(false);}} 
                className="text-left py-3 border-b border-zinc-200 dark:border-zinc-800 hover:text-purple-500 transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => {setView('work'); setIsMobileMenuOpen(false);}} 
                className="text-left py-3 border-b border-zinc-200 dark:border-zinc-800 hover:text-purple-500 transition-colors duration-200"
              >
                Work
              </button>
              <button 
                onClick={() => {setView('services'); setIsMobileMenuOpen(false);}} 
                className="text-left py-3 border-b border-zinc-200 dark:border-zinc-800 hover:text-purple-500 transition-colors duration-200"
              >
                Services
              </button>
              <button 
                onClick={() => {setView('contact'); setIsMobileMenuOpen(false);}} 
                className="text-left py-3 text-purple-500 hover:text-purple-600 transition-colors duration-200"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SmallNavbar;