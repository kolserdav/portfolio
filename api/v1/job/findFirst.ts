import { PrismaClient, Prisma, Job } from '@prisma/client';

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
    console.error(err);
    return res.status(500).json();
  }
  return res.status(200).json({ status: 'success', message: 'data', data: job });
};

export default handler;
