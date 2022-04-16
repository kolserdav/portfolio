/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: additionals.d.ts
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Sun Apr 17 2022 03:56:18 GMT+0700 (Красноярск, стандартное время)
 ******************************************************************************************/
import type { NextPage, NextPageContext } from 'next';
import * as E from 'express';
import { Prisma as P, Job, Image, PrismaPromise } from '@prisma/client';
import type React from 'react';

declare global {
  type ReactElement = React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Page<T = any, IP = any> = NextPage<T, IP>;
  type PageContext = NextPageContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Component<T = any, IP = any> = NextPage<T, IP>;
  type ComponentContext = NextPageContext;
  type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
  type FullJob = Job & {
    Image: Image;
  };

  /**
   * Common types
   */
  namespace Api {
    /**
     * Server response status
     */
    type Status = 'error' | 'warning' | 'success';
    /**
     * Server response type
     */
    interface Result<T> {
      status: Status;
      message: string;
      data: T;
      stdErrMessage?: string;
      skip?: number | null;
      take?: number | null;
      count?: number | null;
    }
  }

  /**
   * Frontend types
   */
  namespace Frontend {
    /**
     * Get one job
     */
    function jobFindFirst<T extends P.JobFindFirstArgs>(
      args: P.SelectSubset<T, P.JobFindFirstArgs>
    ): Promise<P.CheckSelect<T, Api.Result<Job>, PrismaPromise<Api.Result<P.JobGetPayload<T>>>>>;

    /**
     * Get many jobs
     */
    function jobFindMany<T extends P.JobFindManyArgs>(
      args: P.SelectSubset<T, P.JobFindManyArgs>
    ): Promise<
      P.CheckSelect<T, Api.Result<Array<Job>>, PrismaPromise<Api.Result<Array<P.JobGetPayload<T>>>>>
    >;
  }

  /**
   * Backend types
   */
  namespace Backend {
    /**
     * Express request handler
     */
    interface RequestHandler<Query, Body, Response> {
      (
        req: E.Request<Record<string, string>, Api.Result<Response>, Body, Query>,
        res: E.Response<Api.Result<Response>>
      ): Promise<E.Response<Api.Result<Response>, Record<string, Response>>>;
    }
  }
}
