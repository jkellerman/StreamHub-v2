import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Visit the webpage to warm up the server
    const websiteUrl =
      "https://streamhubtv.vercel.app/movie/120/GB?The-Lord-of-the-Rings:-The-Fellowship-of-the-Ring";
    await fetch(websiteUrl);

    console.log("Server warmed up successfully by visiting the webpage!");

    // Send a response back to the client (optional)
    res.status(200).end();
  } catch (error) {
    console.error("Error warming up server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
