"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Pen, Search, Filter, SortAsc, User, ChevronDown, ChevronUp, Bookmark } from "lucide-react";
import Link from "next/link";
import { useSaved } from "../SavedContext";
import type { Post } from "@/types";

function formatDate(dateString: string): string {
    if (!dateString) return '';
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
    hideSearch?: boolean;
}

type SortOption = "newest" | "oldest" | "alpha";

export function BlogGridClient({ posts, hideSearch = false }: BlogGridClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [showAll, setShowAll] = useState(false);
    
    const { isSaved, toggleSaved } = useSaved();

    // Extract unique authors
    const uniqueAuthors = useMemo(() => {
        const authors = new Set<string>();
        posts.forEach(p => {
            if (p.authorName) authors.add(p.authorName);
        });
        return Array.from(authors);
    }, [posts]);

    // Extract unique categories
    const uniqueCategories = useMemo(() => {
        const categories = new Set<string>();
        posts.forEach(p => {
            if (p.category) categories.add(p.category);
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
                p.category?.toLowerCase().includes(query)
            );
        }

        // 2. Filter by Category
        if (selectedCategory !== "all") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 3. Filter by Author
        if (selectedAuthor !== "all") {
            result = result.filter(p => p.authorName === selectedAuthor);
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
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span style={{ color: 'var(--text-secondary)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em' }} className="mb-4 inline-block">
                        LATEST ARTICLES
                    </span>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: 16 }}>
                        Exploring Ideas
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15 }} className="max-w-xl mx-auto">
                        Thoughts on engineering, technology, and building things that matter.
                    </p>
                </div>

                {/* Controls Section */}
                {!hideSearch && (
                <div className="mb-12 space-y-6">
                    {/* Top Row: Search & Dropdowns */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl backdrop-blur-md" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        {/* Search */}
                        <div className="relative w-full md:max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: 'var(--text-muted)' }} />
                            <input
                                id="blog-search"
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all"
                                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                            {/* Category Select */}
                            <div className="relative min-w-[140px]">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full rounded-xl py-2.5 pl-10 pr-8 text-sm appearance-none focus:outline-none cursor-pointer transition-colors"
                                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                >
                                    <option value="all">All Topics</option>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                            </div>

                            {/* Author Select */}
                            <div className="relative min-w-[140px]">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <select
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                    className="w-full rounded-xl py-2.5 pl-10 pr-8 text-sm appearance-none focus:outline-none cursor-pointer transition-colors"
                                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                >
                                    <option value="all">All Authors</option>
                                    {uniqueAuthors.map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                            </div>

                            {/* Sort Select */}
                            <div className="relative min-w-[140px]">
                                <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="w-full rounded-xl py-2.5 pl-10 pr-8 text-sm appearance-none focus:outline-none cursor-pointer transition-colors"
                                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="alpha">Title (A-Z)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* Blog Grid or Empty State */}
                {hasPosts ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {displayedPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="rounded-2xl p-8 h-full transition-all duration-500 group cursor-pointer relative overflow-hidden hover:scale-[1.02]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                                            <div className="relative z-10">
                                                {/* Category Badges & Save */}
                                                <div className="flex items-center justify-between mb-5">
                                                    <div className="flex flex-wrap gap-2">
                                                        {post.category && (
                                                            <span
                                                                className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
                                                                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
                                                            >
                                                                {post.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            toggleSaved(post.id);
                                                        }}
                                                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-20"
                                                        aria-label="Save post"
                                                    >
                                                        <Bookmark 
                                                            className="w-5 h-5 transition-colors" 
                                                            style={{ 
                                                                color: isSaved(post.id) ? 'var(--text-primary)' : 'var(--text-muted)',
                                                                fill: isSaved(post.id) ? 'var(--text-primary)' : 'transparent'
                                                            }} 
                                                        />
                                                    </button>
                                                </div>

                                                {/* Title */}
                                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, marginBottom: 16, color: 'var(--text-primary)' }} className="transition-colors duration-300">
                                                    {post.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }} className="line-clamp-2">
                                                    {post.excerpt}
                                                </p>

                                                {/* Meta */}
                                                <div className="flex items-center justify-between text-sm pt-4 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(post.publishedAt)}
                                                        </span>
                                                        {/* Author Name */}
                                                        {post.authorName && (
                                                            <span className="hidden md:flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                                                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text-muted)' }} />
                                                                {post.authorName}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
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
                        {hasMore && !hideSearch && (
                            <div className="text-center mt-16">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                                >
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                        {showAll ? "Show Less" : `Show All ${filteredPosts.length} Articles`}
                                    </span>
                                    {showAll ? (
                                        <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" style={{ color: 'var(--text-primary)' }} />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" style={{ color: 'var(--text-primary)' }} />
                                    )}
                                </button>
                            </div>
                        )}
                        {hideSearch && (
                             <div className="text-center mt-16">
                                 <Link href="/blog">
                                     <button
                                         className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                                         style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                                     >
                                         <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                             View All Articles
                                         </span>
                                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--text-primary)' }} />
                                     </button>
                                 </Link>
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
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{ background: 'var(--bg-card)' }}>
                            {searchQuery ? <Search className="w-10 h-10" style={{ color: 'var(--text-primary)' }} /> : <Pen className="w-10 h-10" style={{ color: 'var(--text-primary)' }} />}
                        </div>
                        <h3 style={{ fontSize: 24, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12 }}>{searchQuery ? "No articles found" : "Coming Soon"}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }} className="max-w-md mx-auto">
                            {searchQuery ? "Try adjusting your search or filters." : "I'm working on my first articles. Subscribe to get notified when they're published!"}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
