"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/common/Pagination";
import AddDocument from "@/components/modal/AddDocument";
import AddReport from "@/components/modal/AddReport";
import LargeModal from "@/components/modal/LargeModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const MedicalReport = () => {
  const [addData, setAddData] = useState(false);

  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["we/reports"],
    queryFn: () =>
      APIKit.common.getMedicalReports().then(({ data }) => data?.data?.results),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Medical Reports{" "}
          <span className="text-primary font-bold">({reports?.length})</span>
        </h2>

        <button
          className="p-2 bg-background w-fit rounded-full border border-gray-400"
          onClick={() => setAddData(true)}
        >
          <PlusIcon className="size-6" />
        </button>
      </div>

      {reports.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-primary/[0.1] ">
              <tr className="">
                <th scope="col" className="px-6 py-3 min-w-52">
                  Passport Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Report Image
                </th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report, i) => {
                return (
                  <tr key={i} className="bg-white/[0.5] border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 min-w-52 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {report?.passport_number}
                    </th>
                    <td className="px-6 py-4 ">
                      <Link
                        href={report?.medical_image || "#"}
                        target="_blank"
                        className="line-clamp-1 hover:underline"
                      >
                        {report?.medical_image}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}

      {/* pagination */}
      {/* <Pagination /> */}

      {/* Modal */}
      <LargeModal open={addData} setOpen={setAddData} title={"Add New Report"}>
        <AddReport setOpen={setAddData} refetchReport={refetch} />
      </LargeModal>
    </div>
  );
};

export default MedicalReport;
