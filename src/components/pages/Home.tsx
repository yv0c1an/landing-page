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
        <title>Thryza -  Rise Above Shopping</title>
        <meta name="description" content="Explore Thryza, your gateway to a new era of shopping where convenience, quality, and innovation meet" />
        <link rel="icon" sizes="32x32" href="/logo.svg" />
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
