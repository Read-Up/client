"use client";

import { ArrowLineUnderSVG, ArrowLineUpSVG } from "@readup/icons";
import { useAgreementStore } from "./_stores/use-agreement-store";
import { PATH } from "@/_constant/routes";
import { Modal, Topbar } from "@readup/ui/molecules";
import { LinearProgress } from "@readup/ui/organisms";
import { Button, Divider, TextBox } from "@readup/ui/atoms";
import { END_POINT } from "@/_constant/end-point";
import { randomNicknameResponseSchema, AgreementItem, AgreementKey } from "./_types";
import { CheckBox } from "@readup/ui/atoms/checkbox";
import { BaseApi } from "@/_client/main/instance";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { getBaseApi } from "@/_server/main/get-instance";
import { SignupResponse } from "@/_types/signup/schema";

export default function SignupScreen({ agreements }: { agreements: AgreementItem[] }) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const { state, toggle, setAll, clear } = useAgreementStore();
  const [expanded, setExpanded] = useState<Partial<Record<AgreementKey, boolean>>>({});
  const [nickname, setNickname] = useState<string>("");
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [agreementModal, setAgreementModal] = useState<boolean>(false);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    clear();
    router.push(PATH.LOGIN.ROOT);
  };

  const openCloseModal = () => {
    setCloseModal(true);
  };

  const handleClose = () => {
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
        const response = await getBaseApi()
          .post(END_POINT.USERS.SIGNUP, {
            body: JSON.stringify(requestBody),
            credentials: "include",
          })
          .json<SignupResponse>();

        if (response.success) {
          alert("회원가입이 완료되었습니다.");
          router.push(PATH.HOME.ROOT);
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
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

  const handleCloseAgreementModal = () => {
    router.push(PATH.LOGIN.ROOT);
    setAgreementModal(false);
  };

  useEffect(() => {
    // 2000ms 후 약관이 로드되었는지 확인
    const timer = setTimeout(() => {
      if (agreements.length === 0) {
        setAgreementModal(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return agreements.length > 0 ? (
    <div className="flex flex-col items-center w-full h-screen text-on-primary bg-background relative">
      {/* Topbar */}
      <Topbar
        className="w-full bg-background text-on-primary typo-title1 h-[50px]"
        variant="icon2"
        onLeftClick={handleBack}
        onRightClick={openCloseModal}
        text={step === 1 ? "회원가입" : "닉네임 설정"}
      />

      {/* ProgressBar */}
      <LinearProgress value={step * 50} />

      {/* Main Content */}
      <main className="flex flex-col w-full h-[calc(100vh-52px)] overflow-y-auto px-4 py-10">
        {/* Info Message */}
        <div className="flex flex-col w-full mt-[22px] typo-title1">
          {step === 1 ? (
            <Fragment>
              <p>리드업 서비스 이용을 위해</p>
              <p>동의가 필요해요</p>
            </Fragment>
          ) : (
            <Fragment>
              <p>리드업 서비스에서</p>
              <p>사용하실 이름을 정해주세요</p>
            </Fragment>
          )}
        </div>

        {step === 1 ? (
          // 약관 목록
          <section className="flex flex-col w-full mt-[50px] gap-4">
            <div className="flex flex-row items-center gap-2">
              <CheckBox
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
                    <CheckBox
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
          </section>
        ) : (
          // 닉네임 입력
          <section className="flex flex-row w-full mt-[50px] gap-2">
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
          </section>
        )}
        {/* 빈 공간을 위한 div */}
        <div className="grow-1" />

        {/* 하단 버튼 */}
        <Button
          className="typo-title2 w-full"
          variant="filled"
          disabled={step === 1 ? !(state.AGE && state.SERVICE && state.PRIVACY) : nickname.length === 0}
          onClick={handleNext}
        >
          {step === 1 ? "확인" : "입력완료"}
        </Button>
      </main>
      <Modal
        open={closeModal}
        onClose={() => setCloseModal(false)}
        title="회원가입을 종료하시겠습니까?"
        subtext="회원가입을 종료하면 입력한 정보가 저장되지 않습니다."
        confirmText="종료"
        cancelText="취소"
        onConfirm={handleClose}
        onCancel={() => setCloseModal(false)}
      >
        <p className="text-sm text-gray-500">회원가입을 종료하면 입력한 정보가 저장되지 않습니다.</p>
      </Modal>
    </div>
  ) : (
    <div className="flex flex-col items-center w-full h-screen text-on-primary bg-background relative">
      {/* Topbar */}
      <Topbar
        className="w-full bg-background text-on-primary typo-title1 h-[50px]"
        variant="icon2"
        onLeftClick={handleBack}
        onRightClick={openCloseModal}
        text={step === 1 ? "회원가입" : "닉네임 설정"}
      />

      {/* ProgressBar */}
      <LinearProgress value={step * 50} />

      {/* Main Content */}
      <main className="flex flex-col w-full h-[calc(100vh-52px)] overflow-y-auto px-4 py-10">
        {/* Info Message */}
        <div className="flex flex-col w-full mt-[22px] typo-title1">
          <p>약관 정보를 불러오는 중입니다.</p>
          <p>잠시만 기다려주세요.</p>
        </div>

        {/* 빈 공간을 위한 div */}
        <div className="grow-1" />

        {/* 하단 버튼 */}
        <Button className="typo-title2 w-full" variant="filled" disabled={true} onClick={() => {}}>
          확인
        </Button>
      </main>
      <Modal
        open={agreementModal}
        onClose={handleCloseAgreementModal}
        title="알림"
        subtext="약관 정보를 불러오는 데 실패했습니다. 다시 시도해주세요."
        confirmText="확인"
        onConfirm={handleCloseAgreementModal}
      />
    </div>
  );
}
