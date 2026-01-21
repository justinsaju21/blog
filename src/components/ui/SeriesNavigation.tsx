"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface SeriesPost {
    title: string;
    slug: string;
    partNumber: number;
}

interface SeriesNavigationProps {
    seriesTitle: string;
    currentPart: number;
    totalParts: number;
    previousPost?: SeriesPost;
    nextPost?: SeriesPost;
    allPosts?: SeriesPost[];
}

export function SeriesNavigation({
    seriesTitle,
    currentPart,
    totalParts,
    previousPost,
    nextPost,
    allPosts = [],
}: SeriesNavigationProps) {
    return (
        <div className="my-8 rounded-2xl border border-accent-purple/30 bg-midnight/50 backdrop-blur-sm overflow-hidden">
            {/* Series Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-accent-purple/20 to-transparent border-b border-white/10">
                <div className="flex items-center gap-2 text-sm text-accent-cyan font-medium">
                    <BookOpen className="w-4 h-4" />
                    <span>Part of a Series</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mt-1">{seriesTitle}</h3>
                <p className="text-sm text-foreground-dim mt-0.5">
                    Part {currentPart} of {totalParts}
                </p>
            </div>

            {/* Progress dots */}
            <div className="px-6 py-3 flex items-center gap-2">
                {Array.from({ length: totalParts }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all ${i + 1 === currentPart
                                ? "bg-accent-purple"
                                : i + 1 < currentPart
                                    ? "bg-accent-cyan/50"
                                    : "bg-white/10"
                            }`}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 flex items-center justify-between gap-4 border-t border-white/10">
                {previousPost ? (
                    <Link
                        href={`/blog/${previousPost.slug}`}
                        className="flex items-center gap-2 text-foreground-muted hover:text-accent-cyan transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left">
                            <div className="text-xs text-foreground-dim">Previous</div>
                            <div className="text-sm font-medium truncate max-w-[150px]">
                                Part {previousPost.partNumber}
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div />
                )}

                {nextPost ? (
                    <Link
                        href={`/blog/${nextPost.slug}`}
                        className="flex items-center gap-2 text-foreground-muted hover:text-accent-cyan transition-colors group text-right"
                    >
                        <div>
                            <div className="text-xs text-foreground-dim">Next</div>
                            <div className="text-sm font-medium truncate max-w-[150px]">
                                Part {nextPost.partNumber}
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                ) : (
                    <div />
                )}
            </div>

            {/* All parts dropdown (collapsed) */}
            {allPosts.length > 0 && (
                <details className="px-6 py-3 border-t border-white/10">
                    <summary className="text-sm text-foreground-muted cursor-pointer hover:text-accent-cyan transition-colors">
                        View all parts
                    </summary>
                    <div className="mt-3 space-y-2">
                        {allPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className={`block text-sm px-3 py-2 rounded-lg transition-colors ${post.partNumber === currentPart
                                        ? "bg-accent-purple/20 text-accent-cyan"
                                        : "text-foreground-muted hover:bg-white/5"
                                    }`}
                            >
                                Part {post.partNumber}: {post.title}
                            </Link>
                        ))}
                    </div>
                </details>
            )}
        </div>
    );
}
