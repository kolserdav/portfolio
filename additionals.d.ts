import type { NextPage, NextPageContext } from 'next';
import * as E from 'express';
import { Prisma, Job as JobApi } from '@prisma/client';
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
  type Job = JobApi;

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
    function jobFindFirst(args: Prisma.JobFindFirstArgs): Promise<Api.Result<Job | null>>;
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
