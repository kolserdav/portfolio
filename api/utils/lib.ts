/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: lib.ts
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Sun Apr 17 2022 03:56:19 GMT+0700 (Красноярск, стандартное время)
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
