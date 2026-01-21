"use client";

import { motion } from "framer-motion";
import { Cpu, ChevronRight, CircuitBoard, Wifi, Zap } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/tilt-card";

const hardwareProjects = [
    {
        title: "STM32 Smart Home Controller",
        description: "IoT home automation using STM32F4 with MQTT protocol.",
        tags: ["STM32", "MQTT", "IoT"],
        icon: CircuitBoard,
        color: "#22d3ee",
    },
    {
        title: "VLSI ALU Design",
        description: "8-bit Arithmetic Logic Unit designed in Verilog.",
        tags: ["Verilog", "VLSI", "Digital Design"],
        icon: Cpu,
        color: "#a78bfa",
    },
    {
        title: "5G Antenna Array Simulation",
        description: "Beamforming simulation for mm-wave 5G antennas.",
        tags: ["5G", "MATLAB", "RF"],
        icon: Wifi,
        color: "#f472b6",
    },
    {
        title: "ESP32 Power Monitor",
        description: "Real-time current/voltage monitoring with INA219.",
        tags: ["ESP32", "I2C", "Sensors"],
        icon: Zap,
        color: "#fbbf24",
    },
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
                    {hardwareProjects.map((project, index) => (
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
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-purple/20 text-accent-cyan border border-accent-purple/30 hover:bg-accent-purple/30 transition-colors"
                    >
                        View All Projects
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
