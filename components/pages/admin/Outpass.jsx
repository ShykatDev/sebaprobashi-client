"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import { useQuery } from "@tanstack/react-query";

const Outpass = () => {
  const { data: outPass, isLoading } = useQuery({
    queryKey: ["we/out-pass"],
    queryFn: () =>
      APIKit.admin.getOutpass().then(({ data }) => data?.data?.results),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Outpass Requests{" "}
          <span className="text-primary font-bold">({outPass?.length})</span>
        </h2>
      </div>

      {outPass.length ? (
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
              </tr>
            </thead>
            <tbody>
              {outPass?.map((item, i) => {
                return (
                  <tr key={i} className="bg-white/[0.5] border-b ">
                    <td className="px-6 py-4 text-nowrap">
                      <span>{item?.first_name}</span>{" "}
                      <span>{item?.last_name}</span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{item?.phone_number}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{item?.country}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{item?.present_address}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{item?.passport_number}</p>
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

export default Outpass;
