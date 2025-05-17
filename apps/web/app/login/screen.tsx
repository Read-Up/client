"use client";

import { useState } from "react";
import SocialLoginButtonWrapper from "./_components/social-login-button-wrapper";
import { Toast } from "@readup/ui/atoms/toast";
import { END_POINT } from "@/_constant/end-point";

const getSocialHref = (provider: string) =>
  `${END_POINT.BASE_URL}${END_POINT.LOGIN.OAUTH}/${provider}?redirect=${process.env.NEXT_PUBLIC_URL}`;

export default function LoginScreen() {
  const [showToast, setShowToast] = useState(false);

  const handleDismissToast = () => {
    setShowToast(false);
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="typo-h2 text-on-primary">Log-in</h2>
      <SocialLoginButtonWrapper provider="kakao" href={getSocialHref("kakao")} className="mt-15" />
      <SocialLoginButtonWrapper provider="naver" href={getSocialHref("naver")} className="mt-2.5" />
      <SocialLoginButtonWrapper provider="google" href={getSocialHref("google")} className="mt-2.5" />
      <p className="typo-title3 text-on-primary underline mt-30" onClick={handleShowToast}>
        고객센터 문의하기
      </p>
      <Toast
        text="해당 계정으로 로그인 정보를 찾을 수 없습니다."
        textColor="error"
        timeout={3000}
        onDismiss={handleDismissToast}
        isOpen={showToast}
      />
    </div>
  );
}
