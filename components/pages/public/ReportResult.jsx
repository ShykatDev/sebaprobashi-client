import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import NoDataFound from "@/components/common/NoDataFound";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ReportResult = ({ param }) => {
  const { data: documents, isLoading } = useQuery({
    queryKey: ["reports", param],
    queryFn: () =>
      APIKit.common
        .getMedicalReports(param)
        .then(({ data }) => data?.data?.results),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="border bg-white/[0.5] backdrop-blur-md border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center mt-6 relative">
      {documents?.length ? (
        documents?.map((item) => {
          return (
            <div key={item?._id}>
              <div className="flex justify-end mb-6 w-full">
                <a
                  target="_blank"
                  href={item?.medical_image}
                  download
                  className="flex items-center gap-2 px-3 font-medium py-1.5 bg-primary rounded text-background"
                >
                  <ArrowDownTrayIcon className="size-4" /> <span>Download</span>
                </a>
              </div>
              <Image
                alt="result"
                src={item?.medical_image}
                width={600}
                height={600}
                loading="lazy"
              />
            </div>
          );
        })
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default ReportResult;
