"use client";

import { useSaved } from "@/components/SavedContext";
import { BlogGridClient } from "@/components/home/BlogGridClient";
import type { Post } from "@/types";
import { Bookmark } from "lucide-react";

export function SavedPageClient({ allPosts }: { allPosts: Post[] }) {
    const { savedPostIds } = useSaved();
    
    const savedPosts = allPosts.filter(post => savedPostIds.includes(post.id));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px' }}>
            <div className="max-w-6xl mx-auto px-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <Bookmark className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: 'var(--text-primary)' }}>Saved Articles</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>You have {savedPosts.length} saved {savedPosts.length === 1 ? 'article' : 'articles'}.</p>
            </div>

            {savedPosts.length > 0 ? (
                <div className="-mt-16">
                    <BlogGridClient posts={savedPosts} hideSearch={true} />
                </div>
            ) : (
                <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <p style={{ color: 'var(--text-secondary)' }}>You haven't saved any articles yet.</p>
                </div>
            )}
        </div>
    );
}
