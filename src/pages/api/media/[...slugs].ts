import QueryString from "qs";

import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { fetcher } from "@/utils/tmdbDataHelpers";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slugs, ...queryParams } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_PARAMS,
        region: slugsArray[2],
        ...queryParams, // for infinite scroll page numbers
      },
      { addQueryPrefix: true }
    );
    const url = `${BASE_TMDB_URL}/${slugsArray[0]}/${slugsArray[1]}${queryString}`;

    console.info("🚀 Request URL: ", url);
    const data = await fetcher<MediaList>(url);

    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
