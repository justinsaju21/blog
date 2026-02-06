"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Pen, Search, Filter, SortAsc, User, ChevronDown, ChevronUp } from "lucide-react";
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

type SortOption = "newest" | "oldest" | "alpha";

export function BlogGridClient({ posts }: BlogGridClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [showAll, setShowAll] = useState(false);

    // Extract unique authors
    const uniqueAuthors = useMemo(() => {
        const authors = new Map();
        posts.forEach(p => {
            if (p.author && p.author._id) {
                if (!authors.has(p.author._id)) {
                    authors.set(p.author._id, p.author.name);
                }
            }
        });
        return Array.from(authors.entries()).map(([id, name]) => ({ id, name }));
    }, [posts]);

    // Extract unique categories
    const uniqueCategories = useMemo(() => {
        const categories = new Set<string>();
        posts.forEach(p => {
            p.categories?.forEach(c => categories.add(c));
        });
        return Array.from(categories);
    }, [posts]);


    const filteredPosts = useMemo(() => {
        let result = posts;

        // 1. Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.title?.toLowerCase().includes(query) ||
                p.excerpt?.toLowerCase().includes(query) ||
                p.categories?.some(c => c.toLowerCase().includes(query))
            );
        }

        // 2. Filter by Category
        if (selectedCategory !== "all") {
            result = result.filter(p => p.categories?.includes(selectedCategory));
        }

        // 3. Filter by Author
        if (selectedAuthor !== "all") {
            result = result.filter(p => p.author?._id === selectedAuthor);
        }

        // 4. Sort
        return [...result].sort((a, b) => {
            if (sortBy === "alpha") return (a.title || "").localeCompare(b.title || "");

            const dateA = new Date(a.publishedAt || "").getTime();
            const dateB = new Date(b.publishedAt || "").getTime();

            if (sortBy === "oldest") return dateA - dateB;
            return dateB - dateA; // Default: updated/newest first
        });

    }, [posts, searchQuery, sortBy, selectedAuthor, selectedCategory]);

    const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 6); // Show 6 initially
    const hasMore = filteredPosts.length > 6;
    const hasPosts = filteredPosts.length > 0;

    return (
        <section id="posts" className="py-24 px-6 relative">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
                        LATEST ARTICLES
                    </span>
                    <h2 className="heading-lg mb-4">
                        Exploring <span className="text-gradient">Ideas</span>
                    </h2>
                    <p className="text-foreground-muted body-md max-w-xl mx-auto">
                        Thoughts on engineering, technology, and building things that matter.
                    </p>
                </div>

                {/* Controls Section */}
                <div className="mb-12 space-y-6">
                    {/* Top Row: Search & Dropdowns */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-glass-bg border border-glass-border p-4 rounded-2xl backdrop-blur-md">
                        {/* Search */}
                        <div className="relative w-full md:max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-dim group-focus-within:text-accent-cyan transition-colors" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full input-bg border border-glass-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-accent-cyan/50 transition-all"
                            />
                        </div>

                        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                            {/* Category Select (Mobile/Desktop) or Tabs - Let's use Select for consistency here */}
                            <div className="relative min-w-[140px]">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-dim" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full input-bg border border-glass-border rounded-xl py-2.5 pl-10 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:border-accent-cyan/50 cursor-pointer transition-colors"
                                >
                                    <option value="all" className="bg-background text-foreground">All Topics</option>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat} className="bg-background text-foreground">{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground-dim pointer-events-none" />
                            </div>

                            {/* Author Select */}
                            <div className="relative min-w-[140px]">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-dim" />
                                <select
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                    className="w-full input-bg border border-glass-border rounded-xl py-2.5 pl-10 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:border-accent-cyan/50 cursor-pointer transition-colors"
                                >
                                    <option value="all" className="bg-background text-foreground">All Authors</option>
                                    {uniqueAuthors.map(a => (
                                        <option key={a.id} value={a.id} className="bg-background text-foreground">{a.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground-dim pointer-events-none" />
                            </div>

                            {/* Sort Select */}
                            <div className="relative min-w-[140px]">
                                <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-dim" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="w-full input-bg border border-glass-border rounded-xl py-2.5 pl-10 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:border-accent-cyan/50 cursor-pointer transition-colors"
                                >
                                    <option value="newest" className="bg-background text-foreground">Newest First</option>
                                    <option value="oldest" className="bg-background text-foreground">Oldest First</option>
                                    <option value="alpha" className="bg-background text-foreground">Title (A-Z)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground-dim pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Grid or Empty State */}
                {hasPosts ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {displayedPosts.map((post, index) => (
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
                                                <h3 className="heading-sm text-foreground mb-4 group-hover:text-accent-cyan transition-colors duration-300">
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
                                                        {/* Author Name */}
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

                        {/* View All / Show More Button */}
                        {hasMore && (
                            <div className="text-center mt-16">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-glass-bg border border-glass-border hover:border-accent-cyan/50 transition-all duration-300 hover:scale-105"
                                >
                                    <span className="text-foreground font-medium">
                                        {showAll ? "Show Less" : `Show All ${filteredPosts.length} Articles`}
                                    </span>
                                    {showAll ? (
                                        <ChevronUp className="w-5 h-5 text-accent-cyan group-hover:-translate-y-1 transition-transform" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-accent-cyan group-hover:translate-y-1 transition-transform" />
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State (with Search Context) */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 mb-6">
                            {searchQuery ? <Search className="w-10 h-10 text-accent-cyan" /> : <Pen className="w-10 h-10 text-accent-cyan" />}
                        </div>
                        <h3 className="heading-sm text-foreground mb-3">{searchQuery ? "No articles found" : "Coming Soon"}</h3>
                        <p className="text-foreground-muted body-md max-w-md mx-auto mb-8">
                            {searchQuery ? "Try adjusting your search or filters." : "I'm working on my first articles. Subscribe to get notified when they're published!"}
                        </p>
                        {!searchQuery && (
                            <a
                                href="#newsletter"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-midnight font-semibold hover:opacity-90 transition-opacity glow"
                            >
                                Get Notified
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
