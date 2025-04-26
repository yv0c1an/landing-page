import Head from "next/head";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import SellerBenefits from "@/components/home/SellerBenefits";
import SellerCases from "@/components/home/SellerCases";
import ServiceFeatures from "@/components/home/ServiceFeatures";

interface HomeProps {
  isValid: boolean;
  visitorType: string;
}

export default function Home({ isValid, visitorType }: HomeProps) {
  // 根据访问者类型记录日志，但不在UI中显示
  console.log(`Visitor type: ${visitorType}, Valid: ${isValid}`);
  
  // 是否限制链接和跳转按钮
  const restrictLinks = !isValid;

  return (
    <>
      <Head>
       <link rel="icon" sizes="32x32" href="/logo.svg" />
      </Head>

      <Header restrictLinks={restrictLinks} />
      <main>
        {/* 所有访问者都显示所有内容，但非有效访问者的跳转按钮被限制 */}
        <Hero restrictContent={restrictLinks} />
        <ServiceFeatures restrictLinks={restrictLinks} />
        <Features restrictLinks={restrictLinks} />
        <SellerBenefits restrictLinks={restrictLinks} />
        <SellerCases restrictLinks={restrictLinks} />
        <CTA restrictLinks={restrictLinks} />
      </main>
      <Footer restrictLinks={restrictLinks} />
    </>
  );
}
