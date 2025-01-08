import Loading from "@/components/common/Loading";
import Jobs from "@/components/pages/admin/Jobs";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Jobs />
    </Suspense>
  );
};

export default page;
