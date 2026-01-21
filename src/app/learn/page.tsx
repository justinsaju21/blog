"use client";

import { motion } from "framer-motion";
import { GraduationCap, ChevronRight, BookOpen, FileCode, Lightbulb, Map } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/tilt-card";

const learnTopics = [
    {
        title: "5G Fundamentals",
        description: "From OFDM to beamforming - the building blocks of 5G NR.",
        tags: ["5G", "Wireless", "Theory"],
        icon: Lightbulb,
        color: "#22d3ee",
    },
    {
        title: "Verilog Cheatsheet",
        description: "Quick reference for synthesizable Verilog constructs.",
        tags: ["Verilog", "VLSI", "Reference"],
        icon: FileCode,
        color: "#a78bfa",
    },
    {
        title: "React Patterns",
        description: "Common patterns for building scalable React apps.",
        tags: ["React", "JavaScript", "Patterns"],
        icon: BookOpen,
        color: "#f472b6",
    },
    {
        title: "Engineering Roadmap",
        description: "My personal learning path for ECE & CS.",
        tags: ["Career", "Learning", "Guide"],
        icon: Map,
        color: "#4ade80",
    },
];

export default function LearnPage() {
    return (
        <section className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-green-500/10 border border-green-500/20">
                        <GraduationCap className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Learn & Explore</span>
                    </div>
                    <h1 className="heading-xl mb-4">
                        <span className="text-foreground">The </span>
                        <span className="text-gradient">Knowledge Base</span>
                    </h1>
                    <p className="body-lg text-foreground-dim max-w-2xl mx-auto">
                        Tutorials, cheatsheets, and concept maps. My digital garden of engineering knowledge.
                    </p>
                </motion.div>

                {/* Topics Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {learnTopics.map((topic, index) => (
                        <motion.div
                            key={topic.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard>
                                <div
                                    className="p-6 rounded-2xl h-full group cursor-pointer"
                                    style={{
                                        backgroundColor: "rgba(30, 27, 75, 0.6)",
                                        border: "1px solid rgba(139, 92, 246, 0.3)",
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{ backgroundColor: `${topic.color}20` }}
                                        >
                                            <topic.icon
                                                className="w-6 h-6"
                                                style={{ color: topic.color }}
                                            />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-foreground-dim group-hover:translate-x-1 group-hover:text-accent-cyan transition-all" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {topic.title}
                                    </h3>
                                    <p className="text-foreground-muted text-sm mb-4">
                                        {topic.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {topic.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-xs rounded-full bg-white/5 text-foreground-dim border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-purple/20 text-accent-cyan border border-accent-purple/30 hover:bg-accent-purple/30 transition-colors"
                    >
                        Read the Blog
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
