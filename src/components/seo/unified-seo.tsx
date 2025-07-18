import Head from 'next/head';

export default function UnifiedSeo({ title, description }: { title: string; description: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Outras meta tags podem ser adicionadas depois */}
    </Head>
  );
} 