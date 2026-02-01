"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "../ThemeToggle";

const navLinks = [
  { href: "/", label: "Blog" },
  { href: "/author", label: "Authors" },
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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            marginTop: isScrolled ? "1rem" : "0",
            width: isScrolled ? "95%" : "100%",
            maxWidth: isScrolled ? "800px" : "none",
            borderRadius: isScrolled ? "9999px" : "0",
            backgroundColor: isScrolled ? "var(--glass-bg)" : "transparent",
            backdropFilter: isScrolled ? "blur(16px)" : "none",
            border: isScrolled ? "1px solid var(--glass-border)" : "none",
            boxShadow: isScrolled ? "0 0 40px -10px rgba(124, 58, 237, 0.15)" : "none",
            paddingTop: isScrolled ? "0" : "1rem",
          }}
          className="pointer-events-auto transition-all duration-500 ease-out"
        >
          <nav
            style={{
              padding: isScrolled ? "0.75rem 1.5rem" : "0.5rem 1.5rem",
              maxWidth: isScrolled ? "none" : "80rem",
              margin: isScrolled ? "0" : "0 auto",
            }}
            className="flex items-center justify-between transition-all duration-500"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                style={{ backgroundColor: "var(--accent-cyan)" }}
                className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-lg group-hover:scale-105 transition-transform"
              >
                <span style={{ color: "var(--background)" }}>J</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span style={{ color: "var(--foreground)" }} className="font-bold text-lg tracking-tight">Justin&apos;s</span>
                <span style={{ color: "var(--accent-cyan)" }} className="font-bold text-lg tracking-tight">Blog</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: "var(--foreground-muted)" }}
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://justinsaju.me"
                style={{ color: "var(--foreground-muted)" }}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                ← Gateway
              </a>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X style={{ color: "var(--foreground)" }} className="w-6 h-6" />
                ) : (
                  <Menu style={{ color: "var(--foreground)" }} className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "var(--glass-bg)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: "var(--foreground)" }}
                className="text-2xl font-semibold hover:text-purple-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://justinsaju.me"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "var(--foreground)" }}
              className="text-2xl font-semibold hover:text-purple-400 transition-colors"
            >
              ← Back to Gateway
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
