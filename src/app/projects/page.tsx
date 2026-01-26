"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

const projects: { title: string; description: string; link: string; status: string; tags: string[]; }[] = [
    // Add your projects here
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--background)]">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                    style={{ color: "var(--foreground-muted)" }}
                    className="inline-flex items-center gap-2 text-sm mb-10 transition-opacity hover:opacity-80 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Gateway
                </Link>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="heading-lg mb-4"
                >
                    <span style={{ color: "var(--foreground)" }}>Projects </span>
                    <span className="text-gradient">Hub</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ color: "var(--foreground-dim)" }}
                    className="body-lg mb-8 max-w-2xl"
                >
                    A collection of my experiments, demos, and live projects.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.length > 0 ? (
                        projects.map((project, idx) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="glass-card rounded-2xl p-6 group"
                                style={{
                                    backgroundColor: "rgba(30, 27, 75, 0.6)",
                                    border: "1px solid rgba(139, 92, 246, 0.3)",
                                }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 style={{ color: "var(--foreground)" }} className="text-xl font-bold">{project.title}</h3>
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: project.status === "Live" ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.2)",
                                            color: project.status === "Live" ? "#4ade80" : "#facc15",
                                            border: `1px solid ${project.status === "Live" ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
                                        }}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <p style={{ color: "var(--foreground-muted)" }} className="text-sm mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-1 rounded-md"
                                            style={{ backgroundColor: "rgba(30, 27, 75, 0.8)", color: "var(--foreground-dim)" }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#a78bfa" }}
                                    className="inline-flex items-center gap-2 font-medium text-sm hover:underline group"
                                >
                                    View Live
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-12">
                            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4">
                                <ExternalLink className="w-8 h-8 text-foreground-dim" />
                            </div>
                            <h3 className="text-xl font-medium text-foreground mb-2">Projects Incoming...</h3>
                            <p className="text-foreground-dim max-w-md mx-auto">
                                I&apos;m currently curating my best work. Stay tuned for live demos and case studies!
                            </p>
                        </div>
                    )}
                </div>

                <AdBanner slot="projects-footer" className="mt-12" />
            </div>
        </div>
    );
}
