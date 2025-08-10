export async function searchPhotos(query = 'nature', page = 1, perPage = 12) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
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
