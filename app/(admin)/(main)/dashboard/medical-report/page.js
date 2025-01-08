import Loading from "@/components/common/Loading";
import MedicalReport from "@/components/pages/admin/MedicalReport";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MedicalReport />
    </Suspense>
  );
};

export default page;
