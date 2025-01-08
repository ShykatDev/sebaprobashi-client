"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Complains = () => {
  const { data: complains, isLoading } = useQuery({
    queryKey: ["we/complains"],
    queryFn: () =>
      APIKit.admin.getComplains().then(({ data }) => data?.data?.results),
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Total Complains{" "}
          <span className="text-primary font-bold">({complains?.length})</span>
        </h2>
      </div>

      {complains.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-primary/[0.1] ">
              <tr className="">
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Phone number
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Country
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Passport Number
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Body
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Complain Image
                </th>
              </tr>
            </thead>
            <tbody>
              {complains?.map((complain, i) => {
                return (
                  <tr key={i} className="bg-white/[0.5] border-b ">
                    <td className="px-6 py-4 text-nowrap">
                      <span>{complain?.first_name}</span>{" "}
                      <span>{complain?.last_name}</span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{complain?.phone_number}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{complain?.country}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{complain?.present_address}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{complain?.passport_number}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{complain?.subject}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{complain?.body}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <Link
                        href={complain?.complain_img || "#"}
                        target="_blank"
                        className="line-clamp-1 hover:underline"
                      >
                        {complain?.complain_img || "N/A"}
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
    </div>
  );
};

export default Complains;
