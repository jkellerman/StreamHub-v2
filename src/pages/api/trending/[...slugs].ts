import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import QueryString from "qs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slugs, ...queryParams } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_PARAMS,
        ...queryParams,
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/trending/${slugsArray.join(
      "/"
    )}${queryString}`;
    console.info("🚀 Request URL: ", url);

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}