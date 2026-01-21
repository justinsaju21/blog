"use client";

import { motion } from "framer-motion";

export function BlogHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h1 className="heading-lg mb-4">
                <span style={{ color: "var(--foreground)" }}>The </span>
                <span className="text-gradient">Blog</span>
            </h1>
            <p style={{ color: "var(--foreground-dim)" }} className="body-lg max-w-2xl">
                Exploring embedded systems, VLSI, 5G communications, and AI-driven solutions.
            </p>
        </motion.div>
    );
}
