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
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
