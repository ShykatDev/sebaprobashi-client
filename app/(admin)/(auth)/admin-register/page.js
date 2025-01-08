import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      Register Page
      <Link href={"/admin-login"}>Login</Link>
    </div>
  );
};

export default page;
