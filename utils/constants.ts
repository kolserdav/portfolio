import { Image } from '@prisma/client';

/**
 * Image sizes map
 */
// eslint-disable-next-line import/prefer-default-export
export const IMG_SIZES: Record<
  keyof Omit<Image, 'full' | 'id' | 'coeff' | 'width' | 'created'>,
  number
> = {
  desktop: 1920,
  tablet: 1024,
  mobile: 760,
  small: 320,
};
