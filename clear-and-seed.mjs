import { google } from 'googleapis';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let value = match[2].trim();
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    else if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    process.env[key] = value;
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

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

const NEW_POSTS = [
  [
    crypto.randomUUID(),
    "The Future of AI in Embedded Systems",
    "future-of-ai-embedded",
    "Discover how lightweight AI models are revolutionizing microcontrollers and edge devices.",
    `## The Edge Revolution
For years, artificial intelligence was confined to massive data centers. Today, thanks to advances in model compression and specialized silicon, **AI is moving to the edge**.

### Why Edge AI?
Running machine learning models directly on embedded devices offers several critical advantages:
* **Latency**: Decisions are made locally in milliseconds.
* **Privacy**: Sensitive data never leaves the device.
* **Bandwidth**: No need to stream raw data to the cloud.

> "The true power of IoT isn't just connectivity—it's intelligent autonomy at the absolute edge of the network."

### Hardware Accelerators
Modern microcontrollers now frequently include dedicated neural processing units (NPUs). For example:
\`\`\`c
// Initializing a TensorFlow Lite Micro interpreter
tflite::MicroInterpreter interpreter(
    model, resolver, tensor_arena, arena_size, error_reporter);
interpreter.AllocateTensors();
\`\`\`

As we look toward the future, the gap between "embedded systems" and "AI systems" will continue to blur, opening doors to intelligent sensors that understand their environment natively.`,
    new Date(Date.now() - 100000).toISOString(),
    "4 min read",
    "Embedded Systems",
    "Justin Jacob Saju",
    "",
    ""
  ],
  [
    crypto.randomUUID(),
    "Understanding FinFET and Gate-All-Around (GAA)",
    "understanding-finfet-gaa",
    "A deep dive into the evolution of transistor architecture at the nanometer scale.",
    `## Beyond Planar Transistors
The transition from planar transistors to **FinFET** was a monumental leap in semiconductor manufacturing. But as we push past the 3nm node, even FinFET runs out of steam. Enter **Gate-All-Around (GAA)**.

### The Short-Channel Effect
As transistor gates got shorter, controlling the flow of electrons became incredibly difficult. The "off" state was leaking too much current. 

FinFET solved this by raising the channel into a 3D "fin", allowing the gate to wrap around three sides of it.

### The Transition to GAA
GAA (also known as RibbonFET or Nanosheet) takes this to its logical conclusion: the gate completely surrounds the silicon channel on all four sides.

#### Key Benefits of GAA:
1. **Ultimate Electrostatics**: Maximum control over the channel.
2. **Variable Width**: Nanosheet widths can be tuned for high performance or low power.
3. **Density**: Allows for continuous scaling down to the angstrom era.

As fabrication plants spin up 2nm and 1.8nm nodes, GAA will become the standard building block of our digital world.`,
    new Date(Date.now() - 200000).toISOString(),
    "5 min read",
    "VLSI",
    "Justin Jacob Saju",
    "",
    ""
  ],
  [
    crypto.randomUUID(),
    "Building Scalable Web Apps with Next.js",
    "scalable-web-apps-nextjs",
    "Best practices for routing, state management, and performance in modern Next.js applications.",
    `## The App Router Era
With the introduction of the App Router, Next.js fundamentally shifted how we build React applications. Server Components are now the default, changing our mental model.

### Server Components vs Client Components
By default, everything in the App Router is a Server Component. 

> **Rule of thumb**: Keep components on the server until they explicitly need interactivity (like \`onClick\`, hooks, or browser APIs).

\`\`\`tsx
// This runs only on the server
export default async function Dashboard() {
  const data = await fetchUserData();
  return <Profile user={data} />
}
\`\`\`

### Optimized Data Fetching
Next.js extends the native \`fetch\` API to automatically memoize requests and handle caching.

* **Force Cache**: Static generation.
* **Revalidate**: Incremental Static Regeneration (ISR).
* **No Store**: Dynamic, real-time rendering.

By leveraging these rendering strategies appropriately, we can build web apps that are as fast as static sites but as dynamic as single-page applications.`,
    new Date(Date.now() - 300000).toISOString(),
    "6 min read",
    "Web Development",
    "Justin Jacob Saju",
    "",
    ""
  ],
  [
    crypto.randomUUID(),
    "5G NR: The Backbone of Modern Connectivity",
    "5g-nr-backbone",
    "Exploring the physical layer and architectural shifts that make 5G New Radio possible.",
    `## More Than Just Faster Phones
While consumers notice 5G primarily through faster download speeds, the true innovation of **5G New Radio (NR)** lies in its flexibility.

### The Three Pillars of 5G
The ITU defined three primary use cases for 5G:
1. **eMBB (Enhanced Mobile Broadband)**: High bandwidth for video, VR, and standard mobile use.
2. **URLLC (Ultra-Reliable Low Latency Communications)**: For autonomous driving, remote surgery, and industrial automation.
3. **mMTC (Massive Machine Type Communications)**: For IoT networks with millions of low-power devices.

### Flexible Numerology
Unlike LTE, which had a fixed subcarrier spacing of 15 kHz, 5G NR introduces scalable numerology. This allows the network to adapt its physical layer to the specific frequency band and use case.

> 5G is the first cellular standard designed from day one to serve machines just as much as humans.

With the rollout of Standalone (SA) 5G cores, we are finally beginning to see the true potential of network slicing and ultra-low latency applications.`,
    new Date(Date.now() - 400000).toISOString(),
    "4 min read",
    "5G",
    "Justin Jacob Saju",
    "",
    ""
  ],
  [
    crypto.randomUUID(),
    "Designing Dark Mode UI That Looks Premium",
    "designing-premium-dark-mode",
    "Tips on color palettes, contrast, and depth to create stunning dark mode interfaces.",
    `## It's Not Just Black and White
A common mistake when designing a dark mode interface is simply inverting colors or using pure black (\`#000000\`) and pure white (\`#FFFFFF\`). 

### Creating Depth Without Shadows
In light mode, we use drop shadows to indicate elevation. In dark mode, shadows melt into the background. Instead, we use **lightness** to indicate depth.

* **Background**: Very dark gray (e.g., \`#121212\`)
* **Elevated Cards**: Slightly lighter gray (e.g., \`#1E1E1E\`)
* **Popups/Modals**: Even lighter (e.g., \`#2C2C2C\`)

### Text Contrast
Pure white text on a pure black background causes eye strain (halation). 

Instead of \`#FFFFFF\`, use slightly muted text colors:
\`\`\`css
:root {
  --text-primary: rgba(255, 255, 255, 0.87);
  --text-secondary: rgba(255, 255, 255, 0.60);
  --text-disabled: rgba(255, 255, 255, 0.38);
}
\`\`\`

By carefully managing contrast and utilizing subtle gradients, you can craft a dark mode that feels premium, modern, and easy on the eyes.`,
    new Date(Date.now() - 500000).toISOString(),
    "5 min read",
    "Design",
    "Justin Jacob Saju",
    "",
    ""
  ]
];

async function run() {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  console.log("Clearing existing BlogPosts...");
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SHEET_ID,
    range: 'BlogPosts!A2:K',
  });

  console.log("Inserting new rich posts...");
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'BlogPosts!A2:K',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: NEW_POSTS },
  });

  console.log("Revalidating Next.js cache...");
  try {
    await fetch('http://localhost:3000/api/revalidate');
    console.log("Cache cleared!");
  } catch(e) {
    console.log("Cache clear failed, maybe server is not running?");
  }
}

run().catch(console.error);
