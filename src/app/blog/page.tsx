import { BlogGrid } from "@/components/home/BlogGrid";

export const metadata = {
    title: "Blog | Justin Jacob Saju",
    description: "Read my latest thoughts on Embedded Systems, VLSI, and Tech.",
};

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* BlogGrid already has its own header, so we just render it */}
            <BlogGrid />
        </main>
    );
}
