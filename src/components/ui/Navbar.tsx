"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      {/* Outer container for positioning */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto transition-all duration-500 ease-out ${isScrolled
            ? "mt-4 w-[95%] max-w-[800px] rounded-full bg-midnight-light/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)]"
            : "w-full bg-transparent border-b border-transparent pt-4"
            }`}
        >
          <nav className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "px-6 py-3" : "px-6 md:px-12 py-2 max-w-7xl mx-auto"
            }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#a78bfa] text-midnight font-bold text-lg group-hover:scale-105 transition-transform">
                J
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-lg text-foreground tracking-tight">Justin Jacob</span>
                <span className="font-bold text-lg text-foreground tracking-tight">Saju</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground-muted hover:text-accent-cyan transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="#newsletter"
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] ${isScrolled
                  ? "bg-accent-purple text-white hover:bg-accent-purple/90"
                  : "bg-accent-purple text-white hover:bg-accent-purple/90"
                  }`}
              >
                Subscribe
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden border-t border-white/10 bg-midnight-light/95 backdrop-blur-xl rounded-b-2xl mx-4 mb-4"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 px-4 text-foreground-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#newsletter"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-4 mt-2 bg-accent-purple text-white font-semibold rounded-lg text-center"
                >
                  Subscribe
                </Link>
              </div>
            </motion.div>
          )}
        </motion.header>
      </div>

      {/* Spacer removed since navbar floats over content initially */}
    </>
  );
}
