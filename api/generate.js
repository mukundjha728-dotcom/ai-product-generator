export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productName, category } = req.body;
    
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

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 },
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Server API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
