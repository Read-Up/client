import Link from "next/link";
import { SocialLoginLink, SocialLoginLinkProps } from "@readup/ui/social-login-button/default";

const SocialLoginButtonWrapper = ({ href, ...props }: SocialLoginLinkProps & { href: string }) => {
  return (
    <Link href={href} className="w-full">
      <SocialLoginLink {...props} />
    </Link>
  );
};

export default SocialLoginButtonWrapper;
