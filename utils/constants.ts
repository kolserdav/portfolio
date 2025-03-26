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
  email: 'kolserdav@conhos.ru',
  telegram: 'kolserdav',
  github: 'https://github.com/kolserdav',
};

export const CONHOS_REFERAL_LINK = 'https://conhos.ru';

export const RESUME_LINK_PRINT_EN =
  'https://docs.google.com/document/d/1fjbCWW34GYcBag7buwxxqnsrjEU_3543SXqaCEFujkU/edit?usp=sharing';

export const RESUME_LINK_PRINT_RU =
  'https://docs.google.com/document/d/1YWNd3TvtsjVCRemCTVBItERAY8fPRfg06JjUGyCuEWE/edit?usp=sharing';

export const RESUME_LINK_RU =
  'https://docs.google.com/document/d/e/2PACX-1vTkP5CUuGm0i5Tpeea3brWuWV4WFhfyXMMK4ZnDaZ1IezothoPRay9m014chmP2i-o-lNz808R9fdlZ/pub?embedded=true';
export const RESUME_LINK_EN =
  'https://docs.google.com/document/d/e/2PACX-1vR9cGzVSW5IPCusYh0YevFk4-9uAuFL7JEaKqppVK1UjuWJuoMTTyZOZTFz0w9GhReTlKrmk2-JHhcX/pub?embedded=true';
