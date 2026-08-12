const apiKey = process.env.VITE_AI_API_KEY || process.env.GEMINI_API_KEY;

async function testGeminiImage() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
  
  const payload = {
    instances: [
      { prompt: "Professional ecommerce product photograph of a modern television, clean neutral background, studio lighting" }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: "1:1"
    }
  };

  console.log("Testing Imagen endpoint:", url.replace(apiKey, "HIDDEN_KEY"));
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error("Failed:", res.status, res.statusText);
      console.error(text);
      return;
    }
    
    const data = await res.json();
    if (data.predictions && data.predictions.length > 0) {
      console.log("SUCCESS! Got image data length:", data.predictions[0].bytesBase64Encoded?.length);
    } else {
      console.log("Response successful but no predictions:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

testGeminiImage();
