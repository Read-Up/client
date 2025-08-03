"use client";

import Layout from "@/_components/shared/shared-layout";
import { PATH } from "@/_constant/routes";

export default function SolveQuizLayout({
  children,
  title,
  onRightClickAction,
}: {
  children: React.ReactNode;
  title: string;
  onRightClickAction: () => void;
}) {
  return (
    <Layout
      top={true}
      pathname={PATH.QUIZ.ROOT}
      topbarProps={{
        text: title,
        onRightClick: onRightClickAction,
      }}
      topVariant="close"
      bottom={false}
    >
      {children}
    </Layout>
  );
}
