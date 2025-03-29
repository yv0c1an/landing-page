import Head from "next/head";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import SellerBenefits from "@/components/home/SellerBenefits";
import SellerCases from "@/components/home/SellerCases";
import ServiceFeatures from "@/components/home/ServiceFeatures";

export default function Home() {
  return (
    <>
      <Head>
      <title>{process.env.NEXT_PUBLIC_TITLE || ''}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION ||''} />
       <link rel="icon" sizes="32x32" href="/logo.svg" />
      </Head>

      <Header />
      <main>
        <Hero />
        <ServiceFeatures />
        <Features />
        {/* <PlatformInfo /> */}
        <SellerBenefits />
        <SellerCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
