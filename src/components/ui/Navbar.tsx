"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, CpuIcon, Laptop2, GraduationCap, FolderGit2 } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "../ThemeToggle";

const ecosystemLinks = [
  {
    href: "/projects",
    label: "Projects",
    icon: FolderGit2,
    description: "Hub of my experiments & builds"
  },
  {
    href: "https://lab.justinsaju.me",
    label: "The Lab",
    icon: FlaskConical,
    description: "Interactive demos & POCs",
    external: true
  },
  {
    href: "https://tools.justinsaju.me",
    label: "Dev Tools",
    icon: Wrench,
    description: "Calculators & Utilities",
    external: true
  },
  {
    href: "https://notes.justinsaju.me",
    label: "Notes",
    icon: NotebookPen,
    description: "Digital garden & cheatsheets",
    external: true
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
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
            backgroundColor: isScrolled ? "rgba(30, 27, 75, 0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(16px)" : "none",
            border: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
            boxShadow: isScrolled ? "0 0 40px -10px rgba(124, 58, 237, 0.3)" : "none",
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
                style={{ backgroundColor: "#a78bfa" }}
                className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-lg group-hover:scale-105 transition-transform"
              >
                <span style={{ color: "#030014" }}>J</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span style={{ color: "var(--foreground)" }} className="font-bold text-lg tracking-tight">Justin Jacob</span>
                <span style={{ color: "var(--foreground)" }} className="font-bold text-lg tracking-tight">Saju</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                style={{ color: "var(--foreground-muted)" }}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Home
              </Link>

              {/* Ecosystem Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setEcosystemOpen(true)}
                onMouseLeave={() => setEcosystemOpen(false)}
              >
                <button
                  style={{ color: "var(--foreground-muted)" }}
                  className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity py-4"
                >
                  Ecosystem
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${ecosystemOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {ecosystemOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        backgroundColor: "rgba(10, 22, 40, 0.95)",
                        borderColor: "rgba(139, 92, 246, 0.2)",
                        backdropFilter: "blur(20px)",
                      }}
                      className="absolute top-full -left-4 w-64 p-2 rounded-xl border shadow-xl flex flex-col gap-1"
                    >
                      {ecosystemLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                        >
                          <div className="mt-1 p-1.5 rounded-md bg-accent-purple/10 text-accent-cyan group-hover/item:bg-accent-purple/20 transition-colors">
                            <link.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div style={{ color: "var(--foreground)" }} className="text-sm font-medium transition-colors">
                              {link.label}
                            </div>
                            <div style={{ color: "var(--foreground-dim)" }} className="text-xs">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/blog"
                style={{ color: "var(--foreground-muted)" }}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Blog
              </Link>
              <ThemeToggle />
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="https://portfolio.justinsaju.me"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  boxShadow: "0 0 20px -5px rgba(124, 58, 237, 0.5)",
                }}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              >
                Portfolio
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: "var(--foreground-muted)" }}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
              style={{
                backgroundColor: "rgba(30, 27, 75, 0.95)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              className="md:hidden rounded-b-2xl mx-4 mb-4 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "var(--foreground-muted)" }}
                  className="block py-2.5 px-4 hover:bg-white/5 rounded-lg transition-colors"
                >
                  Home
                </Link>

                <div className="py-2">
                  <span className="px-4 text-xs font-semibold text-accent-cyan uppercase tracking-wider">Ecosystem</span>
                  {ecosystemLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ color: "var(--foreground-muted)" }}
                      className="flex items-center gap-2 py-2.5 px-4 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "var(--foreground-muted)" }}
                  className="block py-2.5 px-4 hover:bg-white/5 rounded-lg transition-colors"
                >
                  Blog
                </Link>

                <Link
                  href="https://portfolio.justinsaju.me"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: "#7c3aed", color: "#ffffff" }}
                  className="block py-2.5 px-4 mt-4 font-semibold rounded-lg text-center"
                >
                  Portfolio
                </Link>
              </div>
            </motion.div>
          )}
        </motion.header>
      </div>
    </>
  );
}
