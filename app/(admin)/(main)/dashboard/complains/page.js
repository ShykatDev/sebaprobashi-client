import Loading from "@/components/common/Loading";
import Complains from "@/components/pages/admin/Complains";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Complains />
    </Suspense>
  );
};

export default page;
