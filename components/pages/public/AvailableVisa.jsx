"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import NoteBeforeApply from "@/components/modal/apply/NoteBeforeApply";
import LargeModal from "@/components/modal/LargeModal";
import { countryOptions } from "@/utils/options";
import customStyles from "@/utils/styles";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

const AvailableVisa = ({ isHomePage = false }) => {
  const searachParam = useSearchParams()
  const country = searachParam.get("country")
  const [isAppling, setIsAppling] = useState(false);
  const [clickedVisa, setClickedVisa] = useState(null);
  const [filterCountry, setFilterCountry] = useState(country || "");
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslation();


  const params = {
    country: filterCountry
  }

  useEffect(()=> {
    if(filterCountry){
      router.push(`${pathName}?country=${filterCountry}`)
    }
  }, [filterCountry])

  const { data: availableVisa, isLoading } = useQuery({
    queryKey: ["available-visa", filterCountry],
    queryFn: () =>
      APIKit.common.getAvailVisa(params).then(({ data }) => data?.data?.results),
    placeholderData: keepPreviousData
  });

  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) {
      router.push(`${pathName}`)
    }
    setFilterCountry(selectedOption?.value); // Set the selected country value
  };

  let data = isHomePage ? availableVisa?.slice(0, 3) : availableVisa;

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div
      className={`px-6 bg-background backdrop-blur-3xl ${isHomePage ? "" : "py-10"
        }`}
    >
      <h2 className="text-primary font-semibold text-2xl ">
        {t("AVAILABLE_VISA.TITLE")}
      </h2>
      <p className="text-lg text-gray-500">{t("AVAILABLE_VISA.SUBTITLE")}</p>

      {!isHomePage ? (
        <div className="mt-4">
        <label className="font-semibold text-lg mb-1 block">
          <span>{t("AVAILABLE_VISA.APPLY_TITLE")}</span>
          <span className={"text-red-500 ml-1"}>*</span>
        </label>
        <Select
          options={countryOptions}
          styles={customStyles}
          placeholder="Select Country..."
          isClearable
          value={countryOptions.find(item => item.value === country)}
          onChange={handleSelectChange}
        />
      </div>
      ) : null}

      <div className="mt-6">
        <div className=" space-y-2">
          {data?.length ? (
            data?.map((visa) => {
              return (
                <div
                  key={visa?._id}
                  className={`flex flex-col md:flex-row justify-between md:items-center gap-3 bg-primary/[0.1] rounded ${isHomePage ? "p-2" : "p-4"
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                  {visa?.icon ? (
                    <Image src={visa?.icon} alt="visa-img" width={90} height={90} className="flex-shrink-0 rounded-md"/>
                  ) : null}
                  <p
                    className={`font-medium text-primary ${isHomePage ? "" : "text-lg font-semibold"
                      }`}
                  >
                    [{countryOptions.find(item => item.value === visa?.country)?.label || "Country"}]
                    {" "}
                    {visa?.title}
                  </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsAppling(true);
                      setClickedVisa(visa)
                      router.push(`${pathName}?visa_id=${visa?._id}`);
                    }}
                    className={`shrink-0 bg-primary rounded text-background font-semibold text-sm hover:bg-primary/[0.9] ${isHomePage ? "px-3 py-1" : "px-4 py-1.5"
                      }`}
                  >
                    {t("AVAILABLE_VISA.DETAILS")}
                  </button>
                </div>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>

      {isHomePage ? (
        <div className="mt-4">
          <Link
            href={"/available-visa"}
            className="border border-primary flex items-center gap-2 text-primary w-fit px-3 rounded py-1 mx-auto md:mx-0 hover:bg-primary/10"
          >
            <span className="text-sm">{t("AVAILABLE_VISA.BUTTON")}</span>{" "}
            <ChevronDoubleRightIcon className="size-4" />
          </Link>
        </div>
      ) : null}

      <LargeModal
        open={isAppling}
        setOpen={setIsAppling}
        title={`${clickedVisa?.title || "Visa"} - Details`}
      >
        <NoteBeforeApply visa={clickedVisa} />
      </LargeModal>
    </div>
  );
};

export default AvailableVisa;
