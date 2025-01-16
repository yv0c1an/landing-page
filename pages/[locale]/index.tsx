import { GetStaticProps } from 'next';
import Home from '@/components/pages/Home';

export default function IndexPage() {
  return <Home />;
}

export const getStaticProps: GetStaticProps = async ({ params }: { params: { locale: string } }) => {
  return {
    props: {
      messages: (await import(`@/locales/${params.locale}`)).default,
      locale: params.locale
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: 'zh' } },
      { params: { locale: 'en' } },
      { params: { locale: 'ja' } },
      { params: { locale: 'th' } },
      { params: { locale: 'ko' } }
    ],
    fallback: false
  };
}
