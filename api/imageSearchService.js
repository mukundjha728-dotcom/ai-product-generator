// api/imageSearchService.js

/**
 * Normalizes string for tokenization
 */
function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
}

/**
 * Tokenize a string into an array of words
 */
function getTokens(text) {
  return normalizeText(text).split(/\s+/).filter(Boolean);
}

/**
 * Fetch the VQD token required for DuckDuckGo image search
 */
async function fetchVqd(query) {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&ia=web`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const text = await res.text();
  const vqdMatch = text.match(/vqd=["']([^"']+)["']/);
  if (!vqdMatch || !vqdMatch[1]) {
    throw new Error('Failed to extract VQD from DuckDuckGo');
  }
  return vqdMatch[1];
}

/**
 * Score a candidate image based on relevance to the product
 */
function scoreCandidate(candidate, productName, category) {
  let score = 0;
  const productTokens = getTokens(productName);
  const categoryTokens = getTokens(category);
  const title = normalizeText(candidate.title);
  const source = normalizeText(candidate.source);

  // Exact phrase match in title
  if (title.includes(normalizeText(productName))) {
    score += 50;
  }

  // Token matches
  let tokensMatched = 0;
  for (const token of productTokens) {
    if (title.includes(token)) {
      score += 10;
      tokensMatched++;
    }
  }

  // If we matched all product tokens, give a bonus
  if (tokensMatched === productTokens.length && productTokens.length > 0) {
    score += 20;
  }

  // Category match
  for (const token of categoryTokens) {
    if (title.includes(token)) {
      score += 15;
    }
  }

  // Useful keywords
  if (title.includes('product')) score += 5;
  if (title.includes('official')) score += 5;

  // Good dimensions
  if (candidate.width >= 400 && candidate.height >= 400) {
    score += 5;
  }

  // Penalties
  if (title.includes('wallpaper') || title.includes('clipart') || title.includes('stock')) {
    score -= 40;
  }

  return score;
}

/**
 * Fetches and ranks image candidates using Bing Image Search (Vercel-safe fallback)
 */
async function searchBingImages(query, productName, category) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!res.ok) {
    throw new Error(`Bing API error: ${res.status}`);
  }

  const text = await res.text();
  // Extract direct image URLs from Bing's internal HTML data attributes
  const murls = [...text.matchAll(/murl&quot;:&quot;(http[^&]+)&quot;/g)].map(m => m[1]);

  if (murls.length === 0) return null;

  // We use the image URL itself as the "title" for scoring since it often contains product keywords
  const candidates = murls.map(url => ({
    url,
    title: decodeURIComponent(url).replace(/[-_/+]/g, ' '),
    source: '',
    width: 500, 
    height: 500
  }));

  candidates.forEach(c => {
    c.score = scoreCandidate(c, productName, category);
  });

  candidates.sort((a, b) => b.score - a.score);
  const topCandidates = candidates.slice(0, 5);

  return {
    url: topCandidates[0].url,
    alt: productName,
    fallbacks: topCandidates.slice(1).map(c => c.url)
  };
}

/**
 * Fetches and ranks image candidates using DuckDuckGo
 */
export async function searchProductImage(productName, category) {
  const query = `"${productName}" "${category}" product photo`;
  
  try {
    const vqd = await fetchVqd(query);
    const searchUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${encodeURIComponent(vqd)}&f=,,,type:photo,,`;
    
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`DuckDuckGo API error: ${res.status}`);
    }

    const data = await res.json();
    const results = data.results || [];

    if (results.length === 0) {
      return null; // No images found
    }

    // Map to candidate format
    const candidates = results.map(r => ({
      url: r.image,
      thumbnail: r.thumbnail,
      sourceUrl: r.url,
      title: r.title,
      source: r.source,
      width: parseInt(r.width, 10) || 0,
      height: parseInt(r.height, 10) || 0,
    }));

    // Score candidates
    candidates.forEach(c => {
      c.score = scoreCandidate(c, productName, category);
    });

    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);

    // Extract the top URLs for fallbacks
    const topCandidates = candidates.slice(0, 5);
    const primary = topCandidates[0];

    return {
      url: primary.url,
      alt: productName,
      fallbacks: topCandidates.slice(1).map(c => c.url)
    };
  } catch (error) {
    console.warn("DuckDuckGo Image Search Error (likely Vercel block). Falling back to Bing...", error.message);
    try {
      return await searchBingImages(query, productName, category);
    } catch (bingError) {
      console.error("Bing Image Search Error:", bingError);
      return null;
    }
  }
}
