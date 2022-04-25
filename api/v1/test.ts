/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: test.ts
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Sun Apr 17 2022 03:56:19 GMT+0700 (Красноярск, стандартное время)
 ******************************************************************************************/
import type { NextApiRequest, NextApiResponse } from 'next';

type Test = {
  name: string;
  repository: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  return res
    .status(200)
    .json({ name: "Sergei Kol'miller", repository: 'https://github.com/kolserdav/portfolio.git' });
};

export default handler;
