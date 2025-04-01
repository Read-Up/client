"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

import { SiNaver, SiApple } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const socialLoginButtonVariants = cva(
  "inline-flex items-center justify-center w-full gap-2 rounded-[4px] text-[15px] font-600 cursor-pointer transition duration-150 ease-in-out active:shadow-lg",
  {
    variants: {
      variant: {
        kakao: "bg-[#FEE500] text-black hover:bg-[#FEE500]/90",
        naver: "bg-[#03C75A] text-white hover:bg-[#03C75A]/90",
        google: "bg-white text-black hover:bg-gray-100 border border-gray-200",
        apple: "bg-white text-black hover:bg-gray-100 border border-gray-200",
      },
      size: {
        default: "h-[45px] px-4",
      },
    },
    defaultVariants: {
      variant: "kakao",
      size: "default",
    },
  },
);

export interface SocialLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof socialLoginButtonVariants> {
  provider: "kakao" | "naver" | "google" | "apple";
  label?: string;
}

const SocialLoginButton = React.forwardRef<HTMLButtonElement, SocialLoginButtonProps>(
  ({ className, provider, label, size, ...props }, ref) => {
    const icons = {
      kakao: <RiKakaoTalkFill size={18} />,
      naver: <SiNaver size={18} />,
      google: <FcGoogle size={18} />,
      apple: <SiApple size={18} />,
    };

    const textColor =
      // provider === "google" || provider === "kakao" ? "text-black" : "text-white";
      provider === "naver" ? "text-white" : "text-black";

    return (
      <button className={cn(socialLoginButtonVariants({ variant: provider, size, className }))} ref={ref} {...props}>
        {icons[provider]}
        <span className={textColor}>
          {label ??
            {
              kakao: "카카오 계정으로 로그인",
              naver: "네이버 계정으로 로그인",
              google: "구글 계정으로 로그인",
              apple: "애플 계정으로 로그인",
            }[provider]}
        </span>
      </button>
    );
  },
);

SocialLoginButton.displayName = "SocialLoginButton";

export { SocialLoginButton, socialLoginButtonVariants };
