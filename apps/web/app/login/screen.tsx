"use client";

import { useEffect, useState } from "react";
import SocialLoginButtonWrapper from "./_components/social-login-button-wrapper";
import { Toast } from "@readup/ui/atoms/toast";
import { END_POINT } from "@/_constant/end-point";
import { useCookie } from "@/_hooks";

const getSocialHref = (provider: string) => `${END_POINT.BASE_URL}/${END_POINT.LOGIN.OAUTH}/${provider}`;

// ?redirect=${process.env.NEXT_PUBLIC_URL}`;

export default function LoginScreen() {
  const [showToast, setShowToast] = useState(false);
  const [redirectPath, setRedirectPath, deleteRedirectPath] = useCookie<string>("redirect_path", "/");

  const handleLoginClick = (provider: string) => {
    setRedirectPath(window.location.pathname, { path: "/", maxAge: 60 * 5 });
    window.location.href = getSocialHref(provider);
  };

  const handleDismissToast = () => {
    setShowToast(false);
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  useEffect(() => {
    // ✅ 쿠키 기반 리다이렉트 경로 확인 (예: "/signup"에서 왔다면 Toast 노출)
    if (redirectPath === "/signup") {
      handleShowToast();
    }

    // ✅ 쿠키는 한 번 사용 후 삭제
    deleteRedirectPath();
  }, [redirectPath, deleteRedirectPath]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-background">
      <h2 className="typo-h2 text-on-primary">Log-in</h2>
      <SocialLoginButtonWrapper provider="kakao" onClick={() => handleLoginClick("kakao")} className="mt-15" />
      <SocialLoginButtonWrapper provider="naver" onClick={() => handleLoginClick("naver")} />
      <SocialLoginButtonWrapper provider="google" onClick={() => handleLoginClick("google")} />
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
