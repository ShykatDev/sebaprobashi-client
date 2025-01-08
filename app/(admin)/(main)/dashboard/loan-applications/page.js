import Loading from "@/components/common/Loading";
import LoanApplications from "@/components/pages/admin/LoanApplications";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LoanApplications />
    </Suspense>
  );
};

export default Page;
