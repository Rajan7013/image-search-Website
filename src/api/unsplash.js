const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const searchImages = async (query, page = 1, perPage = 12) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch images');
  const data = await res.json();
  return data.results;
};
export const getRandomImage = async () => {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch random image');
  const data = await res.json();
  return data;
};