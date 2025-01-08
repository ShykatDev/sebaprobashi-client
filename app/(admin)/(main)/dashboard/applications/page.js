import Loading from "@/components/common/Loading";
import Applications from "@/components/pages/admin/Applications";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Applications />
    </Suspense>
  );
};

export default Page;
