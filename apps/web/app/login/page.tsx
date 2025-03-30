import { SocialLoginButton } from "@readup/ui/social-login-button/default";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="text-head2 text-on_primary">Log-in</h2>
      <SocialLoginButton provider="kakao" className="w-full mt-15" />
      <SocialLoginButton provider="naver" className="w-full mt-2.5" />
      <SocialLoginButton provider="google" className="w-full mt-2.5" />
      <SocialLoginButton provider="apple" className="w-full mt-2.5" />
      <p className="text-title3 text-on_primary underline mt-30">고객센터 문의하기</p>
    </div>
  );
}
