// src/api/unsplash.js
const KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

if (!KEY) {
  console.warn(
    "VITE_UNSPLASH_ACCESS_KEY is not set. Add it to .env for dev or Netlify env vars for production."
  );
}

export const searchImages = async (query = "nature", page = 1, perPage = 15) => {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&client_id=${KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unsplash search failed: ${res.status} ${res.statusText} — ${text}`);
  }

  const data = await res.json();
  return data.results;
};

export const getRandomImage = async () => {
  const url = `https://api.unsplash.com/photos/random?client_id=${KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unsplash random failed: ${res.status} ${res.statusText} — ${text}`);
  }

  return await res.json();
};
