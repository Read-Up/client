import SocialLoginButtonWrapper from "./_components/social-login-button-wrapper";

const getSocialHref = (provider: string) => `/signup?login=${provider}`; // `/api/auth/signin/${provider}`;

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="typo-h2 text-on-primary">Log-in</h2>
      <SocialLoginButtonWrapper provider="kakao" href={getSocialHref("kakao")} className="mt-15" />
      <SocialLoginButtonWrapper provider="naver" href={getSocialHref("naver")} className="mt-2.5" />
      <SocialLoginButtonWrapper provider="google" href={getSocialHref("google")} className="mt-2.5" />
      <SocialLoginButtonWrapper provider="apple" href={getSocialHref("apple")} className="mt-2.5" />
      <p className="typo-title3 text-on-primary underline mt-30">고객센터 문의하기</p>
    </div>
  );
}
