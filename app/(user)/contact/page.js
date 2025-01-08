import Loading from "@/components/common/Loading";
import Contact from "@/components/pages/public/Contact";
import { Suspense } from "react";

const ContactPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Contact />
    </Suspense>
  );
};

export default ContactPage;
