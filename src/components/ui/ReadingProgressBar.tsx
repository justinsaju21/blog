"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressBarProps {
    readTime?: string;
}

export function ReadingProgressBar({ readTime }: ReadingProgressBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            // Show progress bar after scrolling past 200px
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
        >
            {/* Background bar */}
            <div className="h-1 w-full bg-midnight/50 backdrop-blur-sm">
                {/* Progress indicator */}
                <motion.div
                    className="h-full origin-left"
                    style={{
                        scaleX,
                        background: "linear-gradient(90deg, #7c3aed 0%, #c084fc 50%, #a78bfa 100%)",
                        boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
                    }}
                />
            </div>

            {/* Read time badge */}
            {readTime && (
                <div className="absolute right-4 top-3 pointer-events-auto">
                    <div
                        className="px-3 py-1 text-xs font-medium rounded-full bg-midnight/80 text-foreground-muted border border-white/10 backdrop-blur-sm"
                    >
                        {readTime}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
