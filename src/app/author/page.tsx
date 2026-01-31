import { client, queries, urlFor } from '@/lib/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import type { Author } from '@/lib/sanity.types';
import { SidebarAdLayout } from '@/components/ui/SidebarAdLayout';
import { AdBanner } from '@/components/ui/AdBanner';

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
    title: 'Authors | Blog',
    description: 'Meet the authors behind our articles',
};

export default async function AuthorsPage() {
    const authors: Author[] = await client.fetch(queries.allAuthors);

    return (
        <SidebarAdLayout>
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-accent-cyan/10 border border-accent-cyan/20">
                            <Users className="w-4 h-4 text-accent-cyan" />
                            <span className="text-sm font-medium text-accent-cyan">Our Authors</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-foreground">Meet the </span>
                            <span className="text-gradient">Writers</span>
                        </h1>
                        <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
                            The talented individuals sharing their knowledge and insights.
                        </p>
                    </div>

                    {/* Ad Banner */}
                    <AdBanner slot="authors-header" className="mb-12" />

                    {/* Authors Grid */}
                    {authors && authors.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authors.map((author) => (
                                <Link key={author._id} href={`/author/${author.slug.current}`}>
                                    <article className="glass rounded-2xl p-6 h-full hover:glow transition-all group">
                                        <div className="flex flex-col items-center text-center">
                                            {/* Profile Image */}
                                            {author.image ? (
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-accent-cyan/20 group-hover:ring-accent-cyan/40 transition-all">
                                                    <Image
                                                        src={urlFor(author.image).width(192).height(192).url()}
                                                        alt={author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-accent-cyan/10 flex items-center justify-center mb-4 ring-4 ring-accent-cyan/20">
                                                    <Users className="w-10 h-10 text-accent-cyan/50" />
                                                </div>
                                            )}

                                            {/* Name */}
                                            <h3 className="text-xl font-semibold text-foreground group-hover:text-accent-cyan transition-colors mb-1">
                                                {author.name}
                                            </h3>

                                            {/* Role */}
                                            {author.role && (
                                                <span className="text-sm text-accent-purple mb-3">
                                                    {author.role}
                                                </span>
                                            )}

                                            {/* Bio Preview */}
                                            {author.bio && (
                                                <p className="text-foreground-muted text-sm line-clamp-2 mb-4">
                                                    {author.bio}
                                                </p>
                                            )}

                                            {/* View Profile Link */}
                                            <div className="flex items-center gap-2 text-accent-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span>View Profile</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="glass rounded-2xl p-16 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-cyan/10 mb-6">
                                <Users className="w-8 h-8 text-accent-cyan" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No Authors Yet</h3>
                            <p className="text-foreground-muted">
                                Authors will appear here once they&apos;re added in Sanity Studio.
                            </p>
                        </div>
                    )}

                    {/* Footer Ad */}
                    <AdBanner slot="authors-footer" className="mt-12" />
                </div>
            </main>
        </SidebarAdLayout>
    );
}
