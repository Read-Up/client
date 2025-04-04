import { SocialLoginLink, SocialLoginLinkProps } from "@readup/ui/social-login-button";
import Link from "next/link";

const SocialLoginButtonWrapper = ({ href, ...props }: SocialLoginLinkProps & { href: string }) => {
  return (
    <Link href={href} className="w-full">
      <SocialLoginLink {...props} />
    </Link>
  );
};

export default SocialLoginButtonWrapper;
