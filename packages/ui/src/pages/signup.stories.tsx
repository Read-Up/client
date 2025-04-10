import { Meta, StoryObj } from "@storybook/react";
import { ArrowLineUnderSVG, ArrowLineUpSVG, CheckedSVG, UncheckedSVG } from "@readup/icons";
import React, { useState } from "react";
import { LinearProgress } from "../organisms";
import { Button, Divider, TextBox } from "../atoms";
import { Topbar } from "../molecules";

const AGREEMENT_ITEMS = [
  {
    key: "age",
    label: "만 14세 이상입니다 (필수)",
    detail: "",
  },
  {
    key: "terms",
    label: "서비스 이용약관 (필수)",
    detail: "서비스 이용약관의 세부내용입니다.",
  },
  {
    key: "privacy",
    label: "개인정보 수집 및 이용동의 (필수)",
    detail: "개인정보 처리방침의 세부내용입니다.",
  },
  {
    key: "marketing",
    label: "광고성 정보 수신동의 (선택)",
    detail: "",
  },
] as const;

type AgreementKey = (typeof AGREEMENT_ITEMS)[number]["key"] | "all";

const meta: Meta = {
  title: "Pages/Sign Up",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [agreements, setAgreements] = useState<Record<AgreementKey, boolean>>({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: AgreementKey) => {
    const updated = {
      ...agreements,
      [key]: !agreements[key],
    };

    const allChecked = AGREEMENT_ITEMS.every((item) => updated[item.key]);
    updated.all = allChecked;

    setAgreements(updated);
  };

  const setAll = (value: boolean) => {
    const updated: Record<AgreementKey, boolean> = {
      all: value,
      age: value,
      terms: value,
      privacy: value,
      marketing: value,
    };
    setAgreements(updated);
  };

  const handleToggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Topbar text="회원가입" variant="icon2" style={{ height: "50px" }} />
      <LinearProgress value={50} />
      <main className="flex flex-col items-center w-full h-screen text-on-primary px-4 relative">
        <div className="flex flex-col w-full  mt-[62px]">
          <p className="typo-title1">리드업 서비스 이용을 위해</p>
          <p className="typo-title1">동의가 필요해요</p>
        </div>

        <div className="flex flex-col w-full mt-[50px] gap-4">
          <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setAll(!agreements.all)}>
            {agreements.all ? (
              <CheckedSVG size="md" className="overflow-visible cursor-pointer" fill="#4A90E2" />
            ) : (
              <UncheckedSVG size="md" className="overflow-visible cursor-pointer" />
            )}
            <p className="typo-title3">전체 동의</p>
          </div>

          <Divider />

          {AGREEMENT_ITEMS.map((item) => (
            <React.Fragment key={item.key}>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => toggle(item.key)}>
                  {agreements[item.key] ? (
                    <CheckedSVG size="md" className="overflow-visible cursor-pointer" fill="#4A90E2" />
                  ) : (
                    <UncheckedSVG size="md" className="overflow-visible cursor-pointer" />
                  )}
                  <p className="typo-title3">{item.label}</p>
                </div>
                {item.detail &&
                  (expanded[item.key] ? (
                    <ArrowLineUpSVG size="lg" className="cursor-pointer" onClick={() => handleToggleExpand(item.key)} />
                  ) : (
                    <ArrowLineUnderSVG
                      size="lg"
                      className="cursor-pointer"
                      onClick={() => handleToggleExpand(item.key)}
                    />
                  ))}
              </div>
              {expanded[item.key] && item.detail && (
                <div className="w-full pl-6">
                  <TextBox variant="questionbox" value={item.detail} readOnly className="text-[12px]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          className="typo-title2 fixed bottom-10 left-6 right-6"
          variant="filled"
          disabled={!(agreements.age && agreements.terms && agreements.privacy)}
          onClick={() => alert("다음")}
        >
          확인
        </Button>
      </main>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

const SetNicknameComponent = () => {
  const [nickname, setNickname] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Topbar text="닉네임 설정" variant="icon2" style={{ height: "50px" }} />
      <LinearProgress value={100} />

      <main className="flex flex-col items-center w-full h-screen text-on-primary px-4 relative">
        <div className="flex flex-col w-full  mt-[62px]">
          <p className="typo-title1">리드업 서비스에서</p>
          <p className="typo-title1">사용하실 이름을 정해주세요</p>
        </div>

        <div className="flex flex-row w-full mt-[50px] gap-2">
          {/* 입력창 또는 정보 표시 */}
          <div className="flex items-center justify-between bg-surface px-4 py-3 rounded-[6px] text-sm w-full">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="한글, 영어, 숫자만 사용가능"
              className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
              maxLength={12}
            />
            <span className="text-gray-500 ml-2 shrink-0">{nickname.length}/12</span>
          </div>

          {/* 랜덤 닉네임 버튼 */}
          <button className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-[6px] whitespace-nowrap">
            랜덤닉네임 생성
          </button>
        </div>

        <Button
          className="typo-title2 fixed bottom-10 left-6 right-6"
          variant="filled"
          disabled={nickname.length === 0}
          onClick={() => alert("입력완료")}
        >
          입력완료
        </Button>
      </main>
    </div>
  );
};

export const SetNickname: Story = {
  render: () => <SetNicknameComponent />,
};
