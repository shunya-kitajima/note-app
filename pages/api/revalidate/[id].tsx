import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log('Revalidating detail page...')
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/note/${id}`)
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}

export default handler
