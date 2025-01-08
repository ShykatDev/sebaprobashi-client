"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const LoanApplications = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["we/loan-applications"],
    queryFn: () =>
      APIKit.admin.getLoanApplications().then(({ data }) => data?.data?.results),
  });

  console.log(applications);
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-background pb-6">
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Total Applications{" "}
          <span className="text-primary font-bold">
            ({applications?.length})
          </span>
        </h2>
      </div>

      {applications?.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-primary/[0.1]">
              <tr className="">
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Profile Image
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Discrict
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Passport Number
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Loan Purpose
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Loan Amount
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Monthly Income
                </th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((user, i) => {
                return (
                  <tr key={i} className="bg-white/[0.5] border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Image
                        src={user?.profile_pic}
                        width={100}
                        height={100}
                        alt="pp"
                        className="size-10 rounded-full"
                      />
                    </th>
                    <td className="px-6 py-4 text-nowrap">
                      <span>{user?.first_name}</span>{" "}
                      <span>{user?.last_name}</span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.district}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.age}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.phone_number}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.passport_number}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.purpose}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.loan_amount}</p>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <p>{user?.income}</p>
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
    </div>
  );
};

export default LoanApplications;
