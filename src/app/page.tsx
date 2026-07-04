import { BlogGrid } from "@/components/home/BlogGrid";
import { Newsletter } from "@/components/home/Newsletter";
import { AdBanner } from "@/components/ui/AdBanner";
import { HeroSection } from "@/components/home/HeroSection";

export const revalidate = 1800;

export default function Home() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <HeroSection />
      
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <AdBanner slot="after-hero" />
        <BlogGrid limit={6} hideSearch={true} />
        <Newsletter />
      </div>
    </div>
  );
}
