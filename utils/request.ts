import axios from 'axios';

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
 * Псевдо метод запроса на сервер
 * @param args
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function send(props: RequestParams): Promise<any> {
  const { method, url, body, params, headers, responseType } = props;
  const _headers = { ...headers } || {};
  if (!_headers['content-type'] && !_headers['Content-Type']) {
    _headers['Content-Type'] = 'application/json';
  }
  return new Promise((resolve) => {
    axios
      .request({
        method: method || 'POST',
        url,
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

/**
 * Get one job
 */
export const jobFindFirst: typeof Frontend.jobFindFirst = async (args) =>
  send({
    url: '/api/v1/job/findFirst',
    method: 'POST',
    body: args,
  });

/**
 * Get many jobs
 */
export const jobFindMany: typeof Frontend.jobFindMany = async (args) =>
  send({
    url: '/api/v1/job/findMany',
    method: 'POST',
    body: args,
  });
