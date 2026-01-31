import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'

// Simplified query for sitemap
const sitemapQuery = `*[_type == "post" && !(_id in path("drafts.**"))] {
  "slug": slug.current,
  publishedAt
}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://blog.justinsaju.me'

    // Fetch all posts
    const posts = await client.fetch(sitemapQuery)

    const postUrls = posts.map((post: { slug: string; publishedAt: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/author`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    return [...routes, ...postUrls]
}
