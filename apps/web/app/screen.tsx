"use client";

import Layout from "./_components/shared/layout";
import initMocks from "./_mocks";
import { useEffect } from "react";
export default function HomeScreen() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      initMocks();
    }
  }, []);

  return (
    // NOTE: 이후 PageLayout을 변경할 수 있기 때문에 HomeLayout에서 PageLayout을 사용하지 않고
    // screen.tsx에 PageLayout을 사용하도록 하였습니다.
    <Layout
      pathname="/"
      topbarProps={{
        text: "홈",
      }}
    >
      <h1 className="text-4xl font-bold text-white w-full">Home</h1>
    </Layout>
  );
}
