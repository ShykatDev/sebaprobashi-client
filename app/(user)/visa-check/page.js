import Loading from "@/components/common/Loading";
import VisaCheck from "@/components/pages/public/VisaCheck";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VisaCheck title={"Check your visa status"} />
    </Suspense>
  );
};

export default page;
