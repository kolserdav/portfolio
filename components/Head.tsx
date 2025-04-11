import NextHead from 'next/head';

const IMAGE_URL = '/images/kolserdav.png';

const Head = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string;
}) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={IMAGE_URL} />
      <meta property="og:url" content="/" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE_URL} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
