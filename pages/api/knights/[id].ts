import { NextApiRequest, NextApiResponse } from "next"

const supabaseClient = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const EVENT = process.env.EVENT
const REVEAL_TYPE = process.env.REVEAL_TYPE

const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function fetchMetadata(req: NextApiRequest, res: NextApiResponse) {
  let id: number

  if (+req.query.id > 10000) {
    const response = res.status(404).json({
      error: true,
      message: 'Sorry we could not find the file you requested!'
    });
    await new Promise(() => {
      res.end(response);
    })
  }

  if (EVENT === "unreveal") {
    id = 0
  } else {
    if (REVEAL_TYPE === "genesis") {
      id = (+req.query.id > 1500) ? 0 : +req.query.id
    } else {
      id = +req.query.id
    }
  }

  try {
    const { data, error } = await supabase
      .storage
      .from('metadata')
      .download(`${id}.json`)

    if (error) {
      throw new Error(error.message)
    }

    const imageBuffer = data.stream()
    await new Promise(() => {
      res.setHeader('Content-Type', 'application/json');
      imageBuffer.pipe(res);
    });

  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
    res.end();
  }
}
