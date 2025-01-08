import Loading from "@/components/common/Loading";
import Loan from "@/components/pages/public/Loan";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Loan />
    </Suspense>
  );
};

export default page;
