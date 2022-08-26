export default async function handler(req, res) {
  try {
    const URL = `
    https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
    const response = await fetch(URL);
    const data = await response.json();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}
