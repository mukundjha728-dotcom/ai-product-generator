export const parseAIResponse = (responseText) => {
  try {
    // Sometimes AI wraps JSON in markdown blocks like ```json ... ```
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanedText);

    if (!data.title || typeof data.title !== "string") {
      throw new Error("Missing or invalid 'title' in response");
    }
    if (!data.description || typeof data.description !== "string") {
      throw new Error("Missing or invalid 'description' in response");
    }
    if (!data.keywords || !Array.isArray(data.keywords)) {
      throw new Error("Missing or invalid 'keywords' in response");
    }
    if (data.keywords.length !== 5) {
      // Force exactly 5 keywords by padding or slicing
      if (data.keywords.length > 5) {
        data.keywords = data.keywords.slice(0, 5);
      } else {
        throw new Error("AI did not generate exactly 5 keywords as requested.");
      }
    }

    return data;
  } catch (error) {
    throw new Error("Failed to parse AI response. " + error.message);
  }
};
