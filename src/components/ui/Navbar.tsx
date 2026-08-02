"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "../ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/author", label: "Authors" },
  { href: "https://justinsaju.me", label: "Gateway" },
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
            <Link href="/" className="flex items-center gap-2.5 group" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 22, height: 22, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }}
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span style={{ verticalAlign: 'middle', fontWeight: 600 }}>Echo Blogs</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: "var(--text-secondary)" }}
                  className="text-sm font-medium hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/saved" style={{ color: "var(--text-secondary)" }} className="hover:text-[var(--text-primary)] transition-colors" aria-label="Saved Posts">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </Link>
              <Link href="/#blog-search" style={{ color: "var(--text-secondary)" }} className="hover:text-[var(--text-primary)] transition-colors" aria-label="Search Articles">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </Link>
              <ThemeToggle />
              <Link
                href="/submit"
                style={{
                  display: 'block',
                  padding: '8px 20px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
                className="hover:scale-105 transition-transform"
              >
                Submit
              </Link>
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
