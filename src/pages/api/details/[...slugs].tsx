import QueryString from "qs";

import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slugs, ...queryParams } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_SEARCH_PARAMS,
        append_to_response: `credits,recommendations,watch/providers,${
          slugsArray[0] === "movie" ? "release_dates" : "content_ratings"
        },videos`,
        ...queryParams, // for infinite scroll page numbers
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/${slugsArray.join("/")}${queryString}`;
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
