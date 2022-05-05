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

/**
 *  My contancts
 */
export const CONTACTS = {
  email: 'uyem.ru@gmail.com',
  telegram: 'kolserdav',
  github: 'https://github.com/kolserdav',
};

/**
 * My referal link of Hetzner
 */
export const HETZNER_REFERAL_LINK = 'https://hetzner.cloud/?ref=0Vh7MSaYpRFy';
