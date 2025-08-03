"use client";

import Layout from "@/_components/shared/shared-layout";
import { PATH } from "@/_constant/routes";
import { SaveSVG } from "@readup/icons";
import { usePathname, useRouter } from "next/navigation";

export default function CreateQuizLayout({
  children,
  title,
  onRightClick,
}: {
  children: React.ReactNode;
  title: string;
  onRightClick: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Layout
      top={true}
      pathname={PATH.QUIZ.ROOT}
      topbarProps={{
        text: title,
        rightSVG: <SaveSVG size="md" className="cursor-pointer" />,
        onLeftClick: () => router.push(`${PATH.BOOKS.ROOT}/${pathname.split("/").pop()}`),
        onRightClick: onRightClick,
      }}
      topVariant="icon2"
      bottom={false}
    >
      {children}
    </Layout>
  );
}
