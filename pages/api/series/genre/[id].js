import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import QueryString from "qs";

export default async function handler(req, res) {
  try {
    const { id, ...queryParams } = req.query;
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_PARAMS,
        ...queryParams,
        with_genres: id,
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/discover/tv${queryString}`;
    console.info("🚀 Request URL: ", url);

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
