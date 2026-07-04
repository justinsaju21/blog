const { google } = require('googleapis');
const crypto = require('crypto');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[match[1].trim()] = val;
  }
});

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");
  const creds = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

async function getSheetsClient() {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

const markdownContent = `
## Introduction

The world of photography is constantly evolving. In this post, we explore the intricate balance between light and shadow, and how you can harness it to create breathtaking images.

### Understanding the Basics

Light is the most important element in photography. Without light, there is no photograph. But it's not just about having light; it's about the **quality**, **direction**, and **color** of that light.

- **Hard Light**: Creates strong, distinct shadows. Great for dramatic portraits.
- **Soft Light**: Wraps around the subject, creating gentle transitions from light to dark. Ideal for flattering portraits and macro photography.

> "Photography is the story I fail to put into words." — Destin Sparks

### Advanced Techniques

Once you understand the basics, you can start experimenting with more advanced techniques like *chiaroscuro* and high-key lighting. 

Here is a quick checklist for your next shoot:
1. Scout the location for natural light sources.
2. Determine if you need reflectors or diffusers.
3. Set your camera's white balance manually.

Happy shooting!
`;

const markdownContent2 = `
## The Future of Web Development

As we move further into the decade, web development continues to shift towards more dynamic, user-centric experiences. Let's dive into some of the most exciting trends.

### Server Components and Next.js

React Server Components have revolutionized how we think about building applications. By moving the rendering to the server, we can send less JavaScript to the client, resulting in faster load times and better SEO.

\`\`\`tsx
// Example of a Server Component
export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug);
  return <article>{post.content}</article>;
}
\`\`\`

### AI Integration

We are seeing a massive surge in AI-powered applications. From intelligent chatbots to automated content generation, AI is becoming an indispensable tool for developers.

**Key Takeaways:**
- Always stay updated with the latest framework releases.
- Experiment with new AI APIs to see how they can enhance your projects.
`;

const posts = [
  {
    title: "Mastering Light and Shadow",
    slug: "mastering-light-shadow",
    excerpt: "Learn how to manipulate light to create dramatic and compelling photographs.",
    body: markdownContent,
    readTime: "5 min read",
    category: "Photography",
    authorName: "Justin Jacob Saju",
  },
  {
    title: "The Next Era of Web Development",
    slug: "next-era-web-dev",
    excerpt: "Exploring the latest trends in React, Next.js, and AI integrations.",
    body: markdownContent2,
    readTime: "7 min read",
    category: "Technology",
    authorName: "Justin Jacob Saju",
  }
];

async function insertBlogs() {
  console.log("Inserting blogs...");
  const sheets = await getSheetsClient();
  
  for (const post of posts) {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = [
      id,
      post.title,
      post.slug,
      post.excerpt,
      post.body,
      now,
      post.readTime,
      post.category,
      post.authorName,
      '', // authorImage
      '', // cloudinaryId
    ];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'BlogPosts!A:K',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });
    console.log(`Inserted: ${post.title}`);
  }
  
  // Revalidate the cache so it appears immediately!
  try {
      await fetch("http://localhost:3000/api/revalidate", {
          method: "POST",
          headers: { "x-revalidate-secret": process.env.AUTH_SECRET }
      });
      console.log("Cache revalidated!");
  } catch (err) {
      console.log("Failed to revalidate cache", err);
  }
  
  console.log("Done!");
}

insertBlogs().catch(console.error);
