import { searchProductImage } from './imageSearchService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productName, category, imageOnly } = req.body;
    
    // If only requesting image (Retry Image)
    if (imageOnly) {
      const imageResult = await searchProductImage(productName, category);
      return res.status(200).json({
        image: imageResult || null,
        imageError: !imageResult
      });
    }

    // Ensure we use the non-VITE prefixed key for backend security
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_AI_API_KEY;
    const apiUrl = process.env.GEMINI_API_URL || process.env.VITE_AI_API_URL || "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

    if (!apiKey) {
      return res.status(500).json({ error: "API key is missing in server environment." });
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

    const fetchTextContent = fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 },
      }),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      return response.json();
    });

    // Run text and image searches concurrently to maximize performance
    const [textResult, imageResult] = await Promise.allSettled([
      fetchTextContent,
      searchProductImage(productName, category)
    ]);

    if (textResult.status === 'rejected') {
      console.error("Gemini API Error:", textResult.reason);
      return res.status(500).json({ error: "Failed to generate text content." });
    }

    const textData = textResult.value;
    
    // Inject the dynamically searched image into the response payload
    const responsePayload = {
      ...textData,
      image: imageResult.status === 'fulfilled' && imageResult.value ? imageResult.value : null,
      imageError: imageResult.status === 'rejected' || !imageResult.value
    };

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error("Server API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
