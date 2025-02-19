import Head from "next/head";

interface ISEO {
  pageTitle: string;
  pageDescription?: string;
}

export default function SEO({ pageTitle, pageDescription }: ISEO) {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}