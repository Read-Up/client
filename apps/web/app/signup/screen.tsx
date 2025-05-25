"use client";

import { BaseApi } from "@/_client/main/instance";
import { END_POINT } from "@/_constant/end-point";
import { PATH } from "@/_constant/routes";
import { ArrowLineUnderSVG, ArrowLineUpSVG } from "@readup/icons";
import { Button, Divider, TextBox } from "@readup/ui/atoms";
import { Checkbox } from "@readup/ui/atoms/checkbox";
import { Topbar } from "@readup/ui/molecules";
import { LinearProgress } from "@readup/ui/organisms";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useAgreementStore } from "./_stores/use-agreement-store";
import { AgreementItem, AgreementKey, randomNicknameResponseSchema } from "./_types";

export default function SignupScreen({ agreements }: { agreements: AgreementItem[] }) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const { state, toggle, setAll, clear } = useAgreementStore();
  const [expanded, setExpanded] = useState<Partial<Record<AgreementKey, boolean>>>({});
  const [nickname, setNickname] = useState<string>("");

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    clear();
    router.push(PATH.LOGIN.ROOT);
  };

  const handleNext = async () => {
    const isValid = state.AGE && state.SERVICE && state.PRIVACY;
    if (step === 1 && isValid) {
      setStep(2);
    } else if (step === 2 && isValid) {
      try {
        const termsConsentRequestList = agreements.map((item) => ({
          termsVersionId: item.termsVersionId,
          code: item.code,
          isConsent: state[item.code.toUpperCase() as keyof typeof state],
        }));

        const requestBody = {
          termsConsentRequestList,
          nickname,
        };
        const response = await BaseApi.post(END_POINT.USERS.SIGNUP, {
          body: JSON.stringify(requestBody),
        }).json();

        console.log("response: ", response);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleToggleExpand = (key: keyof typeof expanded) => {
    setExpanded((prev) => {
      const isCurrentlyOpen = prev[key];
      return {
        SERVICE: false,
        PRIVACY: false,
        MARKETING: false,
        [key]: !isCurrentlyOpen,
      };
    });
  };

  const createRandomNickname = async () => {
    const response = await BaseApi.get(END_POINT.USERS.RANDOM_NICKNAME).json();

    const parsed = randomNicknameResponseSchema.parse(response);
    if (!parsed.success) {
      alert("닉네임 생성에 실패했습니다.");
      return;
    }
    setNickname(parsed.data);
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
        <Fragment>
          {/* Info Message */}
          <div className="flex flex-col w-full px-4 mt-[62px]">
            <p className="typo-title1">리드업 서비스 이용을 위해</p>
            <p className="typo-title1">동의가 필요해요</p>
          </div>

          <div className="flex flex-col w-full px-4 mt-[50px] gap-4">
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                size="md"
                checked={state.ALL}
                onChange={() => setAll(!state.ALL)}
                className="overflow-visible cursor-pointer"
              />
              <p className="typo-title3">전체 동의</p>
            </div>
            <Divider />
            {agreements.map((item) => (
              <Fragment key={item.code}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      size="md"
                      checked={state[item.code]}
                      onChange={() => toggle(item.code)}
                      className="overflow-visible cursor-pointer"
                    />
                    <p className="typo-title3">
                      {item.code === "MARKETING" ? "(선택)" : "(필수)"} {item.title}
                    </p>
                  </div>
                  {item.content &&
                    (expanded[item.code] ? (
                      <ArrowLineUpSVG
                        size="lg"
                        className="overflow-visible cursor-pointer"
                        onClick={() => handleToggleExpand(item.code)}
                      />
                    ) : (
                      <ArrowLineUnderSVG
                        size="lg"
                        className="overflow-visible cursor-pointer"
                        onClick={() => handleToggleExpand(item.code)}
                      />
                    ))}
                </div>
                {expanded[item.code] && item.content && (
                  <div className="w-full pl-6">
                    <TextBox variant="questionbox" value={item.content} readOnly className="text-[12px]" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}

      {/* 닉네임 설정 */}
      {step === 2 && (
        <Fragment>
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
        </Fragment>
      )}

      {/* 하단 버튼 */}
      <Button
        className="typo-title2 fixed bottom-10 left-4 right-4"
        variant="filled"
        disabled={step === 1 ? !(state.AGE && state.SERVICE && state.PRIVACY) : nickname.length === 0}
        onClick={handleNext}
      >
        {step === 1 ? "확인" : "입력완료"}
      </Button>
    </div>
  );
}
