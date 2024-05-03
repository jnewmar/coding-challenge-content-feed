import { NextApiRequest, NextApiResponse } from "next/types";
import { API_DYNAMIC, API_ENDPOINT } from "../../constants/config";
import { processContentData } from "../../utils/dataProcessor";
import { Post } from "../../types/types";

/**
 * @swagger
 * /api/content:
 *   get:
 *     summary: Retrieve content data
 *     description: Retrieve content data from an external API and process it.
 *     responses:
 *       '200':
 *         description: Successful response with content data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '500':
 *         description: Error response if fetching content fails
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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
