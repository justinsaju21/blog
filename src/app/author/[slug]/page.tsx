import { client, queries, urlFor } from '@/lib/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, Globe, Mail, Github, Linkedin } from 'lucide-react';
import type { Author, Post } from '@/lib/sanity.types';
import { SidebarAdLayout } from '@/components/ui/SidebarAdLayout';
import { AdBanner } from '@/components/ui/AdBanner';

// Revalidate every 60 seconds
export const revalidate = 60;

interface AuthorWithPosts extends Author {
    posts: Post[];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author: AuthorWithPosts = await client.fetch(queries.authorBySlug, { slug });
    if (!author) return {};
    return {
        title: `${author.name} | Blog Authors`,
        description: author.bio || `Articles by ${author.name}`,
    };
}

export async function generateStaticParams() {
    const authors: Author[] = await client.fetch(queries.allAuthors);
    return authors.map((author) => ({ slug: author.slug.current }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author: AuthorWithPosts = await client.fetch(queries.authorBySlug, { slug });

    if (!author) notFound();

    return (
        <SidebarAdLayout>
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/author"
                        className="group inline-flex items-center gap-2 text-foreground-muted hover:text-accent-cyan transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>All Authors</span>
                    </Link>

                    {/* Author Profile Card */}
                    <div className="glass rounded-2xl p-8 mb-12">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Profile Image */}
                            {author.image && (
                                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-accent-cyan/20">
                                    <Image
                                        src={urlFor(author.image).width(256).height(256).url()}
                                        alt={author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Author Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                    {author.name}
                                </h1>
                                {author.role && (
                                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
                                        {author.role}
                                    </span>
                                )}
                                {author.bio && (
                                    <p className="text-foreground-muted mb-6 leading-relaxed">
                                        {author.bio}
                                    </p>
                                )}

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-3">
                                    {author.website && (
                                        <a
                                            href={author.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Globe className="w-4 h-4" />
                                            <span className="text-sm">Website</span>
                                        </a>
                                    )}
                                    {author.email && (
                                        <a
                                            href={`mailto:${author.email}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span className="text-sm">Email</span>
                                        </a>
                                    )}
                                    {author.github && (
                                        <a
                                            href={`https://github.com/${author.github}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span className="text-sm">GitHub</span>
                                        </a>
                                    )}
                                    {author.linkedin && (
                                        <a
                                            href={author.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span className="text-sm">LinkedIn</span>
                                        </a>
                                    )}
                                    {author.twitter && (
                                        <a
                                            href={`https://twitter.com/${author.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                            <span className="text-sm">@{author.twitter}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad Banner */}
                    <AdBanner slot="author-profile" className="mb-8" />

                    {/* Author's Posts */}
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-8">
                            Articles by {author.name}
                            <span className="ml-3 text-lg font-normal text-foreground-muted">
                                ({author.posts?.length || 0} posts)
                            </span>
                        </h2>

                        {author.posts && author.posts.length > 0 ? (
                            <div className="grid gap-6">
                                {author.posts.map((post) => (
                                    <Link key={post._id} href={`/blog/${post.slug.current}`}>
                                        <article className="glass rounded-xl p-6 hover:glow transition-all group">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {post.mainImage && (
                                                    <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={urlFor(post.mainImage).width(400).height(250).url()}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    {post.categories && (
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            {post.categories.map((cat: string) => (
                                                                <span
                                                                    key={cat}
                                                                    className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                                                                >
                                                                    {cat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent-cyan transition-colors mb-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-foreground-muted text-sm line-clamp-2 mb-3">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-foreground-dim text-sm">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                        {post.readTime && <span>{post.readTime}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="glass rounded-xl p-12 text-center">
                                <p className="text-foreground-muted">No articles published yet.</p>
                            </div>
                        )}
                    </section>

                    {/* Footer Ad */}
                    <AdBanner slot="author-footer" className="mt-12" />
                </div>
            </main>
        </SidebarAdLayout>
    );
}
