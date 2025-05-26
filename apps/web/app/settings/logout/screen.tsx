"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // await fetch("/api/logout", { method: "POST", credentials: "include" });
      } finally {
        // router.replace("/login"); // 로그아웃 후 이동
      }
    };

    logout();
  }, [router]);

  return <p className="text-white">로그아웃 중입니다...</p>;
}
