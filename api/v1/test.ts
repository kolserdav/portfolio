/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: test.ts
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
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
