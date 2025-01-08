import Loading from "@/components/common/Loading";
import Complains from "@/components/modal/apply/Complains";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Complains />
    </Suspense>
  );
};

export default page;
