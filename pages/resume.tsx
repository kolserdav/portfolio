/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: index.tsx
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import type { NextPage, GetServerSidePropsContext } from 'next';
import clsx from 'clsx';
import '@kolserdav/swiper/dist/styles.css';
import s from '../styles/Page.module.scss';
import { request } from '../api/utils';
import Head from '../components/Head';
import ResumeFrame from '../components/ResumeFrame';

interface Props {
  page: Api.Result<Backend._PageResume>;
}

const Resume: NextPage<Props> = ({ page }: Props) => {
  const { data } = page;

  const _data = data;

  return (
    <div className={s.wrapper__global}>
      <Head
        title={_data?.metaTitle}
        description={_data?.metaDescription}
        keywords={_data?.metaDescription}
      />
      <main className={clsx(s.main, s.row)}>
        <ResumeFrame title={_data?.metaDescription} printVersion={_data?.printVersion} />
      </main>
    </div>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<{ props: Props }> {
  const lang: any = locale;
  const page = await request.pageResumeFindFirst({
    where: {
      lang,
    },
  });
  return {
    props: {
      page,
    },
  };
}

export default Resume;
