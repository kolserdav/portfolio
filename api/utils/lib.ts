/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: lib.ts
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
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
    data: JSON.stringify(data),
  });
};
