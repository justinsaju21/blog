"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubscribed(true);
                setStatus('success');
                setEmail("");
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong.');
            }
        } catch (_error) {
            setStatus('error');
            setMessage('Failed to subscribe. Please try again.');
        }
    };

    return (
        <section id="newsletter" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-purple/20 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-blue mb-6 glow">
                            <Mail className="w-8 h-8 text-midnight" />
                        </div>

                        {/* Title */}
                        <h2 className="heading-md mb-4">
                            Join the <span className="text-gradient">Community</span>
                        </h2>

                        {/* Description */}
                        <p className="text-foreground-muted body-md max-w-lg mx-auto mb-8">
                            Get the latest engineering insights, project updates, and exclusive content
                            delivered straight to your inbox.
                        </p>

                        {/* Form */}
                        {subscribed ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan/20 text-accent-cyan"
                            >
                                <span>🎉</span>
                                <span>Welcome aboard! Check your inbox.</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={status === 'loading'}
                                    className="flex-1 px-5 py-3 rounded-xl bg-midnight-light border border-glass-border text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-accent-cyan transition-colors disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-midnight font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 glow disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>
                        )}
                        {status === 'error' && message && (
                            <p className="text-red-400 text-sm mt-4">{message}</p>
                        )}

                        {/* Privacy Note */}
                        <p className="text-foreground-dim text-sm mt-4">
                            No spam, ever. Unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
