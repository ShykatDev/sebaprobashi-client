"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import OutpassModal from "@/components/modal/apply/Outpass";
import OutpassPopup from "@/components/modal/confirmation/OutpassPopup";
import LargeModal from "@/components/modal/LargeModal";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AvailableVisa from "./AvailableVisa";

const Homepage = () => {
  const { t } = useTranslation();
  const [noticeModal, setNoticeModal] = useState(false);
  const [outpassModal, setOutpassModal] = useState(false);
  const [outpassConfirm, setOutpassConfirm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["content/heading"],
    queryFn: () =>
      APIKit.common.getContent().then(({ data }) => {
        return data?.data?.results;
      }),
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="relative bg-black">
        <div className="relative w-full h-[30vh] md:h-[60vh]">
          <video
            src="/assets/home.mp4"
            autoPlay
            loop
            muted
            controls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover", // Stretched to fill the screen
            }}
          />
        </div>


        {/* <CarouselSlider /> */}

        <div className="py-3 bg-amber-300">
          <marquee className="text-lg lg:text-2xl font-semibold text-black">
            {data?.heading || t("LOGO.TITLE")}
          </marquee>
        </div>

        {/* <div className="absolute top-0 left-0 w-full h-full z-10 bg-transparent cursor-no-drop"></div> */}
      </div>
      <div className="grid lg:grid-cols-2 divide-y lg:divide-x divide-primary items-start border-b border-primary">
        <div className="border-t border-primary py-10 px-6">
          <h2 className="text-2xl text-primary font-semibold">{t("HOME.TITLE")}</h2>
          {/* <p className="text-gray-500 mt-2">{t("HOME.DESCRIPTION")}</p> */}
          <div dangerouslySetInnerHTML={{__html: t("HOME.DESCRIPTION")}} className="text-gray-500 mt-2"/>
        </div>
        <div className="bg-background py-10 ">
          <AvailableVisa isHomePage />
        </div>
      </div>

      <div className="flex items-center justify-center flex-col p-6">
        <h2 className="text-primary font-semibold text-2xl capitalize">
          {t("OUTPASS.TITLE")}
        </h2>
        <p className="mt-3 md:text-lg md:w-1/2 text-center text-gray-500">
          {t("OUTPASS.DESCRIPTION")}
        </p>

        <button
          onClick={() => setNoticeModal(true)}
          className="mt-6 w-fit p-3 bg-primary text-background rounded-md font-semibold hover:bg-primary/[0.9] disabled:opacity-40"
        >
          {t("OUTPASS.BUTTON")}
        </button>
      </div>

      <LargeModal
        open={noticeModal}
        setOpen={setNoticeModal}
        title={"OUTPASS.TITLE"}
      >
        <OutpassPopup setOpen={setNoticeModal}
          setFormModal={setOutpassModal} />
      </LargeModal>

      <LargeModal
        open={outpassModal}
        setOpen={setOutpassModal}
        title={"OUTPASS.TITLE"}
      >
        <OutpassModal
          setOpen={setNoticeModal}
          setFormModal={setOutpassModal}
          setOutpassConfirm={setOutpassConfirm}
        />
      </LargeModal>

      <LargeModal
        open={outpassConfirm}
        setOpen={setOutpassConfirm}
        title={""}
      >
        <div className="flex flex-col items-center gap-4 p-6">
          <CheckBadgeIcon className="size-16 text-green-500" />
          <h2 className="text-3xl font-semibold">{t("CONFIRMATION.TITLE")}</h2>
          <p className="text-center">
          {t("CONFIRMATION.DESC")}
          </p>
        </div>
      </LargeModal>
    </div>
  );
};

export default Homepage;
