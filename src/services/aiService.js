import { parseAIResponse } from "../utils/responseParser";

export const generateProductContent = async (productName, category) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const apiUrl = import.meta.env.VITE_AI_API_URL;

  if (!apiKey) {
    throw new Error("API key is missing. Please check your .env file.");
  }

  const prompt = `You are an expert e-commerce content writer.

Generate product content for:
Product Name: ${productName}
Category: ${category}

Return ONLY valid JSON with no markdown formatting. The JSON must exactly match this structure:
{
  "title": "A concise, marketable product title.",
  "description": "A short, compelling e-commerce-friendly description.",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}

Rules:
- Title should be concise and professional.
- Description should be short and compelling (2-3 sentences max).
- Generate 4-6 relevant keywords.
- Do not invent technical specifications not implied by the name.
- Do not include any markdown, backticks, or extra text. ONLY return the JSON object.`;

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
