import cn from "@/common/helpers/UtilKit";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

const Loading = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full h-96 flex flex-col gap-3 items-center justify-center bg-white/20",
        className
      )}
    >
      <ArrowPathIcon className="size-6 animate-spin" />
      <h2 className="font-semibold text-lg">Loading...</h2>
    </div>
  );
};

export default Loading;
