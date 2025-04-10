import { Meta, StoryObj } from "@storybook/react";
import { SettingsList } from "./default";
import { Topbar } from "../../topbar";

const DummyLink = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>;

const meta = {
  title: "List/Settings",
  component: SettingsList,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "리스트의 제목",
    },
    lists: {
      control: false,
    },
    linkComponent: {
      control: false,
    },
  },
  args: {
    title: "서비스 안내",
    lists: [
      { label: "공지사항", href: "/notice" },
      { label: "서비스 이용약관", href: "/terms-of-service" },
      { label: "개인정보 처리방침", href: "/privacy-policy" },
      {
        label: "로그아웃",
        onClick: () => {
          alert("로그아웃");
        },
      },
    ],
    linkComponent: DummyLink,
  },
} satisfies Meta<typeof SettingsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full flex items-center px-4 py-8 bg-background">
      <SettingsList {...args} />
    </div>
  ),
};

export const Settings: Story = {
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
      <div className="w-full h-screen flex flex-col bg-background">
        <Topbar text="설정" variant="icon1" />
        <div className="w-full flex flex-col p-4 gap-4">
          <SettingsList title="서비스 안내" lists={serviceInfo} />
          <SettingsList title="회원 관리" lists={userManagement} />
        </div>
      </div>
    );
  },
};
