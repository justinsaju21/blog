"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

const socialLinks = [
    { href: "https://github.com/justinsaju21", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/justin-jacob-saju-742b28270/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/justinnnn_21", icon: Instagram, label: "Instagram" },
    { href: "mailto:justinsaju21@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
    { href: "/", label: "Blog" },
    { href: "/author", label: "Authors" },
];

export function Footer() {
    return (
        <footer className="relative pt-20 pb-8 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
            </div>

            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6">
                {/* Main footer content */}
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* Brand column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center gap-2.5 group inline-block mb-4" style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 24,
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
                                style={{ width: 28, height: 28, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }}
                            >
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                            </svg>
                            <span style={{ verticalAlign: 'middle', fontWeight: 600 }}>Echo Blogs</span>
                        </Link>
                        <p className="text-foreground-dim text-sm leading-relaxed mb-6">
                            Exploring embedded systems, VLSI, 5G communications, and AI-driven solutions.
                        </p>
                        {/* Social links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg bg-glass-bg border border-glass-border hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 text-foreground-muted group-hover:text-accent-cyan transition-colors" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-foreground font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground-muted hover:text-accent-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* External Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-foreground font-semibold mb-6">More</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://justinsaju.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground-muted hover:text-accent-cyan transition-colors text-sm"
                                >
                                    Main Website
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://portfolio.justinsaju.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground-muted hover:text-accent-cyan transition-colors text-sm"
                                >
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://projects.justinsaju.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground-muted hover:text-accent-cyan transition-colors text-sm"
                                >
                                    Projects Hub
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-glass-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-foreground-dim text-sm flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Justin Jacob Saju
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-foreground-dim text-xs">
                            <Link href="/privacy" className="hover:text-accent-cyan transition-colors">Privacy Policy</Link>
                            <span className="hidden sm:inline">•</span>
                            <Link href="/terms" className="hover:text-accent-cyan transition-colors">Terms of Service</Link>
                            <span className="hidden sm:inline">•</span>
                            <span>© {new Date().getFullYear()} Echo Blogs. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
