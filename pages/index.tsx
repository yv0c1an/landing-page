import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/zh',
      permanent: false,
    },
  };
};

export default function Index() {
  return null;
}