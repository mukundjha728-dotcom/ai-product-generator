const apiKey = process.env.VITE_AI_API_KEY || process.env.GEMINI_API_KEY;

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.models.map(m => m.name));
  } catch (err) {
    console.error("Error:", err);
  }
}

listModels();
