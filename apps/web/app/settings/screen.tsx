import { SettingsList } from "@readup/ui/organisms";
import LinkWrapper from "./_components/link-wrapper";

export default function SettingsScreen() {
  const serviceInfo = [
    { label: "공지사항", href: "/notice" },
    { label: "서비스 이용약관", href: "/terms-of-service" },
    { label: "개인정보 처리방침", href: "/privacy-policy" },
  ];
  const userManagement = [
    { label: "회원정보 수정", href: "/profile" },
    { label: "로그아웃", href: "/logout" },
    { label: "회원탈퇴", href: "/withdrawal" },
  ];

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <SettingsList title="서비스 안내" lists={serviceInfo} />
      <SettingsList title="회원 관리" lists={userManagement} linkComponent={LinkWrapper} />
    </div>
  );
}
