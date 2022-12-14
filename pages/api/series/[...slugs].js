import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import QueryString from "qs";

export default async function handler(req, res) {
  try {
    const { slugs, ...queryParams } = req.query;
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_PARAMS,
        ...queryParams,
      },
      { addQueryPrefix: true }
    );
    const url = `${BASE_TMDB_URL}/tv/${slugs.join("/")}${queryString}`;

    console.info("🚀 Request URL: ", url);
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
