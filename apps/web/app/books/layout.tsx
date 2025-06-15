"use client";

import Layout from "@/_components/shared/layout";
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
   * @type {Record<string, LayoutLabel>}
   */
  const LAYOUT_INFOS: Record<string, LayoutLabel> = {
    [PATH.BOOKS.ROOT]: {
      title: "",
      top: false,
      bottom: true,
      onLeftClick: () => {},
    },
    [PATH.BOOKS.ADD.ROOT]: {
      title: "",
      top: true,
      bottom: false,
      onLeftClick: () => {
        router.push(PATH.BOOKS.ROOT);
      },
    },
    [PATH.BOOKS.ADD.COMPLETE]: {
      title: "",
      top: false,
      bottom: false,
      onLeftClick: () => {},
    },
    [PATH.BOOKS.ADD.CHAPTER]: {
      title: "",
      top: true,
      bottom: false,
      topVariant: "close",
      onRightClick: () => {
        router.push(PATH.BOOKS.ROOT);
      },
    },
  };

  const info = LAYOUT_INFOS[pathname] ?? LAYOUT_INFOS[PATH.BOOKS.ROOT];

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
