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

export default function BookSearchLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * 각 경로에 대한 레이아웃 정보
   * @description 각 경로에 대한 레이아웃 정보를 정의합니다.
   * @type {Array<{ match: (path: string) => boolean; info: LayoutLabel }>}
   */
  const LAYOUT_INFOS: { match: (path: string) => boolean; info: LayoutLabel }[] = [
    {
      match: (path) => path === PATH.BOOKS.ROOT,
      info: {
        title: "",
        top: false,
        bottom: true,
        onLeftClick: () => {},
      },
    },
    {
      match: (path) => path === PATH.BOOKS.ADD.ROOT,
      info: {
        title: "",
        top: true,
        bottom: false,
        onLeftClick: () => router.push(PATH.BOOKS.ROOT),
      },
    },
    {
      match: (path) => path === PATH.BOOKS.ADD.COMPLETE,
      info: {
        title: "",
        top: false,
        bottom: false,
        onLeftClick: () => {},
      },
    },
    {
      match: (path) => path === PATH.BOOKS.ADD.CHAPTER,
      info: {
        title: "",
        top: true,
        bottom: false,
        topVariant: "close",
        onRightClick: () => router.push(PATH.BOOKS.ROOT),
      },
    },
    {
      match: (path) => path.startsWith("/books/"), // 동적 라우트 처리
      info: {
        title: "책 정보",
        top: true,
        bottom: true,
        onLeftClick: () => router.push(PATH.BOOKS.ROOT),
      },
    },
  ];

  const matchedLayout = LAYOUT_INFOS.find(({ match }) => match(pathname));
  const info = matchedLayout?.info;

  return (
    info && (
      <Layout
        top={info.top}
        pathname={PATH.BOOKS.ROOT}
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
    )
  );
}
