import QueryString from "qs";

import { BASE_TMDB_QUERY_DISCOVER_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slugs } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_DISCOVER_PARAMS,
        watch_region: `${slugsArray[1]}`,
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/watch/providers/${slugsArray[0]}${queryString}`;
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
