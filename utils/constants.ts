/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: constants.ts
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Fri May 06 2022 04:40:01 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
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
  email: 'kolserdav@uyem.ru',
  telegram: 'kolserdav',
  github: 'https://github.com/kolserdav',
};

/**
 * My referal link of Hetzner
 */
export const HETZNER_REFERAL_LINK = 'https://hetzner.cloud/?ref=0Vh7MSaYpRFy';
