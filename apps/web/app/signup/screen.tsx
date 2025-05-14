"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLineUnderSVG, ArrowLineUpSVG } from "@readup/icons";
import { useAgreementStore } from "./_stores/use-agreement-store";
import AGREEMENT_ITEMS, { AgreementItem } from "./agreements";
import { PATH } from "@/_constant/routes";
import { Topbar } from "@readup/ui/molecules";
import { LinearProgress } from "@readup/ui/organisms";
import { Button, Divider, TextBox } from "@readup/ui/atoms";
import { END_POINT } from "@/_constant/end-point";
import ky from "ky";
import { randomNicknameResponseSchema } from "./_types";
// import { useAgreementsData } from "./_stores/use-agreement-data";
import { CheckBox } from "@readup/ui/atoms/checkbox";

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const { agreements, toggle, setAll, clear } = useAgreementStore();
  const [expanded, setExpanded] = React.useState<Partial<Record<AgreementItem["key"], boolean>>>({});
  const [nickname, setNickname] = React.useState<string>("");
  // const { items: agreementsItems } = useAgreementsData();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    clear();
    router.push(PATH.LOGIN.ROOT);
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

  const createRandomNickname = async () => {
    const response = await ky
      .get(`${END_POINT.BASE_URL}${END_POINT.USERS.RANDOM_NICKNAME}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .json();
    const parsed = randomNicknameResponseSchema.parse(response);
    if (!parsed.success) {
      alert("닉네임 생성에 실패했습니다.");
      return;
    }
    setNickname(parsed.data);
  };

  /**
   * 회원가입 첫 렌더링 시 약관 정보 불러오기
   */
  // useEffect(() => {
  //   const fetchAgreements = async () => {
  //     try {
  //       const response = await ky
  //         .get(`${END_POINT.BASE_URL}${END_POINT.USERS.AGREEMENTS}`, {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         })
  //         .json();
  //       const parsed = randomNicknameResponseSchema.parse(response);
  //       if (!parsed.success) {
  //         throw new Error();
  //       }
  //       useAgreementsData.getState().setItems(parsed.data);
  //     } catch (error) {
  //       console.error("약관 정보 불러오기 실패", error);
  //     }
  //   };
  //   fetchAgreements();
  // }, []);

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
              <CheckBox
                size="md"
                checked={agreements.all}
                onChange={() => setAll(!agreements.all)}
                className="overflow-visible cursor-pointer"
              />
              <p className="typo-title3">전체 동의</p>
            </div>
            <Divider />
            {AGREEMENT_ITEMS.map((item) => (
              <React.Fragment key={item.key}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <CheckBox
                      size="md"
                      checked={agreements[item.key]}
                      onChange={() => toggle(item.key)}
                      className="overflow-visible cursor-pointer"
                    />
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
                onChange={(e) => setNickname(e.target.value)}
                placeholder="한글, 영어, 숫자만 사용가능"
                className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
                maxLength={12}
              />
              <span className="text-gray-500 ml-2 shrink-0">{nickname.length}/12</span>
            </div>

            {/* 랜덤 닉네임 버튼 */}
            <button
              className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-[6px] whitespace-nowrap"
              onClick={createRandomNickname}
            >
              랜덤닉네임 생성
            </button>
          </div>
        </React.Fragment>
      )}

      {/* 하단 버튼 */}
      <Button
        className="typo-title2 fixed bottom-10 left-4 right-4"
        variant="filled"
        disabled={step === 1 ? !(agreements.age && agreements.terms && agreements.privacy) : nickname.length === 0}
        onClick={handleNext}
      >
        확인
      </Button>
    </div>
  );
}
