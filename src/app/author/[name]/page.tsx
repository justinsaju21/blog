import { getPosts } from "@/lib/sheets";
import { BlogGridClient } from "@/components/home/BlogGridClient";

export default async function AuthorPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const rawName = decodeURIComponent(name);
    const posts = await getPosts();
    const authorPosts = posts.filter(p => p.authorName === rawName);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-12">
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        {rawName}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
                        {authorPosts.length} published {authorPosts.length === 1 ? 'post' : 'posts'}
                    </p>
                </div>
                
                {authorPosts.length > 0 ? (
                    <BlogGridClient posts={authorPosts} />
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No posts found for this author.</p>
                )}
            </div>
        </div>
    );
}
