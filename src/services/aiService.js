import { parseAIResponse } from "../utils/responseParser";

export const generateProductContent = async (productName, category) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productName, category }),
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
