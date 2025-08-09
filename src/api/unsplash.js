const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const searchImages = async (query, page = 1, perPage = 12) => {
  let url;

  if (import.meta.env.DEV) {
    // Local development → call Unsplash directly
    url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_KEY}`;
  } else {
    // Production on Netlify → use serverless function
    url = `/.netlify/functions/search?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch images");
  const data = await res.json();
  return data.results;
};

export const getRandomImage = async () => {
  let url;

  if (import.meta.env.DEV) {
    url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}`;
  } else {
    url = `/.netlify/functions/random`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch random image");
  return await res.json();
};
