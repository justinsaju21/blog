"use client";

// import { AdBanner } from "./AdBanner";

interface SidebarAdLayoutProps {
    children: React.ReactNode;
}

export function SidebarAdLayout({ children }: SidebarAdLayoutProps) {
    return (
        <div className="relative">
            {/* Left Sidebar Ad - Desktop Only */}
            <div className="hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 w-[160px] z-40">
                <div
                    className="rounded-xl p-3 text-center min-h-[600px] flex items-center justify-center"
                    style={{
                        backgroundColor: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div style={{ color: "var(--foreground-dim)" }} className="text-xs">
                        <p className="opacity-50">Ad Space</p>
                        <p className="opacity-30 text-[10px] mt-1">160x600</p>
                    </div>
                </div>
            </div>

            {/* Right Sidebar Ad - Desktop Only */}
            <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-[160px] z-40">
                <div
                    className="rounded-xl p-3 text-center min-h-[600px] flex items-center justify-center"
                    style={{
                        backgroundColor: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div style={{ color: "var(--foreground-dim)" }} className="text-xs">
                        <p className="opacity-50">Ad Space</p>
                        <p className="opacity-30 text-[10px] mt-1">160x600</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="xl:mx-[180px]">
                {children}
            </div>
        </div>
    );
}
