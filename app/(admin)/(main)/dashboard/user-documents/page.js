import Loading from "@/components/common/Loading";
import UserDocuments from "@/components/pages/admin/UserDocuments";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserDocuments />
    </Suspense>
  );
};

export default page;
