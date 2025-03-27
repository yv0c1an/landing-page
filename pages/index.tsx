import { GetServerSideProps } from 'next';
import { defaultLocale } from '@/config/i18n';


// 重定向到默认语言
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/${defaultLocale}`,
      permanent: false,
    },
  };
};

// 导出空组件
export default function Index() {
  return null;
}