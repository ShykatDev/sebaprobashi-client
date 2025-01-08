"use client";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/admin-login");
  }, []);

  return null;
}
