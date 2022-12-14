export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    const URL = `
        https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language=en-GB&sort_by=popularity.desc&page=${slug[1]}&with_genres=${slug[0]}`;
    const response = await fetch(URL);
    const data = await response.json();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
