import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        "foreground-dim": "var(--foreground-dim)",
        midnight: "var(--midnight)",
        "midnight-light": "var(--midnight-light)",
        cobalt: "var(--cobalt)",
        "cobalt-light": "var(--cobalt-light)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-blue": "var(--accent-blue)",
        "accent-purple": "var(--accent-purple)",
        "accent-pink": "var(--accent-pink)",
        "glass-bg": "var(--glass-bg)",
        "glass-border": "var(--glass-border)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
