import { client, queries } from "@/lib/sanity.client";
import type { Post } from "@/lib/sanity.types";
import { BlogGridClient } from "./BlogGridClient";

// Fetch posts on the server
async function getPosts(): Promise<Post[]> {
    try {
        const posts = await client.fetch(queries.allPosts, {}, { next: { revalidate: 60 } });
        return posts || [];
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function BlogGrid() {
    const posts = await getPosts();

    return <BlogGridClient posts={posts} />;
}
