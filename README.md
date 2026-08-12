# AI Product Content Generator

A modern, AI-powered web application that generates professional product content (titles, descriptions, and relevant keywords) based on a product name and category. 

## Features
- **AI-Powered Content Generation**: Automatically generates high-quality, market-ready product titles, descriptions, and keywords.
- **Dynamic Contextual Images**: Fetches relevant product placeholder images dynamically based on the AI-generated keywords.
- **Modern UI**: Features a sleek, responsive design using dark glassmorphism, animated glowing background orbs, and modern typography.
- **One-Click Copy**: Easily copy the generated content to your clipboard.

## Design Choices

1. **Tech Stack**: Built with **React** (via Vite for lightning-fast HMR and building) to manage component state effectively.
2. **Styling**: Used **Tailwind CSS** to rapidly build a custom, highly responsive UI. Instead of relying on a generic component library, custom glassmorphism utilities (`backdrop-blur-2xl`) and gradient backgrounds were used to deliver a "premium SaaS" aesthetic that wows users at first glance.
3. **Typography**: Integrated the **Outfit** Google Font for a clean, tech-forward, and modern look.
4. **Dynamic Image Handling**: To make the product cards feel authentic, the app uses a placeholder image service. To ensure accuracy, the image is fetched using the specific *AI-generated keywords* rather than the broad category name.

## Where AI is Used

The core functionality of this application relies heavily on AI:
- **Google Gemini REST API**: The application integrates with the Gemini API (`gemini-3.5-flash` model) to process user inputs (Product Name and Category).
- **Prompt Engineering**: The application sends a highly structured prompt to the AI, instructing it to return a JSON object containing a catchy `title`, an engaging `description` (2-3 sentences), and an array of 4-6 relevant SEO `keywords`.
- **Intelligent Visuals**: The AI's generated keywords are subsequently used to fetch highly contextual images, meaning the AI indirectly powers the visual presentation of the product card as well.

## Getting Started

### Prerequisites
- Node.js installed
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mukundjha728-dotcom/ai-product-generator.git
   cd ai-product-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API credentials:
   ```env
   VITE_AI_API_KEY=your_gemini_api_key_here
   VITE_AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.
