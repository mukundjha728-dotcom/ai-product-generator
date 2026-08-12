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

    const parsedContent = parseAIResponse(responseText);
    
    // Combine text content with image data provided by backend
    return {
      ...parsedContent,
      image: data.image || null,
      imageError: !!data.imageError
    };
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error(error.message || "Failed to communicate with AI service.");
  }
};

export const retryProductImage = async (productName, category) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName, category, imageOnly: true }),
    });

    if (!response.ok) throw new Error("Image retry failed.");
    const data = await response.json();
    return { image: data.image, imageError: data.imageError };
  } catch (error) {
    console.error("Image Retry Error:", error);
    return { image: null, imageError: true };
  }
};
