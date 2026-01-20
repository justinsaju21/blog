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
    author?: {
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image?: any;
        bio?: string;
    };
}

// Category type
export interface Category {
    _id: string;
    title: string;
    slug: string;
    description?: string;
}
