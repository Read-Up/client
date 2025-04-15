import { PATH } from "@/_constant/routes";
import SocialLoginButtonWrapper from "./_components/social-login-button-wrapper";

const getSocialHref = (provider: string) => `${PATH.API.PUBLIC.OAUTH}/${provider}`; // `/api/auth/signin/${provider}`;

interface LoginScreenProps {
  error: boolean;
}

export default function LoginScreen({ error }: LoginScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 relative">
      <h2 className="typo-h2 text-on-primary">Log-in</h2>
      <SocialLoginButtonWrapper provider="kakao" href={getSocialHref("kakao")} className="mt-15" />
      <SocialLoginButtonWrapper provider="naver" href={getSocialHref("naver")} className="mt-2.5" />
      <SocialLoginButtonWrapper provider="google" href={getSocialHref("google")} className="mt-2.5" />
      {/* <SocialLoginButtonWrapper provider="apple" href={getSocialHref("apple")} className="mt-2.5" /> */}
      <p className="typo-title3 text-on-primary underline mt-30">고객센터 문의하기</p>
      {error && (
        <div className="bg-white fixed left-4 right-4 bottom-4 h-10 rounded-[6px] flex items-center p-4 typo-body2">
          로그인에 실패했습니다. 다시 시도해주세요.
        </div>
      )}
    </div>
  );
}
