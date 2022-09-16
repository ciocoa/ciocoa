// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSortedPostsData } from '../../lib/post'

type Data = {
  code: number
  message: string
  success: boolean
  result: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    code: 100,
    success: true,
    message: '',
    result: getSortedPostsData(),
  })
}
