"use client";

import React from "react";
import { LinearProgress } from "@readup/ui/progress/linear/default";
import { Topbar } from "@readup/ui/topbar/default";
import { useRouter } from "next/navigation";
import { ArrowLineUnderSVG, ArrowLineUpSVG, CheckedSVG, UncheckedSVG } from "@readup/icons";
import { Divider } from "@readup/ui/divider/default";
import { useAgreementStore } from "./_stores/useAgreementStore";
import { Button } from "@readup/ui/button";
import { TextBox } from "@readup/ui/textbox/default";
import AGREEMENT_ITEMS, { AgreementItem } from "./agreements";

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const { agreements, toggle, setAll } = useAgreementStore();
  const [expanded, setExpanded] = React.useState<Partial<Record<AgreementItem["key"], boolean>>>({});
  const [nickname, setNickname] = React.useState<string>("");

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    router.push("/login");
  };

  const handleNext = () => {
    if (agreements.age && agreements.terms && agreements.privacy) {
      setStep(2);
    }
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
    <div className="flex flex-col items-center w-full h-screen text-white relative">
      {/* Topbar */}
      <Topbar
        className="w-full bg-background text-white font-600 text-[20px]"
        variant="icon2"
        onArrowClick={handleBack}
      >
        {step === 1 ? "회원가입" : "닉네임 설정"}
      </Topbar>

      {/* ProgressBar */}
      <LinearProgress value={step * 50} />

      {step === 1 && (
        <React.Fragment>
          {/* Info Message */}
          <div className="flex flex-col w-full px-4 mt-16">
            <p className="text-title1">리드업 서비스 이용을 위해</p>
            <p className="text-title1">동의가 필요해요</p>
          </div>

          <div className="flex flex-col w-full px-4 mt-16 gap-4">
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
              <p className="text-title3">전체 동의</p>
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
                    <p className="text-title3">{item.label}</p>
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
            {/* Button */}
            <Button
              className="text-title2 fixed bottom-10 left-4 right-4"
              variant={agreements.age && agreements.terms && agreements.privacy ? "default" : "disabled"}
              onClick={handleNext}
            >
              확인
            </Button>
          </div>
        </React.Fragment>
      )}

      {step === 2 && (
        <React.Fragment>
          <div className="flex flex-col w-full px-4 mt-16">
            <p className="text-title1">리드업 서비스에서</p>
            <p className="text-title1">사용하실 이름을 정해주세요</p>
          </div>
          <div className="flex flex-row w-full px-4 mt-16 gap-2">
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
          {/* Button */}
          <Button
            className="text-title2 fixed bottom-10 left-4 right-4"
            variant={nickname.length !== 0 ? "default" : "disabled"}
            onClick={handleNext}
          >
            입력완료
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}
