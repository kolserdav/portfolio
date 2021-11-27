import type { NextPage, NextPageContext } from 'next';
import type React from 'react';

declare global {
  type ReactElement = React.ReactElement;
  type Page<T = {}, IP = {}> = NextPage<T, IP>;
  type PageContext = NextPageContext;
  type Component<T = {}, IP = {}> = NextPage<T, IP>;
  type ComponentContext = NextPageContext;
  type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
}
