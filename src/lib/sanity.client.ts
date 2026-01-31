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
    "categories": categories[]->title,
    "author": author->{_id, name, slug, image, role},
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
    "categories": categories[]->title,
    mainImage,
    "author": author->{_id, name, slug, image, role, bio, email, website, twitter, linkedin, github}
  }`,

  // Get posts by category
  postsByCategory: `*[_type == "post" && categories[0]->title == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "category": categories[0]->title,
    mainImage
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description
  }`,

  // Get all authors
  allAuthors: `*[_type == "author" && !(_id in path("drafts.**"))] | order(name asc) {
    _id,
    name,
    slug,
    role,
    image,
    bio,
    website,
    twitter,
    linkedin,
    github
  }`,

  // Get a single author by slug with their posts
  authorBySlug: `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    image,
    bio,
    email,
    website,
    twitter,
    linkedin,
    github,
    "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      "categories": categories[]->title,
      mainImage
    }
  }`,

  // Get posts by author slug
  postsByAuthor: `*[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "categories": categories[]->title,
    mainImage
  }`,
};
