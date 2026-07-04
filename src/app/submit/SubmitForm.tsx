"use client";

import { useState } from "react";
import { Upload, Loader2, CheckCircle, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export function SubmitForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Controlled form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        keywords: '',
        story: ''
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const fd = new FormData(e.currentTarget);
        // Force the controlled values in case they aren't properly populated
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'image') fd.set(key, value);
        });
        
        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                body: fd,
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || "Submission failed");
            
            setSuccess(true);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Submission failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 p-8 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'var(--bg-tertiary)' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Submission Received</h3>
                <p style={{ color: 'var(--text-secondary)' }} className="mb-8 max-w-md mx-auto">
                    Thank you for submitting your article. I will review it and publish it if it fits the blog!
                </p>
                <button 
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 500 }}
                >
                    Submit Another
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl relative" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 style={{ color: 'var(--text-primary)', fontSize: 20, fontFamily: "'Playfair Display', serif" }}>Article Details</h2>
            </div>

            {error && (
                <div className="p-4 rounded-xl text-red-500 bg-red-500/10 border border-red-500/20 text-sm">
                    {error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Your Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                </div>
                
                <div className="space-y-2">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Article Title</label>
                <input 
                    type="text" 
                    name="title" 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Category/Keywords (comma separated)</label>
                <input 
                    type="text" 
                    name="keywords" 
                    value={formData.keywords}
                    onChange={e => setFormData({...formData, keywords: e.target.value})}
                    placeholder="e.g. Embedded, AI, C++"
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>

            <div className="space-y-2" data-color-mode="dark">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Article Content (Markdown supported)</label>
                <div style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <MDEditor
                        value={formData.story}
                        onChange={(val) => setFormData({...formData, story: val || ''})}
                        height={400}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Cover Image URL (Optional)</label>
                <input 
                    type="text" 
                    name="image"
                    placeholder="Paste a Google Drive or other image URL here"
                    className="w-full px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Article"}
            </button>
        </form>
    );
}
