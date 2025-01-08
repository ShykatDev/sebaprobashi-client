import Loading from "@/components/common/Loading";
import ReportCheck from "@/components/pages/public/ReportCheck";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ReportCheck title={"Check your medical report"} />
    </Suspense>
  );
};

export default page;
