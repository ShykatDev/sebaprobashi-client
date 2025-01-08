'use client';

import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const NoDataFound = () => {
  const {t} = useTranslation();
  return (
    <div className="mt-6 border bg-white/[0.5] border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center">
      <div className="p-3 bg-primary/[0.2] w-fit rounded-full">
        <NoSymbolIcon className="size-6 text-primary" />
      </div>
      <h2 className="font-semibold text-primary mt-3">
        {t("NOTFOUND.TITLE")}
      </h2>
      <p className="w-3/4 text-center text-gray-400 font-normal text-sm">
      {t("NOTFOUND.DESCRIPTION")}
      </p>
    </div>
  );
};

export default NoDataFound;
