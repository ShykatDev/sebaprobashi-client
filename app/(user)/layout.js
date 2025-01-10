"use client";

import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/common/Navbar";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserLayout = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLanguageSet, setIsLanguageSet] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const defaultLocal = JSON.parse(localStorage.getItem("lang"));
      if (defaultLocal) {
        i18n.changeLanguage(defaultLocal.lang.toLowerCase());
      } else {
        i18n.changeLanguage("en"); // Fallback language if none is set in localStorage
      }
      setIsLanguageSet(true);
    }
  }, [i18n]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogin = JSON.parse(localStorage.getItem("auth"));

      if (!isLogin) {
        router.push("/login");
      }
    }
  }, [pathName]);

  if (!isLanguageSet) {
    return <Loading className={"h-screen"} />; // Display loading while setting language
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="container border-x border-primary">
        <Navbar />
        <div className="min-h-[calc(100vh-256px)] bg-background ">
          
          {children}
          <ProgressBar
            height="4px"
            color="#000576"
            options={{ showSpinner: true }}
            shallowRouting
          />
        </div>
        <Footer />
        {/* <AudioControl className={"fixed bottom-4 left-2 z-50"}/> */}
        {/* <FacebookMsg /> */}

        <Link
          href={"https://wa.me/message/NGNPK7GJ6JZNN1"}
          target="_blank"
          className="fixed bottom-6 right-6"
        >
          <Image
            alt="whatsapp"
            src={"/assets/whatsapp.png"}
            width={100}
            height={100}
            className="size-12"
          />
        </Link>
      </div>
    </Suspense>
  );
};

export default UserLayout;
