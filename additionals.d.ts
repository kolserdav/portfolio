import type { NextPage, NextPageContext } from 'next';
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
}
