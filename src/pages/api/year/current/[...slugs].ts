import QueryString from "qs";

import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { MediaDetails } from "@/types/tmdb";
import { fetcher } from "@/utils/tmdbDataHelpers";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slugs, ...queryParams } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_SEARCH_PARAMS,
        sort_by: "vote_average",
        watch_region: "GB",
        "vote_count.gte": "400",
        primary_release_year: slugsArray[1],
        ...queryParams, // for infinite scroll page numbers
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/discover/${slugsArray[0]}${queryString}`;
    console.info("🚀 Request URL: ", url);

    const data = await fetcher<MediaDetails>(url);

    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
