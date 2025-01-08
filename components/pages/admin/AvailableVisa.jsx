"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import AddVisa from "@/components/modal/AddVisa";
import LargeModal from "@/components/modal/LargeModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VisaRow from "./VisaRow";

const AvailableVisa = () => {
  const [addData, setAddData] = useState(false);

  const {
    data: availableVisa,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["we/visa"],
    queryFn: () =>
      APIKit.admin.getAvailableVisa().then(({ data }) => {
        return data?.data?.results
      }),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Available Visa{" "}
          <span className="text-primary font-bold">
            ({availableVisa?.length})
          </span>
        </h2>

        <button
          className="p-2 bg-background w-fit rounded-full border border-gray-400"
          onClick={() => setAddData(true)}
        >
          <PlusIcon className="size-6" />
        </button>
      </div>

      {availableVisa?.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-primary/[0.1] ">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Serial
                </th>
                <th scope="col" className="px-6 py-3">
                  Icon
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Visa Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Publish
                </th>
              </tr>
            </thead>
            <tbody>
              {availableVisa?.map((visa, i) => {
                return (
                  <VisaRow key={i} visa={visa} index={i} refetch={refetch}/>
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
      <LargeModal open={addData} setOpen={setAddData} title={"Add New Visa"}>
        <AddVisa setOpen={setAddData} refetchAvailVisa={refetch} />
      </LargeModal>
    </div>
  );
};

export default AvailableVisa;
