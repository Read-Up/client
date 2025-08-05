import type { Metadata } from "next";

import "./globals.css";

import { Head } from "@/_components/shared/head";
import { QueryProvider } from "@/_lib";
import { Pretendard } from "@readup/font";
import { MSWProvider } from "./_components/shared/msw-provider";

export const metadata: Metadata = {
  title: "Read-Up",
  description: "추후 작성 예정",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head />
      <body
        className={`bg-background ${Pretendard.className} overflow-y-scroll max-w-[768px] mx-auto bg-background/95`}
      >
        <QueryProvider>
          <MSWProvider>{children}</MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
