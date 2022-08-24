export default async function handler(req, res) {
  const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  res.status(200).json({ data: data });
}
