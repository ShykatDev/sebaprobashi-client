import Loading from "@/components/common/Loading";
import Outpass from "@/components/pages/admin/Outpass";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Outpass />
    </Suspense>
  );
};

export default page;
