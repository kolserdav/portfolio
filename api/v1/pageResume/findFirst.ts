/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: findFirst.ts
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import { PrismaClient, Prisma, PageResume } from '@prisma/client';
import { saveLog } from '../../utils';

const prisma = new PrismaClient();

const handler: Backend.RequestHandler<
  void,
  Prisma.PageResumeFindFirstArgs,
  PageResume | null
> = async (req, res) => {
  const { body } = req;
  let result;
  try {
    result = await prisma.pageResume.findFirst(body);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    saveLog({
      err,
      req,
      message: 'Error find first page index',
      data: { body },
    });
    return res.status(500).json({
      message: 'Error',
      data: null,
      status: 'error',
    });
  }
  return res.status(200).json({ status: 'success', message: 'data', data: result });
};

export default handler;
