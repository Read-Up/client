import type { Metadata } from "next";

import "./globals.css";

import { Head } from "@/_components/shared/head";
import { QueryProvider } from "@/_lib";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head />
      <body className="bg-background">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
