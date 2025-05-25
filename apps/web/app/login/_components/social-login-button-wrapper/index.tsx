import { SocialLoginLink, SocialLoginLinkProps } from "@readup/ui/atoms";

export default function SocialLoginButtonWrapper({
  onClick,
  ...props
}: SocialLoginLinkProps & { onClick: () => void }) {
  return (
    <button className="w-full mt-2.5" onClick={onClick}>
      <SocialLoginLink {...props} />
    </button>
  );
}
