import Head from "next/head";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import PlatformInfo from "@/components/home/PlatformInfo";
import SellerBenefits from "@/components/home/SellerBenefits";
import RegistrationSteps from "@/components/home/RegistrationSteps";
import SellerCases from "@/components/home/SellerCases";

export default function Home() {
  return (
    <>
      <Head>
        <title>CrossBorder - 全球跨境电商平台</title>
        <meta name="description" content="连接全球买家和卖家，提供一站式跨境电商解决方案。" />
      </Head>

      <Header />
      <main>
        <Hero />
        <PlatformInfo />
        <SellerBenefits />
        <RegistrationSteps />
        <Features />
        <Testimonials />
        <SellerCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
