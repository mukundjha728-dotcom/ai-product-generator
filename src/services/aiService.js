import { parseAIResponse } from "../utils/responseParser";

export const generateProductContent = async (productName, category) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const apiUrl = import.meta.env.VITE_AI_API_URL;

  if (!apiKey) {
    throw new Error("API key is missing. Please check your .env file.");
  }

  const prompt = `You are a professional ecommerce product copywriter.

Generate concise product content using only the supplied product name and category.
Product Name: ${productName}
Category: ${category}

Return ONLY valid JSON in this exact structure:

{
  "title": "string",
  "description": "string",
  "keywords": ["string", "string", "string", "string", "string"]
}

Rules:
- Create a concise and commercially appropriate title.
- Description must contain 1–2 sentences.
- Return exactly 5 relevant keywords.
- Do not invent specific technical specifications.
- Do not invent prices, ratings, reviews or product features that were not provided.
- Do not include markdown.
- Do not include explanations outside the JSON.`;

  try {
    // This example uses the Gemini API structure.
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract text from Gemini response structure
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error("Empty response from AI service.");
    }

    return parseAIResponse(responseText);
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error(error.message || "Failed to communicate with AI service.");
  }
};
