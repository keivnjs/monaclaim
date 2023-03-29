import { NextApiRequest, NextApiResponse } from "next"

const supabaseClient = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const EVENT = process.env.EVENT
const REVEAL_TYPE = process.env.REVEAL_TYPE

const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const legendary = [305, 1033]

export default async function fetchImg(req: NextApiRequest, res: NextApiResponse) {
  let id: number

  if (!legendary.includes(+req.query.id)) {
    const response = res.status(404).json({
      error: true,
      message: 'Sorry we could not find the file you requested!'
    });
    await new Promise(() => {
      res.end(response);
    })
  } else {
    id = +req.query.id
  }

  try {
    const { data, error } = await supabase
      .storage
      .from('animation')
      .download(`${id}.mp4`)

    if (error) {
      throw new Error(error.message)
    }

    const imageBuffer = data.stream()
    await new Promise(() => {
      res.setHeader('Content-Type', 'video/mp4')
      imageBuffer.pipe(res);
    });

  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
    res.end();
  }
}
