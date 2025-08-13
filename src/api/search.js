// src/api/search.js
const KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// 👇 Add this line to check if your key is loading


export async function searchPhotos(query = '', page = 1, perPage = 15) {
  if (!query.trim()) {
    return { results: [] };
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${KEY}`
    );

    if (!res.ok) {
      throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching search photos:", err);
    return { results: [] };
  }
}
