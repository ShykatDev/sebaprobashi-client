"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/common/Pagination";
import AddDocument from "@/components/modal/AddDocument";
import AddJob from "@/components/modal/AddJob";
import LargeModal from "@/components/modal/LargeModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Jobs = () => {
  const [addData, setAddData] = useState(false);

  const {
    data: jobs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["we/jobs"],
    queryFn: () =>
      APIKit.common.getJobs().then(({ data }) => data?.data?.results),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Jobs <span className="text-primary font-bold">({jobs?.length})</span>
        </h2>

        <button
          className="p-2 bg-background w-fit rounded-full border border-gray-400"
          onClick={() => setAddData(true)}
        >
          <PlusIcon className="size-6" />
        </button>
      </div>

      {jobs.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-primary/[0.1]">
              <tr className="">
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Hiring Postion
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Vacancy
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job, i) => {
                return (
                  <tr key={i} className="bg-white/[0.5] border-b ">
                    <td className="px-6 py-3 text-nowrap ">
                      <p>{job?.title}</p>
                    </td>
                    <td className="px-6 py-3 text-nowrap ">
                      <p>{job?.hiring_position}</p>
                    </td>
                    <td className="px-6 py-3 text-nowrap ">
                      <p>{job?.vacancy}</p>
                    </td>
                    <td className="px-6 py-3 text-nowrap ">
                      <p>{job?.area || "N/A"}</p>
                    </td>
                    <td className="px-6 py-3">
                      <p>
                        <span className="line-clamp-2">
                          {job?.description}{" "}
                        </span>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* pagination */}
          {/* <Pagination /> */}
        </div>
      ) : (
        <NoDataFound />
      )}

      {/* Modal */}
      <LargeModal open={addData} setOpen={setAddData} title={"Add New Job"}>
        <AddJob setOpen={setAddData} refetchJob={refetch} />
      </LargeModal>
    </div>
  );
};

export default Jobs;
