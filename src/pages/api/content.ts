import { NextApiRequest, NextApiResponse } from "next/types";
import { API_DYNAMIC, API_ENDPOINT } from "../../constants/config";
import { ExternalPost, Post } from "../../types/types";
import { processContentData } from "../../utils/dataProcessor";

// pages/api/content.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'Prefer': 'code=200,' + API_DYNAMIC
      }
    });
    const data = await response.json(); 
    const out: Post[] = processContentData(data.contentCards);
    res.status(200).json(out);
  } catch (error) {
    //console.log('Error fetching content:', error);
    res.status(500).json({ error: 'Error fetching content' });
  }
}
