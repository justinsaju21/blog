"use client";

import { motion } from "framer-motion";
import { Cpu, ChevronRight, CircuitBoard, Wifi, Zap } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import Link from "next/link";
import { TiltCard } from "@/components/ui/tilt-card";

const hardwareProjects: { title: string; description: string; tags: string[]; icon: any; color: string; }[] = [
    // Add your hardware projects here
];

export default function HardwarePage() {
    return (
        <section className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-accent-cyan/10 border border-accent-cyan/20">
                        <Cpu className="w-4 h-4 text-accent-cyan" />
                        <span className="text-sm font-medium text-accent-cyan">Hardware & Embedded</span>
                    </div>
                    <h1 className="heading-xl mb-4">
                        <span className="text-foreground">The </span>
                        <span className="text-gradient">Hardware Lab</span>
                    </h1>
                    <p className="body-lg text-foreground-dim max-w-2xl mx-auto">
                        Embedded systems, VLSI designs, and IoT experiments. Where silicon meets code.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {hardwareProjects.length > 0 ? (
                        hardwareProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
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
                                                style={{ backgroundColor: `${project.color}20` }}
                                            >
                                                <project.icon
                                                    className="w-6 h-6"
                                                    style={{ color: project.color }}
                                                />
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-foreground-dim group-hover:translate-x-1 group-hover:text-accent-cyan transition-all" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-foreground-muted text-sm mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
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
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-12">
                            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4">
                                <CircuitBoard className="w-8 h-8 text-foreground-dim" />
                            </div>
                            <h3 className="text-xl font-medium text-foreground mb-2">Projects Loading...</h3>
                            <p className="text-foreground-dim max-w-md mx-auto">
                                The hardware lab is currently under construction. Check back soon for embedded and VLSI projects!
                            </p>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-purple/20 text-accent-cyan border border-accent-purple/30 hover:bg-accent-purple/30 transition-colors"
                    >
                        View All Projects
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                <AdBanner slot="hardware-footer" className="mt-20" />
            </div>
        </section>
    );
}
