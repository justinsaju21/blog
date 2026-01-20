"use client";
// Trigger deploy fix v3

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none bg-background">
                {/* Main Purple Glow - Top Left */}
                <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-accent-purple rounded-full blur-[180px] opacity-20" />

                {/* Secondary Blue/Purple Glow - Bottom Right */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-blue rounded-full blur-[150px] opacity-20" />

                {/* Center subtle glow */}
                <div className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[800px] h-[400px] bg-accent-purple rounded-full blur-[150px] opacity-10" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-grid opacity-[0.05]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-accent-purple/30 bg-midnight-light/30 backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-accent-cyan"></span>
                    <span className="text-foreground-muted text-xs font-semibold tracking-wide uppercase">
                        SRM IST KTR • Engineering Student
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="heading-xl mb-6 tracking-tight"
                >
                    <span className="block text-foreground mb-2">Engineering Ideas &</span>
                    <span className="bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent inline-block filter drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                        Tech Insights
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="body-lg text-foreground-dim max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Exploring <span className="text-accent-cyan font-medium">embedded systems</span>,{" "}
                    <span className="text-accent-purple font-medium">VLSI</span>,{" "}
                    <span className="text-accent-pink font-medium">5G communications</span>, and{" "}
                    <span className="text-accent-blue font-medium">AI-driven solutions</span>.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <a
                        href="#posts"
                        className="px-8 py-3.5 rounded-full bg-accent-purple text-white font-semibold transition-all shadow-[0_0_30px_-5px_rgba(124,58,237,0.6)] hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.8)] hover:scale-105"
                    >
                        Explore Articles
                    </a>
                    <a
                        href="#newsletter"
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-midnight-light/50 border border-glass-border text-foreground font-semibold hover:bg-midnight-light transition-all"
                    >
                        Subscribe
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}


