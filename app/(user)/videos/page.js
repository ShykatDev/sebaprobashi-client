import Loading from "@/components/common/Loading";
import Videos from "@/components/pages/public/Videos";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Videos />
    </Suspense>
  );
};

export default page;
