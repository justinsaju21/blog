import { PortableText } from '@portabletext/react'
import { client, queries, urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User } from 'lucide-react'
import { AdBanner } from '@/components/ui/AdBanner'
import { SidebarAdLayout } from '@/components/ui/SidebarAdLayout'

// Revalidate every 60 seconds
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(queries.postBySlug, { slug })
    if (!post) return {}
    return {
        title: `${post.title} | Justin Jacob Saju`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author?.name || 'Justin Jacob Saju'],
            images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
        }
    }
}

import { Post } from '@/lib/sanity.types';

export async function generateStaticParams() {
    const posts = await client.fetch(queries.allPosts);
    return posts.map((post: Post) => ({ slug: post.slug.current }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(queries.postBySlug, { slug })

    if (!post) notFound()

    return (
        <SidebarAdLayout>
            <article className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        {post.categories && (
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {post.categories.map((cat: string) => (
                                    <div key={cat} className="px-3 py-1 text-xs font-medium rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-foreground-muted text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                            {post.readTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </div>
                            )}
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {post.author.name}
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Main Image */}
                    {post.mainImage && (
                        <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden glass border-white/10 shadow-2xl">
                            <Image
                                src={urlFor(post.mainImage).width(1200).height(675).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Ad after image */}
                    <AdBanner slot="post-after-image" className="mb-8" />

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-accent-cyan hover:prose-a:text-accent-purple transition-colors">
                        <PortableText
                            value={post.body}
                            components={{
                                block: {
                                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h3>,
                                    h4: ({ children }) => <h4 className="text-lg font-bold mt-6 mb-3 text-foreground">{children}</h4>,
                                    normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground-muted">{children}</p>,
                                    blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-cyan pl-4 italic my-4 text-foreground-dim">{children}</blockquote>,
                                },
                                list: {
                                    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-foreground-muted">{children}</ul>,
                                    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-foreground-muted">{children}</ol>,
                                },
                                marks: {
                                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                                    em: ({ children }) => <em className="italic text-foreground-dim">{children}</em>,
                                    code: ({ children }) => <code className="bg-white/10 rounded px-1 py-0.5 text-accent-pink font-mono text-sm">{children}</code>,
                                    link: ({ value, children }) => {
                                        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                                        return (
                                            <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-accent-cyan hover:underline transition-all">
                                                {children}
                                            </a>
                                        )
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Ad after content */}
                    <AdBanner slot="post-footer" className="mt-12" />
                </div>
            </article>
        </SidebarAdLayout>
    )
}
