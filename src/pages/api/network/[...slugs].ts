import QueryString from "qs";

import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slugs, ...queryParams } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];

    const queryString =
      slugsArray.length === 3
        ? QueryString.stringify(
            {
              ...BASE_TMDB_QUERY_PARAMS,
              watch_region: "GB",
              with_watch_providers: slugsArray[1],
              with_genres: slugsArray[2],
              ...queryParams, // for infinite scroll page numbers
            },
            { addQueryPrefix: true }
          )
        : QueryString.stringify(
            {
              ...BASE_TMDB_QUERY_PARAMS,
              watch_region: "GB",
              with_watch_providers: slugsArray[1],
              ...queryParams, // for infinite scroll page numbers
            },
            { addQueryPrefix: true }
          );

    const url = decodeURI(`${BASE_TMDB_URL}/discover/${slugsArray[0]}${queryString}`);
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
