import Loading from "@/components/common/Loading";
import AvailableVisa from "@/components/pages/public/AvailableVisa";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AvailableVisa />
    </Suspense>
  );
};

export default page;
