export async function handler(event) {
  const query = event.queryStringParameters.query || 'nature';
  const page = event.queryStringParameters.page || 1;
  const perPage = event.queryStringParameters.per_page || 12;

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const data = await res.json();
  return {
    statusCode: res.status,
    body: JSON.stringify(data)
  };
}
console.log("Query params:", { query, page, perPage });
console.log("Using key:", process.env.UNSPLASH_ACCESS_KEY ? "✅ Set" : "❌ Missing");
