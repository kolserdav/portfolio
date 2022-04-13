import type { NextApiRequest, NextApiResponse } from 'next';

type Test = {
  name: string;
  repository: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Test>) => {
  return res
    .status(200)
    .json({ name: "Sergei Kol'miller", repository: 'https://github.com/kolserdav/portfolio.git' });
};

export default handler;
