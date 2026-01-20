import { PortableText } from '@portabletext/react'
import { client, queries, urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User } from 'lucide-react'

// Revalidate every 60 seconds
export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
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

export async function generateStaticParams() {
    const posts = await client.fetch(queries.allPosts);
    return posts.map((post: any) => ({ slug: post.slug.current }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = await client.fetch(queries.postBySlug, { slug })

    if (!post) notFound()

    return (
        <article className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-12 text-center">
                    {post.category && (
                        <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                            {post.category}
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

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-accent-cyan hover:prose-a:text-accent-purple transition-colors">
                    <PortableText value={post.body} />
                </div>
            </div>
        </article>
    )
}
