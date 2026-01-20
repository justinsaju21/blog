import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from './sanity.config';

// Create the Sanity client
export const client = createClient(sanityConfig);

// Image URL builder
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Get all published posts
  allPosts: `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "category": category->title,
    "categorySlug": category->slug.current,
    "author": author->{name, image},
    mainImage
  }`,

  // Get a single post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    readTime,
    "category": category->title,
    mainImage,
    "author": author->{name, image, bio}
  }`,

  // Get posts by category
  postsByCategory: `*[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "category": category->title,
    mainImage
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description
  }`,
};
