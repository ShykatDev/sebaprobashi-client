import Loading from "@/components/common/Loading";
import Insurances from "@/components/pages/admin/Insurances";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Insurances />
    </Suspense>
  );
};

export default page;
