/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Специальная
 * License Text: Права на копирование и распостранение данного файла или его частей имеет только владелец указанного репозитория
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Sat Nov 27 2021 03:15:33 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import type { NextApiRequest, NextApiResponse } from 'next';

type Test = {
  name: string;
  repository: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Test>) => {
  console.log(process.env.DATABASE_URL);
  return res
    .status(200)
    .json({ name: "Sergei Kol'miller", repository: 'https://github.com/kolserdav/portfolio.git' });
};

export default handler;
