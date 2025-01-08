"use client";

import { SideBarOptions } from "@/utils/options";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { inject, observer } from "mobx-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = ({ meStore }) => {
  const pathName = usePathname();
  let user = meStore.we?.data?.user;
  return (
    <div className="w-1/4 border-r border-gray-400 py-6 flex flex-col justify-between">
      <div>
        <div className="px-6">
          <h2 className="text-lg font-bold">
            {user?.first_name} {user?.last_name}
          </h2>
          <small>{user?.email}</small>
        </div>

        <hr className="border border-gray-400 my-3" />

        <ul className="flex flex-col gap-y-2">
          {SideBarOptions.map((item, i) => {
            return (
              <Link
                href={item.url}
                key={i}
                className={`text-lg font-semibold flex items-center gap-2 py-3 px-6 transition-all duration-200 ${
                  pathName === item.url
                    ? "bg-primary/[0.1] text-black"
                    : "text-gray-500"
                }`}
              >
                <div
                  className={`size-5 transition-all duration-200 ${
                    pathName === item.url ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`transition-all duration-200 ${
                    pathName === item.url ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="px-6">
        <Link href={"/logout"}>
          <button className="w-full bg-red-100 border border-red-700 text-red-700 p-3 rounded-md font-semibold flex justify-center items-center gap-2">
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default inject("meStore")(observer(AdminSidebar));
