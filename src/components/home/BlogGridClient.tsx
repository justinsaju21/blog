"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Pen } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/sanity.types";

const categoryColors: Record<string, string> = {
    Embedded: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30",
    VLSI: "bg-accent-purple/20 text-accent-purple border-accent-purple/30",
    "5G": "bg-accent-blue/20 text-accent-blue border-accent-blue/30",
    AI: "bg-accent-pink/20 text-accent-pink border-accent-pink/30",
    Technology: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30",
    Engineering: "bg-accent-blue/20 text-accent-blue border-accent-blue/30",
};

function formatDate(dateString: string): string {
    try {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateString;
    }
}

interface BlogGridClientProps {
    posts: Post[];
}

export function BlogGridClient({ posts }: BlogGridClientProps) {
    const hasPosts = posts && posts.length > 0;

    return (
        <section id="posts" className="py-24 px-6 relative">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
                        LATEST ARTICLES
                    </span>
                    <h2 className="heading-lg mb-4">
                        Exploring <span className="text-gradient">Ideas</span>
                    </h2>
                    <p className="text-foreground-muted body-md max-w-xl mx-auto">
                        Thoughts on engineering, technology, and building things that matter.
                    </p>
                </motion.div>

                {/* Blog Grid or Empty State */}
                {hasPosts ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link href={`/blog/${post.slug?.current || ""}`}>
                                        <div className="glass rounded-2xl p-8 h-full hover:glow hover:scale-[1.02] transition-all duration-500 group cursor-pointer relative overflow-hidden">
                                            {/* Hover gradient effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10">
                                                {/* Category Badges */}
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {(post.categories || ["General"]).map((cat: string) => (
                                                        <span
                                                            key={cat}
                                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[cat] ||
                                                                "bg-cobalt/50 text-foreground-muted border-cobalt"
                                                                }`}
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Title */}
                                                <h3 className="heading-sm mb-4 group-hover:text-accent-cyan transition-colors duration-300">
                                                    {post.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-foreground-muted body-md mb-6 line-clamp-2">
                                                    {post.excerpt}
                                                </p>

                                                {/* Meta */}
                                                <div className="flex items-center justify-between text-foreground-dim text-sm pt-4 border-t border-glass-border">
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(post.publishedAt)}
                                                        </span>
                                                        {/* Author Name - Added per request */}
                                                        {post.author?.name && (
                                                            <span className="hidden md:flex items-center gap-1.5 text-accent-cyan/80">
                                                                <span className="w-1 h-1 rounded-full bg-accent-cyan/50" />
                                                                {post.author.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-accent-cyan">
                                                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Read
                                                        </span>
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>

                        {/* View All Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center mt-16"
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-8 py-4 glass rounded-xl text-foreground hover:glow transition-all group"
                            >
                                View All Posts
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 mb-6">
                            <Pen className="w-10 h-10 text-accent-cyan" />
                        </div>
                        <h3 className="heading-sm mb-3">Coming Soon</h3>
                        <p className="text-foreground-muted body-md max-w-md mx-auto mb-8">
                            I&apos;m working on my first articles. Subscribe to get notified when they&apos;re published!
                        </p>
                        <a
                            href="#newsletter"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-midnight font-semibold hover:opacity-90 transition-opacity glow"
                        >
                            Get Notified
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
