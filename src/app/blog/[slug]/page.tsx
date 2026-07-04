import { getPosts, getPostBySlug } from '@/lib/sheets'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User } from 'lucide-react'
import { AdBanner } from '@/components/ui/AdBanner'
import { SidebarAdLayout } from '@/components/ui/SidebarAdLayout'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { SeriesNavigation } from '@/components/ui/SeriesNavigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Revalidate every 30 minutes
export const revalidate = 1800

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug)
    if (!post) return {}
    return {
        title: `${post.title} | Echo Blogs`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.authorName || 'Justin Jacob Saju'],
            images: [],
        }
    }
}

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const posts = await getPosts()
    const currentIndex = posts.findIndex(p => p.slug === slug)
    const post = currentIndex !== -1 ? posts[currentIndex] : null

    if (!post) notFound()

    const totalParts = posts.length
    const currentPart = totalParts - currentIndex
    
    const previousPostData = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
    const nextPostData = currentIndex > 0 ? posts[currentIndex - 1] : null

    const previousPost = previousPostData ? { title: previousPostData.title, slug: previousPostData.slug, partNumber: currentPart - 1 } : undefined
    const nextPost = nextPostData ? { title: nextPostData.title, slug: nextPostData.slug, partNumber: currentPart + 1 } : undefined

    return (
        <SidebarAdLayout>
            <ReadingProgressBar readTime={post.readTime} />
            <article className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        {post.category && (
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                <div className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                                    {post.category}
                                </div>
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.publishedAt || new Date()).toLocaleDateString('en-US', {
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
                            {post.authorName && (
                                <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                    <User className="w-4 h-4" />
                                    <span>{post.authorName}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Ad after image */}
                    <AdBanner slot="post-after-image" className="mb-8" />

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-strong:text-white prose-li:text-[var(--text-secondary)] prose-blockquote:text-[var(--text-muted)] prose-blockquote:border-l-[var(--border)] prose-a:text-blue-400 hover:prose-a:text-blue-300 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.body}
                        </ReactMarkdown>
                    </div>

                    <SeriesNavigation 
                        seriesTitle="The Blog Archive" 
                        currentPart={currentPart} 
                        totalParts={totalParts} 
                        previousPost={previousPost} 
                        nextPost={nextPost} 
                    />

                    {/* Ad after content */}
                    <AdBanner slot="post-footer" className="mt-12" />
                </div>
            </article>
        </SidebarAdLayout>
    )
}
