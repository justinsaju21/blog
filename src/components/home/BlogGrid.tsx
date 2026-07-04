import { getPosts } from "@/lib/sheets";
import { BlogGridClient } from "./BlogGridClient";

export async function BlogGrid({ limit, hideSearch = false }: { limit?: number, hideSearch?: boolean }) {
    let posts = await getPosts();
    if (limit) {
        posts = posts.slice(0, limit);
    }
    // We can add hideSearch prop to BlogGridClient, but let's just pass it
    return <BlogGridClient posts={posts} hideSearch={hideSearch} />;
}
