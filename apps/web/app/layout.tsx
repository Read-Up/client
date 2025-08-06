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
      <body className={`bg-background/95 ${Pretendard.className} overflow-y-scroll`}>
        <main className="max-w-[768px] mx-auto bg-background shadow-xl">
          <QueryProvider>
            <MSWProvider>{children}</MSWProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
