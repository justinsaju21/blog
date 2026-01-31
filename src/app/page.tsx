import { BlogGrid } from "@/components/home/BlogGrid";
import { Newsletter } from "@/components/home/Newsletter";
import { AdBanner } from "@/components/ui/AdBanner";
import { BlogHeader } from "@/components/BlogHeader";

export default function Home() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        <BlogHeader />
        <AdBanner slot="after-hero" />
        <BlogGrid />
        <Newsletter />
      </div>
    </div>
  );
}
