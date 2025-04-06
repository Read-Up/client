import { KakaoSVG } from "@readup/icons";
import { SiNaver, SiApple } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { color } from "@readup/tokens";

export interface SocialLoginLinkProps {
  provider: "kakao" | "naver" | "google" | "apple";
  label?: string;
  className?: string;
}

export const SocialLoginLink = ({ provider, label, className }: SocialLoginLinkProps) => {
  const icons = {
    kakao: <KakaoSVG size="md" fill="#000" />,
    naver: <SiNaver size={18} />,
    google: <FcGoogle size={18} />,
    apple: <SiApple size={18} />,
  };

  const variantClasses = {
    kakao: `bg-[${color.kakao}] text-black hover:bg-[${color.kakao}]/90`,
    naver: `bg-[${color.naver}] text-white hover:bg-[${color.naver}]/90`,
    google: "bg-white text-black hover:bg-gray-100 border border-gray-200",
    apple: "bg-white text-black hover:bg-gray-100 border border-gray-200",
  };

  return (
    <div
      className={`inline-flex items-center justify-center w-full gap-2 rounded-[4px] text-[15px] font-600 transition duration-150 ease-in-out active:shadow-lg h-[45px] px-4 ${variantClasses[provider]} ${className}`}
    >
      {icons[provider]}
      <span>
        {label ??
          {
            kakao: "카카오 계정으로 로그인",
            naver: "네이버 계정으로 로그인",
            google: "구글 계정으로 로그인",
            apple: "애플 계정으로 로그인",
          }[provider]}
      </span>
    </div>
  );
};
