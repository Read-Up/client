import { LinkComponentType } from "@readup/ui/organisms";
import Link from "next/link";

interface LinkWrapperProps {
  children: React.ReactNode;
  href: string;
}

const LinkWrapper: LinkComponentType = ({ children, href }: LinkWrapperProps) => {
  return <Link href={href}>{children}</Link>;
};

export default LinkWrapper;
