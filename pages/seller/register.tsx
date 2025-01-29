import { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Thryza';

const SellerRegister: NextPage = () => {
  return (
    <>
      <Head>
        <title>商家入驻 - ${appName}</title>
        <meta
          name="description"
          content="加入CrossBorder跨境电商平台，开启您的全球贸易之旅。"
        />
      </Head>

      <Header />
      <main className="min-h-screen pt-16">
        {/* 这里添加入驻页面的具体内容 */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center">商家入驻</h1>
          {/* 添加入驻流程和表单 */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SellerRegister; 