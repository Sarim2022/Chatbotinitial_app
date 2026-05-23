# Chatbotinitial

Next.js chat app powered by Google Gemini.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and add your keys:

   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` (this file is **not** committed to git):

   ```bash
   GEMINI_API_KEY=your_real_key_from_aistudio
   NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

## Deploy on Railway

1. Push this repo to GitHub (`.env.local` stays local — never committed).
2. Create a new Railway project from your GitHub repo.
3. In Railway → **Variables**, add:
   - `GEMINI_API_KEY` — your Gemini API key ([Google AI Studio](https://aistudio.google.com/apikey))
   - `NEXT_PUBLIC_GITHUB_URL` — optional, your GitHub profile URL
4. Railway auto-detects Next.js. Deploy.

**Security:** Only set secrets in Railway’s dashboard or `.env.local` locally. Never commit API keys to git.
