import { PrismaClient, Prisma, Job } from '@prisma/client';
import { saveLog } from '../../utils';

const prisma = new PrismaClient();

const handler: Backend.RequestHandler<void, Prisma.JobFindFirstArgs, Job | null> = async (
  req,
  res
) => {
  const { body } = req;
  let job;
  try {
    job = await prisma.job.findFirst(body);
  } catch (err: any) {
    saveLog({
      err,
      req,
      message: 'Error find first job',
      data: { body },
    });
    return res.status(500).json({
      message: 'Error',
      data: null,
      status: 'error',
    });
  }
  return res.status(200).json({ status: 'success', message: 'data', data: job });
};

export default handler;
