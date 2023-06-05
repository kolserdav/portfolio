/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: findMany.ts
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import { PrismaClient, Prisma, Job } from '@prisma/client';
import { saveLog } from '../../utils';

const prisma = new PrismaClient();

const handler: Backend.RequestHandler<void, Prisma.JobFindManyArgs, Job[]> = async (req, res) => {
  const { body } = req;
  const { where, skip, take } = body;
  let count;
  try {
    count = await prisma.job.count({
      where,
    });
  } catch (err: any) {
    saveLog({
      req,
      err,
      message: 'Error find cound of jobs',
    });
    return res.status(500).json({
      status: 'error',
      message: 'Error',
      data: [],
    });
  }
  let jobs;
  try {
    jobs = await prisma.job.findMany(body);
  } catch (err: any) {
    saveLog({
      err,
      req,
      message: 'Error find many job',
      data: { body },
    });
    return res.status(500).json({
      message: 'Error',
      data: [],
      status: 'error',
    });
  }
  return res.status(200).json({
    status: 'success',
    message: 'data',
    data: jobs,
    count,
    skip: skip || null,
    take: take || null,
  });
};

export default handler;
