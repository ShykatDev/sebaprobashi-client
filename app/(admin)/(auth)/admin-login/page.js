import Login from "@/components/auth/Login";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    </div>
  );
};

export default page;
