"use client";

import { MemberAPI } from "@/_client/main/member-api";
import { PATH } from "@/_constant/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await MemberAPI.logout();
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      } finally {
        router.push(PATH.HOME.ROOT);
      }
    };

    logout();
  }, [router]);

  return <p className="text-white">로그아웃 중입니다...</p>;
}
