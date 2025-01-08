"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import AdminSidebar from "@/components/common/AdminSidebar";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

export default function AdminLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen container">
        <div className="bg-background h-screen flex">
          <AuthGuard>
            <AdminSidebar />
            <div className="w-4/5 p-6 overflow-y-auto">{children}</div>
          </AuthGuard>
        </div>
      </div>
    </Suspense>
  );
}
