import Loading from "@/components/common/Loading";
import JobVacancies from "@/components/pages/public/JobVacancies";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <JobVacancies />
    </Suspense>
  );
};

export default page;
