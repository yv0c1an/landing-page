import { GetServerSideProps } from 'next';
import { defaultLocale } from '@/config/i18n';
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