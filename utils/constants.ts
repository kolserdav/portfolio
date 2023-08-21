/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: constants.ts
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
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
export const HETZNER_REFERAL_LINK = 'https://my.adminvps.ru/aff.php?aff=27795';

export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || '';
export const RESUME_LINK = process.env.NEXT_PUBLIC_RESUME_LINK || '';
