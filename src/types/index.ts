export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  readTime: string;
  category: string;
  authorName: string;
  authorImage?: string;
  cloudinaryId?: string;
  mainImage?: string; // For legacy sanity support if needed
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  github?: string;
  streamlit?: string;
  tinkercad?: string;
  external?: string;
  featured: boolean;
  authorName: string;
  order: number;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export type CursorState = 'default' | 'link' | 'view' | 'artist' | 'feature'
