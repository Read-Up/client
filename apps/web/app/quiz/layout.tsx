"use client";

import Layout from "@/_components/shared/shared-layout";
import { PATH } from "@/_constant/routes";
import { usePathname, useRouter } from "next/navigation";

type LayoutLabel = {
  title: string;
  top: boolean;
  bottom: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  topVariant?: "icon1" | "icon2" | "original" | "close" | undefined;
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * 각 경로에 대한 레이아웃 정보
   * @description 각 경로에 대한 레이아웃 정보를 정의합니다.
   * @type {Array{ match: (path: string) => boolean; info: LayoutLabel }}
   */
  const LAYOUT_INFOS: { match: (path: string) => boolean; info: LayoutLabel }[] = [
    // {
    //   match: (path) => path === PATH.BOOKS.ROOT,
    //   info: {
    //     title: "",
    //     top: false,
    //     bottom: true,
    //     onLeftClick: () => { },
    //   },
    // },
    // {
    //   match: (path) => path === PATH.BOOKS.ADD.ROOT,
    //   info: {
    //     title: "",
    //     top: true,
    //     bottom: false,
    //     onLeftClick: () => router.push(PATH.BOOKS.ROOT),
    //   },
    // },
    {
      match: (path) => path.startsWith(PATH.QUIZ.CHOICE.ROOT), // 동적 라우트 처리
      info: {
        title: "퀴즈 풀기",
        top: true,
        bottom: false,
        onLeftClick: () => router.push(`${PATH.BOOKS.ROOT}/${pathname.split("/").pop()}`), // 책 상세 페이지로 돌아가기
      },
    },
  ];

  const matchedLayout = LAYOUT_INFOS.find(({ match }) => match(pathname));
  const info = matchedLayout?.info;

  return info ? (
    <Layout
      top={info.top}
      pathname={PATH.QUIZ.ROOT}
      topbarProps={{
        text: info.title,
        onLeftClick: info.onLeftClick,
        onRightClick: info.onRightClick,
      }}
      topVariant={info.topVariant || "icon1"}
      bottom={info.bottom}
    >
      {children}
    </Layout>
  ) : (
    <>{children}</>
  );
}
