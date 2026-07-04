"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedContextType {
    savedPostIds: string[];
    toggleSaved: (id: string) => void;
    isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
    const [savedPostIds, setSavedPostIds] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('echo_blogs_saved_posts');
        if (stored) {
            try {
                setSavedPostIds(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse saved posts from localStorage', e);
            }
        }
    }, []);

    const toggleSaved = (id: string) => {
        setSavedPostIds(prev => {
            const isCurrentlySaved = prev.includes(id);
            const next = isCurrentlySaved 
                ? prev.filter(postId => postId !== id)
                : [...prev, id];
            
            localStorage.setItem('echo_blogs_saved_posts', JSON.stringify(next));
            return next;
        });
    };

    const isSaved = (id: string) => savedPostIds.includes(id);

    return (
        <SavedContext.Provider value={{ savedPostIds, toggleSaved, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export function useSaved() {
    const context = useContext(SavedContext);
    if (context === undefined) {
        throw new Error('useSaved must be used within a SavedProvider');
    }
    return context;
}
