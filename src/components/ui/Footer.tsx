"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Heart } from "lucide-react";

const socialLinks = [
    { href: "https://github.com/justinsaju21", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/justin-jacob-saju-742b28270/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/justinnnn_21", icon: Instagram, label: "Instagram" },
    { href: "mailto:justinsaju21@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
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
                        <Link href="/" className="inline-block mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
                                    <span className="text-midnight font-bold text-lg">J</span>
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-foreground">Justin Jacob</span>
                                    <span className="text-lg font-light text-foreground-dim ml-1">Saju</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-foreground-muted body-md mb-6 max-w-xs">
                            Engineering student passionate about embedded systems, VLSI, and building innovative solutions.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 rounded-xl glass hover:border-accent-cyan/40 transition-colors group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 text-foreground-muted group-hover:text-accent-cyan transition-colors" />
                                </motion.a>
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
                        <h4 className="text-foreground font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/50 group-hover:bg-accent-cyan transition-colors" />
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter mini */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-foreground font-semibold mb-6">Stay Updated</h4>
                        <p className="text-foreground-muted text-sm mb-4">
                            Get notified when new articles are published.
                        </p>
                        <Link
                            href="#newsletter"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:border-accent-cyan/50 transition-colors group"
                        >
                            Subscribe to newsletter
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-glass-border">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-foreground-dim text-sm flex items-center gap-1.5">
                            © {new Date().getFullYear()} Justin Jacob Saju. Made with
                            <Heart className="w-3.5 h-3.5 text-accent-pink fill-accent-pink" />
                            at SRM IST KTR
                        </p>
                        <p className="text-foreground-dim text-xs">
                            Built with Next.js + Sanity
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
