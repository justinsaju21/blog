import { BlogGrid } from "@/components/home/BlogGrid";

export default function BlogPage() {
    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '80px' }}>
            <BlogGrid />
        </div>
    );
}
