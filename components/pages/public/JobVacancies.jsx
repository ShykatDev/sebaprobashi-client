"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import Application from "@/components/modal/apply/Application";
import LargeModal from "@/components/modal/LargeModal";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const JobVacancies = () => {
  const [isAppling, setIsAppling] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslation();

  const {
    data: jobs,
    isLoading,
  } = useQuery({
    queryKey: ["we/jobs"],
    queryFn: () =>
      APIKit.common.getJobs().then(({ data }) => data?.data?.results),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-background px-6 py-10">
      <h2 className="text-primary font-medium text-2xl ">{t("JOB.TITLE")}</h2>
      <p className="text-lg text-gray-500">{t("JOB.SUBTITLE")}</p>
      <div className="space-y-4 mt-6">
        {jobs?.length ? (
          jobs?.map((job) => {
            return (
              <div key={job?._id} className="p-4 bg-primary/[0.1] rounded">
                <div className="flex flex-col-reverse gap-y-3 lg:flex-row items-start lg:items-center justify-between">
                  <div className="flex flex-col lg:flex-row lg:divide-x-2 divide-primary lg:gap-3">
                    <h2 className="text-2xl font-semibold">{job?.title}</h2>
                    <h2 className="text-2xl font-bold text-primary lg:pl-3">
                      {job?.hiring_position}
                    </h2>
                  </div>
  
                  <button
                    onClick={() => {
                      setIsAppling(true);
                      router.push(`${pathName}?job_id=${job?._id}`);
                    }}
                    className="shrink-0 px-4 py-1.5 bg-primary rounded text-background font-semibold hover:bg-primary/[0.9]"
                  >
                    {t("AVAILABLE_VISA.APPLY")}
                  </button>
                </div>
                <p className="text-lg font-semibold">
                  Vacancy:{" "}
                  <span className="font-bold text-primary">{job?.vacancy}</span>
                </p>
                <p className="mt-2 text-gray-600">{job?.description}</p>
              </div>
            );
          })
        ) : (
          <NoDataFound/>
        )}
      </div>

      <LargeModal
        open={isAppling}
        setOpen={setIsAppling}
        title={"Job Application"}
      >
        <Application setOpen={setIsAppling} />
      </LargeModal>
    </div>
  );
};

export default JobVacancies;
