import type { Metadata } from "next";

import { Head } from "@/_components/shared/head";
import "./globals.css";

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
      <body >
        {children}
      </body>
    </html>
  );
}
