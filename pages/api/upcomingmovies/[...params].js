export default async function handler(req, res) {
  try {
    const { params } = req.query;

    const URL = ` https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&page=${params[0]}&include_adult=false`;
    const response = await fetch(URL);
    const data = await response.json();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
