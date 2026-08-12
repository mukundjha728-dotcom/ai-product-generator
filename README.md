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
AI Service
   ↓
REST API (Google Gemini)
   ↓
AI Model
   ↓
Structured JSON
   ↓
React State
   ↓
Product Card
```

## AI Integration

The application integrates with the Google Gemini REST API (`gemini-3.5-flash` model). 
- **Where:** The request is made in `src/services/aiService.js`.
- **Data Sent:** The user's `productName` and `category` are dynamically injected into a highly structured prompt.
- **Expected Response:** The prompt strictly instructs the AI to return ONLY a valid JSON object containing exactly 3 fields: `title` (string), `description` (string), and `keywords` (array of exactly 5 strings).
- **Validation:** The frontend service securely parses the JSON response using `src/utils/responseParser.js` to ensure the application only renders valid, structured data.

## Design Decisions

The user interface was intentionally designed as a clean, responsive, and professional utility rather than a flashy marketing page.
- Visual elements like excessive gradients, glassmorphism, and "AI magic" fluff were avoided to keep the focus entirely on the functional requirements and the generated data.
- The product card deliberately omits images, fake prices, or fake reviews, focusing solely on the content the AI was explicitly instructed to generate.

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
   VITE_AI_API_KEY=your_gemini_api_key_here
   VITE_AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent
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
