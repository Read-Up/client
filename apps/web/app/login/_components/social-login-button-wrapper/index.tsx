import { SocialLoginLink, SocialLoginLinkProps } from "@readup/ui/atoms";
import Link from "next/link";

export default function SocialLoginButtonWrapper({ href, ...props }: SocialLoginLinkProps & { href: string }) {
  return (
    <Link href={href} className="w-full">
      <SocialLoginLink {...props} />
    </Link>
  );
}
