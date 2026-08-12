# AI Product Content Generator

A professional frontend web application that generates concise, market-ready product copy (titles, descriptions, and keywords) based on a product name and category using AI.

🚀 **Live Demo:** [https://ai-product-generator-delta.vercel.app/](https://ai-product-generator-delta.vercel.app/)

## Features

* Product name input
* Category selection
* Form validation
* AI-generated title
* AI-generated description
* AI-generated keywords
* Responsive product card
* Loading and error states
* REST API integration

## Tech Stack

* React (Vite)
* JavaScript
* Tailwind CSS
* REST API (Google Gemini API)

## Architecture

```
React UI
   ↓
API Service (fetch /api/generate)
   ↓
Vercel Serverless Function (Backend)
   ├──────────────────────────┐
   ↓                          ↓
Google Gemini API         DuckDuckGo JSON API
(Text Generation)         (Image Search)
   ↓                          ↓
   ├──────────────────────────┘
   ↓
Structured JSON + Image URL
   ↓
React State
   ↓
Product Card
```

## AI & Dynamic Search Integration

The application uses a serverless backend (`/api/generate.js`) to orchestrate two parallel services:
1. **AI Text Generation:** Securely queries the Google Gemini REST API (`gemini-3.5-flash`) with a strict prompt to return a validated JSON payload containing exactly a title, description, and 5 keywords.
2. **Dynamic Image Search:** Concurrently searches the DuckDuckGo internal JSON API (`/i.js`) for the exact product. It scores the top 50 returned candidates based on a deterministic token-matching algorithm to ensure high product relevance while penalizing stock/clipart images.

- **Resilience:** The frontend `ProductCard` includes a robust fallback loop. If the primary image fails to load (e.g. 403 Forbidden hotlink), it seamlessly attempts to load the next best candidate. A dedicated `Retry Image` handler is also provided.

## Design Decisions

The user interface was intentionally designed as a clean, responsive, and professional utility rather than a flashy marketing page.
- Visual elements like excessive gradients and "AI magic" fluff were avoided to keep the focus entirely on the functional requirements and the generated data.
- The product image is fetched dynamically using real web data, rather than relying on random stock photos or hallucinated AI image generations, proving the architecture is highly practical and scalable.
- The API key and search logic were removed from the client-side bundle and moved to a secure backend route to meet production security standards.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mukundjha728-dotcom/ai-product-generator.git
   cd ai-product-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your API credentials. Do NOT commit this file.
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Running Production Build

To verify the production build locally:
```bash
npm run build
```
