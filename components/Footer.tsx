"use client";

import Link from "next/link";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#020205] dark:bg-white text-white dark:text-black pt-20 pb-10 border-t border-white/10 dark:border-black/10">
    <div className="max-w-7xl mx-auto px-6">
      {/* MAIN GRID */}
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        
        {/* LOGO + DESCRIPTION */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white dark:text-white">
              Z
            </div>
            <span className="text-2xl font-bold">Zoga</span>
          </div>

          <p className="text-slate-400 dark:text-slate-600 max-w-sm leading-relaxed mb-8">
            Building the digital future of Jharkhand and beyond. We combine
            local insights with global tech standards.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
              <div
                key={i}
                className="p-2 bg-white dark:bg-black rounded-full border 
                border-zinc-200 dark:border-zinc-800 
                hover:border-purple-500 hover:text-purple-500 
                transition-all cursor-pointer"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-slate-400 dark:text-slate-600">
            <li>
              <Link href="/services/web-development" className="hover:text-white dark:hover:text-black transition-colors">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/services/mobile-apps" className="hover:text-white dark:hover:text-black transition-colors">
                Mobile Apps
              </Link>
            </li>
            <li>
              <Link href="/services/ui-ux" className="hover:text-white dark:hover:text-black transition-colors">
                UI/UX Design
              </Link>
            </li>
            <li>
              <Link href="/services/digital-marketing" className="hover:text-white dark:hover:text-black transition-colors">
                Digital Marketing
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-slate-400 dark:text-slate-600">
            <li>
              <Link href="/about" className="hover:text-white dark:hover:text-black transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white dark:hover:text-black transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white dark:hover:text-black transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white dark:hover:text-black transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="pt-8 border-t border-white/10 dark:border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-600">
        <p>© 2025 Zoga Digital Agency. All rights reserved.</p>
        <p>Made with ❤️ in Ranchi, India.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
