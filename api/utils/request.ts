/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: request.ts
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import axios from 'axios';
import { API_VERSION, PORT } from './constants';

interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  responseType?: 'arraybuffer' | 'json' | 'blob';
}

/**
 * Request to server method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function send(props: RequestParams): Promise<any> {
  const { method, url, body, params, headers, responseType } = props;
  const _headers = structuredClone(headers) || {};
  if (!_headers['content-type'] && !_headers['Content-Type']) {
    _headers['Content-Type'] = 'application/json';
  }
  return new Promise((resolve) => {
    axios
      .request({
        method: method || 'POST',
        url: `http://127.0.0.1:${PORT}${API_VERSION}${url}`,
        data: body,
        params,
        headers: _headers,
        responseType: responseType || 'json',
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        if (!error.response) {
          // eslint-disable-next-line no-console
          console.error(error);
          resolve({
            status: 'error',
            message: 'No internet',
            data: null,
          });
        } else {
          resolve(error.response.data);
        }
      });
  });
}

export const pageIndexFindFirst: typeof Frontend.pageIndexFindFirst = async (args) =>
  send({
    url: '/pageIndex/findFirst',
    method: 'POST',
    body: args,
  });

export const pageResumeFindFirst: typeof Frontend.pageResumeFindFirst = async (args) =>
  send({
    url: '/pageResume/findFirst',
    method: 'POST',
    body: args,
  });
