import { getPosts } from "@/lib/sheets";
import { SavedPageClient } from "./SavedPageClient";

export default async function SavedPage() {
    const allPosts = await getPosts();
    return <SavedPageClient allPosts={allPosts} />;
}
