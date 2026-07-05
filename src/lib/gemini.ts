import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai'

const GEMINI_PROMPT = `
You are an expert technical writer and blog editor for a high-quality engineering and technology blog.
Your job is to assist the author in preparing their blog post. You will receive a partial blog post object.

CRITICAL INSTRUCTIONS:
1. If a field has content, DO NOT CHANGE THE MEANING OR FACTS. You must preserve the core message.
2. For the "body" field, if the original content is poorly formatted or lacks structure, you MUST ENHANCE IT by adding proper Markdown structure.
3. Structure the "body" into a rich, professional, beautifully formatted article. Use appropriate headings (##, ###), bullet points, blockquotes, and code blocks where relevant to make it highly readable and visually appealing.
4. Do NOT hallucinate or add fabricated technical facts, but you MAY reword and restructure sentences to sound professional and engaging.
5. If a field is EMPTY, GENERATE it based on the context of the fields that are provided (e.g., generate an excerpt or slug if missing).
6. Determine an appropriate "readTime" (e.g. "5 min read") based on the length of the body content you output.
7. Determine an appropriate "category" if it is empty. It should be a single, broad open category like "Engineering", "AI", "VLSI", "Web Development", etc.
8. Generate a URL-friendly "slug" (e.g. "my-awesome-post") based on the title if it is empty.
9. Return a valid JSON matching the schema.
`

const responseSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        title: { type: SchemaType.STRING, description: "The title of the blog post" },
        slug: { type: SchemaType.STRING, description: "URL friendly slug" },
        excerpt: { type: SchemaType.STRING, description: "A short 2-3 sentence summary of the post" },
        body: { type: SchemaType.STRING, description: "The full content of the post in Markdown" },
        readTime: { type: SchemaType.STRING, description: "Estimated read time, e.g. '5 min read'" },
        category: { type: SchemaType.STRING, description: "The broad category this post belongs to" },
    },
    required: ["title", "slug", "excerpt", "body", "readTime", "category"],
}

export interface PartialPost {
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    readTime?: string;
    category?: string;
}

export async function generatePostContent(partial: PartialPost): Promise<PartialPost> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // Use the latest flash model available
    const FALLBACK_MODELS = [
        'gemini-3.1-flash-lite',
        'gemini-3-flash',
        'gemini-2.5-flash-lite',
        'gemini-3.5-flash',
        'gemini-2.5-flash',
        'gemini-2.0-flash-lite'
    ];

    const prompt = GEMINI_PROMPT + `\n\nINPUT DATA:\n` + JSON.stringify(partial, null, 2);

    let lastError: Error | null = null;

    for (const modelName of FALLBACK_MODELS) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: 'application/json',
                    responseSchema: responseSchema
                }
            });

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            
            return JSON.parse(text) as PartialPost;
        } catch (error: unknown) {
            console.error(`Gemini model ${modelName} failed:`, error);
            lastError = error as Error;
        }
    }

    throw new Error(`All Gemini models failed. Last error: ${lastError?.message}`);
}
