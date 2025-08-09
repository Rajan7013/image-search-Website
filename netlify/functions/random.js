export async function handler() {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await res.json();
  return {
    statusCode: res.status,
    body: JSON.stringify(data)
  };
}
