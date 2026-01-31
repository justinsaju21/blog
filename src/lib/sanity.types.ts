// Post type definition for TypeScript
export interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any[]; // Portable Text
    publishedAt: string;
    readTime: string;
    categories: string[]; // Updated for multi-category support
    category: string; // Deprecated but kept for backward compatibility if needed
    categorySlug?: string;
    mainImage?: {
        asset: {
            _ref: string;
        };
        alt?: string;
    };
    author?: Author;
}

// Author type definition
export interface Author {
    _id: string;
    name: string;
    slug: { current: string };
    role?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any;
    bio?: string;
    email?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
}

// Category type
export interface Category {
    _id: string;
    title: string;
    slug: string;
    description?: string;
}
