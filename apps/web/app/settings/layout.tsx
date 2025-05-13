"use client";

import Layout from "@/_components/shared/layout";
import { usePathname } from "next/navigation";

const pathnameMapper: Record<string, string> = {
  "/settings": "설정",
  "/settings/profile": "회원 정보 수정",
  "/settings/privacy": "개인정보 처리방침",
  "/settings/terms": "서비스 이용약관",
  "/settings/withdrawal": "회원탈퇴",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const titleText = pathnameMapper[pathname] ?? "설정";
  const onLeftIconPress = () => {
    window.history.back();
  };

  return (
    <Layout
      pathname="/settings"
      topbarProps={{
        text: titleText,
        onLeftClick: onLeftIconPress,
      }}
      bottom={false}
      topVariant="icon1"
    >
      {children}
    </Layout>
  );
}
