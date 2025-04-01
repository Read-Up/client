"use client";

import { SocialLoginButton } from "@readup/ui/social-login-button/default";
import { useRouter } from "next/navigation";
// import KakaoLoginButton from "./_assets/kakao_login_medium_wide.png";
// import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="text-head2 text-on_primary">Log-in</h2>
      <SocialLoginButton provider="kakao" className="w-full mt-15" onClick={handleLogin} />
      {/* <Image src={KakaoLoginButton} alt="Kakao Login" className="w-full mt-2.5" /> */}
      <SocialLoginButton provider="naver" className="w-full mt-2.5" onClick={handleLogin} />
      <SocialLoginButton provider="google" className="w-full mt-2.5" onClick={handleLogin} />
      <SocialLoginButton provider="apple" className="w-full mt-2.5" onClick={handleLogin} />
      <p className="text-title3 text-on_primary underline mt-30">고객센터 문의하기</p>
    </div>
  );
}
