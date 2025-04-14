"use client";

import React from "react";
import { LinearProgress } from "@readup/ui/progress/linear";
import { Topbar } from "@readup/ui/topbar";
import { useRouter } from "next/navigation";
import { ArrowLineUnderSVG, ArrowLineUpSVG, CheckedSVG, UncheckedSVG } from "@readup/icons";
import { Divider } from "@readup/ui/divider";
import { useAgreementStore } from "./_stores/use-agreement-store";
import { Button } from "@readup/ui/button";
import { TextBox } from "@readup/ui/textbox";
import AGREEMENT_ITEMS, { AgreementItem } from "./agreements";
import { PATH } from "@/_constant/routes";

// 닉네임 검증 정규식 (한글, 영어, 숫자만 가능하고 2자 이상 12자 이하
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,12}$/;

// 검증 정규식 외의 추가 검증은 서버로 이관
const validateNickname = (nickname: string): [string, string] => {
  if (nickname.length === 0) {
    return ["닉네임을 입력해주세요.", "text-red-400"];
  }
  if (nickname.length > 12) {
    return ["닉네임은 최대 12자까지 가능합니다.", "text-red-400"];
  }
  if (nickname.length < 2) {
    return ["닉네임은 최소 2자 이상이어야 합니다.", "text-red-400"];
  }
  if (!NICKNAME_REGEX.test(nickname)) {
    return ["닉네임은 한글, 영어, 숫자만 사용 가능합니다.", "text-red-400"];
  }
  return ["사용 가능한 닉네임입니다.", "text-primary"];
};

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const { agreements, toggle, setAll, clear } = useAgreementStore();
  const [expanded, setExpanded] = React.useState<Partial<Record<AgreementItem["key"], boolean>>>({});
  const [nickname, setNickname] = React.useState<string>("");
  const [footnote, setFootnote] = React.useState<[string, string]>(["", "text-primary"]);

  const getRandomNickname = async () => {
    // 추후 서버 API로 교체 예정
    const res = await fetch("https://www.rivestsoft.com/nickname/getRandomNickname.ajax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: "ko" }),
    });
    if (!res.ok) {
      throw new Error("랜덤 닉네임 생성에 실패했습니다.");
    }
    const data = await res.json();
    setFootnote(["사용 가능한 닉네임입니다.", "text-primary"]);
    setNickname(data.data);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    clear();
    router.push(PATH.LOGIN.ROOT);
  };

  const handleChangeNickaname = (value: string) => {
    setNickname(value);
    setFootnote(["", "text-primary"]);
    // 향후 닉네임 검증 로직 추가 예정
    // setFootnote(validateNickname(value));
  };

  const handleNext = () => {
    if (agreements.age && agreements.terms && agreements.privacy) {
      setStep(2);
    }
  };

  const handleFinish = () => {
    // 닉네임 검증
    const errorMessage = validateNickname(nickname);

    if (errorMessage) {
      setFootnote(errorMessage);
      return;
    }

    // 서버로 닉네임 전송
    // 예시: await fetch("/api/signup", { method: "POST", body: JSON.stringify({ nickname }) });

    // 회원가입 완료 후 처리
    alert("회원가입이 완료되었습니다.");
    router.push("/home");
  };

  const handleToggleExpand = (key: keyof typeof expanded) => {
    setExpanded((prev) => {
      const isCurrentlyOpen = prev[key];
      return {
        terms: false,
        privacy: false,
        marketing: false,
        [key]: !isCurrentlyOpen,
      };
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-screen text-on-primary relative">
      {/* Topbar */}
      <Topbar
        className="w-full bg-background text-on-primary typo-title1"
        variant="icon2"
        onLeftClick={handleBack}
        text={step === 1 ? "회원가입" : "닉네임 설정"}
      />

      {/* ProgressBar */}
      <LinearProgress value={step * 50} />

      {/* 회원가입 약관 동의 */}
      {step === 1 && (
        <React.Fragment>
          {/* Info Message */}
          <div className="flex flex-col w-full px-4 mt-[62px]">
            <p className="typo-title1">리드업 서비스 이용을 위해</p>
            <p className="typo-title1">동의가 필요해요</p>
          </div>

          <div className="flex flex-col w-full px-4 mt-[50px] gap-4">
            <div className="flex flex-row items-center gap-2">
              {agreements.all ? (
                <CheckedSVG
                  size="md"
                  className="overflow-visible cursor-pointer"
                  fill="#4A90E2"
                  onClick={() => setAll(!agreements.all)}
                />
              ) : (
                <UncheckedSVG
                  size="md"
                  className="overflow-visible cursor-pointer"
                  onClick={() => setAll(!agreements.all)}
                />
              )}
              <p className="typo-title3">전체 동의</p>
            </div>
            <Divider />
            {AGREEMENT_ITEMS.map((item) => (
              <React.Fragment key={item.key}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    {agreements[item.key] ? (
                      <CheckedSVG
                        size="md"
                        className="overflow-visible cursor-pointer"
                        fill="#4A90E2"
                        onClick={() => toggle(item.key)}
                      />
                    ) : (
                      <UncheckedSVG
                        size="md"
                        className="overflow-visible cursor-pointer"
                        onClick={() => toggle(item.key)}
                      />
                    )}
                    <p className="typo-title3">{item.label}</p>
                  </div>
                  {item.detail &&
                    (expanded[item.key] ? (
                      <ArrowLineUpSVG
                        size="lg"
                        className="overflow-visible cursor-pointer"
                        onClick={() => handleToggleExpand(item.key)}
                      />
                    ) : (
                      <ArrowLineUnderSVG
                        size="lg"
                        className="overflow-visible cursor-pointer"
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
        </React.Fragment>
      )}

      {/* 닉네임 설정 */}
      {step === 2 && (
        <React.Fragment>
          <div className="flex flex-col w-full px-4 mt-[62px]">
            <p className="typo-title1">리드업 서비스에서</p>
            <p className="typo-title1">사용하실 이름을 정해주세요</p>
          </div>
          <div className="flex flex-row w-full px-4 mt-[50px] gap-2">
            {/* 입력창 또는 정보 표시 */}
            <div className="flex items-center justify-between bg-surface px-4 py-3 rounded-[6px] text-sm w-full">
              <input
                type="text"
                value={nickname}
                onChange={(e) => handleChangeNickaname(e.target.value)}
                placeholder="한글, 영어, 숫자만 사용가능"
                className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
                maxLength={12}
              />
              <span className="text-gray-500 ml-2 shrink-0">{nickname.length}/12</span>
            </div>

            {/* 랜덤 닉네임 버튼 */}
            <button
              className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-[6px] whitespace-nowrap"
              onClick={getRandomNickname}
            >
              랜덤닉네임 생성
            </button>
          </div>
          <div className="flex flex-row w-full px-4 mt-2">
            <p className={`typo-title3 ${footnote[1]}`}>{footnote[0]}</p>
          </div>
        </React.Fragment>
      )}

      {/* 하단 버튼 */}
      <Button
        className="typo-title2 fixed bottom-10 left-4 right-4"
        variant="filled"
        disabled={step === 1 ? !(agreements.age && agreements.terms && agreements.privacy) : nickname.length === 0}
        onClick={step === 1 ? handleNext : handleFinish}
      >
        확인
      </Button>
    </div>
  );
}
