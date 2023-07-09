import QueryString from "qs";

import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { formattedDate } from "@/utils/dates";

import type { NextApiRequest, NextApiResponse } from "next";

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");

const todaysDate = formattedDate(year, month, day);
const oneYearAgo = formattedDate(year - 1, month, day);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slugs, ...queryParams } = req.query;
    const slugsArray = Array.isArray(slugs) ? slugs : [slugs];

    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_SEARCH_PARAMS,
        sort_by: "vote_average",
        watch_region: "GB",
        "vote_count.gte": `${slugsArray[1]}`,
        "primary_release_date.gte": oneYearAgo,
        "primary_release_date.lte": todaysDate,
        ...queryParams, // for infinite scroll page numbers
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/discover/${slugsArray[0]}${queryString}`;
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
