"use client";

import Layout from "@/_components/shared/shared-layout";
import { PATH } from "@/_constant/routes";
import { usePathname } from "next/navigation";

/**
 * 라벨 매핑
 * @description 각 설정 화면에 대한 라벨을 매핑합니다.
 * @type {Record<string, string>}
 */
const SETTINGS_LABELS: Record<string, string> = {
  [PATH.SETTINGS.ROOT]: "설정",
  [PATH.SETTINGS.PROFILE]: "회원정보 수정",
  [PATH.SETTINGS.PRIVACY_POLICY]: "개인정보 처리방침",
  [PATH.SETTINGS.TERMS_OF_SERVICE]: "서비스 이용약관",
  [PATH.SETTINGS.WITHDRAWAL]: "회원탈퇴",
  [PATH.SETTINGS.NOTICE]: "공지사항",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const titleText = SETTINGS_LABELS[pathname] ?? "설정";
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
