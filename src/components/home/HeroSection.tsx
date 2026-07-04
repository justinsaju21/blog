"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ParticleNetwork } from "./ParticleNetwork";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
            <ParticleNetwork />
            {/* Animated Background from Photography Platform */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--hero-gradient-overlay)' }} />
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mb-6 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, color: 'var(--text-primary)', textShadow: 'var(--hero-text-shadow)' }}
                >
                    <span className="block mb-2">Engineering Ideas &</span>
                    <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                        Tech Insights
                    </span>
                </motion.h1>


                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <a
                        href="#posts"
                        className="px-8 py-3.5 rounded-full transition-all hover:scale-105"
                        style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 500, fontSize: 15 }}
                    >
                        Explore Articles
                    </a>
                    <a
                        href="#newsletter"
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full transition-all"
                        style={{ background: 'var(--hero-btn-bg)', color: 'var(--text-primary)', border: '1px solid var(--hero-btn-border)', fontWeight: 500, fontSize: 15 }}
                    >
                        Subscribe
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
