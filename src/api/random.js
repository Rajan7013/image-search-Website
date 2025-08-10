export async function getRandomPhoto() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    );

    if (!res.ok) {
      throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching random photo:", err);
    return {};
  }
}
