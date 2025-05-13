import { SettingsList } from "@readup/ui/organisms";
import LinkWrapper from "./_components/link-wrapper";
import { PATH } from "@/_constant/routes";

export default function SettingsScreen() {
  const serviceInfo = [
    { label: "공지사항", href: PATH.SETTINGS.NOTICE },
    { label: "서비스 이용약관", href: PATH.SETTINGS.TERMS_OF_SERVICE },
    { label: "개인정보 처리방침", href: PATH.SETTINGS.PRIVACY_POLICY },
  ];
  const userManagement = [
    { label: "회원정보 수정", href: PATH.SETTINGS.PROFILE },
    { label: "로그아웃", href: PATH.SETTINGS.LOGOUT },
    { label: "회원탈퇴", href: PATH.SETTINGS.WITHDRAWAL },
  ];

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <SettingsList title="서비스 안내" lists={serviceInfo} linkComponent={LinkWrapper} />
      <SettingsList title="회원 관리" lists={userManagement} linkComponent={LinkWrapper} />
    </div>
  );
}
