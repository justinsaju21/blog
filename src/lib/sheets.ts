import { google } from 'googleapis'
import type { Post, Project, Category } from '@/types'

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!
  const creds = JSON.parse(raw)
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ],
  })
}

async function getSheetsClient() {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

const SHEET_ID = () => process.env.GOOGLE_SHEETS_ID!

// Helpers
function parseBoolean(val: string | undefined): boolean {
  return val?.toUpperCase() === 'TRUE'
}

function parseArray(val: string | undefined): string[] {
  if (!val) return []
  return val.split(',').map((s) => s.trim()).filter(Boolean)
}

function parseIntSafe(val: string | undefined, defaultVal = 0): number {
  const parsed = parseInt(val || '', 10)
  return isNaN(parsed) ? defaultVal : parsed
}

// ─── Blog Posts ────────────────────────────────────────────────────────────
// Columns: id | title | slug | excerpt | body | publishedAt | readTime | category | authorName | authorImage | cloudinaryId
function rowToPost(row: string[]): Post {
  return {
    id: row[0] ?? '',
    title: row[1] ?? '',
    slug: row[2] ?? '',
    excerpt: row[3] ?? '',
    body: row[4] ?? '',
    publishedAt: row[5] ?? '',
    readTime: row[6] ?? '',
    category: row[7] ?? '',
    authorName: row[8] ?? '',
    authorImage: row[9] || undefined,
    cloudinaryId: row[10] || undefined,
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'BlogPosts!A2:K',
    })
    const rows = (res.data.values ?? []) as string[][]
    return rows.filter((r) => r[0]).map(rowToPost).reverse() // Assuming newest at bottom
  } catch (error) {
    console.error("Error fetching BlogPosts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug) || null
}

export async function insertPost(post: Omit<Post, 'id' | 'publishedAt'>): Promise<string> {
  const sheets = await getSheetsClient()
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
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
    post.authorImage || '',
    post.cloudinaryId || '',
  ]
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'BlogPosts!A:K',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
  return id
}

// ─── Projects ──────────────────────────────────────────────────────────────
// Columns: id | title | slug | description | category | tags | github | streamlit | tinkercad | external | featured | authorName | order
function rowToProject(row: string[]): Project {
  return {
    id: row[0] ?? '',
    title: row[1] ?? '',
    slug: row[2] ?? '',
    description: row[3] ?? '',
    category: row[4] ?? '',
    tags: parseArray(row[5]),
    github: row[6] || undefined,
    streamlit: row[7] || undefined,
    tinkercad: row[8] || undefined,
    external: row[9] || undefined,
    featured: parseBoolean(row[10]),
    authorName: row[11] ?? '',
    order: parseIntSafe(row[12], 999),
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'Projects!A2:M',
    })
    const rows = (res.data.values ?? []) as string[][]
    const projects = rows.filter((r) => r[0]).map(rowToProject)
    return projects.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching Projects:", error)
    return []
  }
}

// ─── Categories ────────────────────────────────────────────────────────────
export async function getCategories(): Promise<Category[]> {
  try {
    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'Categories!A2:D',
    })
    const rows = (res.data.values ?? []) as string[][]
    return rows.filter((r) => r[0]).map(r => ({
      id: r[0] ?? '',
      title: r[1] ?? '',
      slug: r[2] ?? '',
      description: r[3] ?? '',
    }))
  } catch (error) {
    console.error("Error fetching Categories:", error)
    return []
  }
}

// ─── Submissions ───────────────────────────────────────────────────────────
export interface BlogSubmission {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  name: string
  email: string
  title: string
  story: string
  keywords: string[]
  uploadedImageUrl?: string
  submittedAt: string
}

export async function insertSubmission(
  submission: Omit<BlogSubmission, 'id' | 'status' | 'submittedAt'>
): Promise<string> {
  const sheets = await getSheetsClient()
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const row = [
    id,
    'pending',
    submission.name,
    submission.email,
    submission.title,
    submission.story,
    submission.keywords.join(', '),
    submission.uploadedImageUrl || '',
    now,
  ]
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'BlogSubmissions!A:I',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
  return id
}

export async function getSubmissions(): Promise<BlogSubmission[]> {
  try {
    const sheets = await getSheetsClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'BlogSubmissions!A2:I',
    })
    const rows = (res.data.values ?? []) as string[][]
    return rows.filter((r) => r[0]).map(r => ({
      id: r[0] ?? '',
      status: (r[1] as 'pending' | 'approved' | 'rejected') ?? 'pending',
      name: r[2] ?? '',
      email: r[3] ?? '',
      title: r[4] ?? '',
      story: r[5] ?? '',
      keywords: parseArray(r[6]),
      uploadedImageUrl: r[7] || undefined,
      submittedAt: r[8] ?? '',
    })).reverse()
  } catch (error) {
    console.error("Error fetching Submissions:", error)
    return []
  }
}

export async function updateSubmissionStatus(id: string, status: 'approved' | 'rejected'): Promise<boolean> {
  try {
    const sheets = await getSheetsClient();
    // First, find the row
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID(),
      range: 'BlogSubmissions!A:B',
    });
    
    const rows = res.data.values;
    if (!rows) return false;
    
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return false;
    
    // rowIndex is 0-indexed based on the range A:B, which corresponds to the actual row number (rowIndex + 1)
    const actualRowNumber = rowIndex + 1;
    
    // Update the status column (Column B)
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID(),
      range: `BlogSubmissions!B${actualRowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] },
    });
    
    return true;
  } catch (error) {
    console.error("Error updating submission status:", error);
    return false;
  }
}
