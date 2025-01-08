import Loading from "@/components/common/Loading";
import LifeInsurance from "@/components/modal/apply/LifeInsurance";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LifeInsurance />
    </Suspense>
  );
};

export default page;
