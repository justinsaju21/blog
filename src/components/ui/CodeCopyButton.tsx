"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeCopyButtonProps {
    code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground-muted hover:text-foreground transition-all duration-200 group"
            title="Copy code"
        >
            {copied ? (
                <Check className="w-4 h-4 text-green-400" />
            ) : (
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
        </button>
    );
}
