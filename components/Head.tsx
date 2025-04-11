import NextHead from 'next/head';

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
      <meta property="og:image" content="/images/kolserdav.png" />
      <meta property="og:url" content="/" />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
