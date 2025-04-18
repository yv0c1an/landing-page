import { GetServerSideProps } from 'next';

// 重定向到英文版本
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/en', // 直接硬编码重定向到英文
      permanent: false,
    },
  };
};

// 导出空组件
export default function Index() {
  return null;
}