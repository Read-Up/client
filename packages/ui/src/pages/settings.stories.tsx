import { Meta, StoryObj } from "@storybook/react";
import { Topbar } from "../topbar";
import { SettingsList } from "../lists/settings/default";

const meta = {
  title: "Pages/Settings",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const serviceInfo = [
      { label: "공지사항", href: "/notice" },
      { label: "서비스 이용약관", href: "/terms-of-service" },
      { label: "개인정보 처리방침", href: "/privacy-policy" },
    ];
    const userManagement = [
      { label: "회원정보 수정", href: "/profile" },
      { label: "로그아웃", onClick: () => alert("로그아웃") },
      { label: "회원탈퇴", href: "/withdrawal" },
    ];

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Topbar text="설정" variant="icon1" style={{ height: "50px" }} />
        <main className="flex flex-col items-center w-full text-on-primary px-4 relative gap-4 mt-3">
          <SettingsList title="서비스 안내" lists={serviceInfo} />
          <SettingsList title="회원 관리" lists={userManagement} />
        </main>
      </div>
    );
  },
};
