"use client";

import Layout from "@/_components/shared/layout";
import { PATH } from "@/_constant/routes";
import { usePathname, useRouter } from "next/navigation";

export default function QuizListLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Layout
      top={true}
      pathname={PATH.QUIZ.ROOT}
      topbarProps={{
        text: title,
        onLeftClick: () => router.push(`${PATH.BOOKS.ROOT}/${pathname.split("/").pop()}`),
      }}
      topVariant="icon1"
      bottom={false}
    >
      {children}
    </Layout>
  );
}
