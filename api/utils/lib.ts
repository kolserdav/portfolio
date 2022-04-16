import type express from 'express';

/**
 * Console log custom method
 */
export const saveLog = (props: {
  message: string;
  err: Error;
  req: express.Request<any, any, any, any> | null;
  data?: any;
}) => {
  const { message, req, err, data } = props;
  console.info(new Date(), message, err, {
    url: req?.url,
    headers: req?.headers,
    data,
  });
};
