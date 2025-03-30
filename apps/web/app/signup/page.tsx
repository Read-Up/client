"use client";

import { Topbar } from "@readup/ui/topbar/default";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-white">
      <Topbar
        className="absolute w-full top-0 bg-background text-white font-600 text-[20px]"
        variant="icon2"
        onArrowClick={handleBack}
      >
        회원가입
      </Topbar>
    </div>
  );
}
