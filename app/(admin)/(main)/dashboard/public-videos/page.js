import Loading from "@/components/common/Loading";
import PublicVideos from "@/components/pages/admin/PublicVideos";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PublicVideos />
    </Suspense>
  );
};

export default page;
