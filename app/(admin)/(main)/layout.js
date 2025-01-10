"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import AdminSidebar from "@/components/common/AdminSidebar";
import Loading from "@/components/common/Loading";
import { AppProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

export default function AdminLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen container">
        <div className="bg-background h-screen flex">
          <AuthGuard>
            <AdminSidebar />
            <div className="w-full md:w-4/5 p-6 overflow-y-auto mt-16 md:mt-0">{children}</div>
          </AuthGuard>
        </div>
        <AppProgressBar
            height="4px"
            color="#000576"
            options={{ showSpinner: true }}
            shallowRouting
          />
      </div>
    </Suspense>
  );
}
