'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SuccessConfirm = () => {
  const router = useRouter();
  const {t} = useTranslation()

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 20000);
  }, []);


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-background rounded-lg px-10 py-10 flex flex-col items-center">
        <Image
          alt="check"
          src={"/assets/check-mark.png"}
          width={60}
          height={60}
          className="rounded-full border border-green-600"
        />

        <h2 className="text-primary text-center font-semibold text-2xl">
          {t("CONFIRMATION.TITLE")}
        </h2>
        <p className="text-center md:w-2/3 text-gray-500 mt-1">
        {t("CONFIRMATION.DESC")}
        </p>

        <Link
          href={"/"}
          className="bg-primary px-6 py-2 rounded-md text-background font-medium mt-4"
        >
          <button>{t("CONFIRMATION.BUTTON")}</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessConfirm;
