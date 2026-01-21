"use client";

import { CodeCopyButton } from "./CodeCopyButton";

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
    return (
        <div className="relative group my-6">
            {/* Language badge */}
            {language && (
                <div className="absolute top-0 left-4 -translate-y-1/2 px-2 py-0.5 text-xs font-mono rounded bg-accent-purple/20 text-accent-cyan border border-accent-purple/30">
                    {language}
                </div>
            )}

            {/* Copy button */}
            <CodeCopyButton code={code} />

            {/* Code content */}
            <pre className="rounded-xl p-4 pt-6 bg-midnight/80 border border-white/10 overflow-x-auto text-sm font-mono text-foreground-muted backdrop-blur-sm">
                <code>{code}</code>
            </pre>
        </div>
    );
}
