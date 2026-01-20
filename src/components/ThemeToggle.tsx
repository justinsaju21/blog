"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
    const context = useTheme();

    // Don't render until context is available
    if (!context) return null;

    const { theme, toggleTheme } = context;

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-foreground-muted hover:text-accent-cyan hover:bg-white/10 transition-all"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
}
