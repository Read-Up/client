"use client";

import { useEffect, useState } from "react";
import Layout from "./_components/shared/shared-layout";
import { UserCircleSVG } from "@readup/icons";
import { useRouter } from "next/navigation";
import { END_POINT } from "./_constant/end-point";
import { PATH } from "./_constant/routes";
import { getClientApi } from "./_server/main/get-instance";

export default function HomeScreen() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getClientApi()
          .get(END_POINT.USERS.DEFAULT, {
            credentials: "include",
          })
          .json();
        console.log("User data:", response);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getUser();
  }, []);

  const renderTopbarRightButton = () => {
    if (user) {
      return (
        <div className="flex flex-row items-center gap-2">
          <p className="typo-body1 text-white">{user.nickname}</p>
          <UserCircleSVG className="w-6 h-6 text-white" />
        </div>
      );
    } else {
      const handleLoginClick = () => {
        router.push(PATH.LOGIN.ROOT);
      };
      return (
        <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleLoginClick}>
          <p className="typo-body1 text-white">로그인 / 회원가입</p>
          <UserCircleSVG className="w-6 h-6 text-white" />
        </div>
      );
    }
  };

  return (
    // NOTE: 이후 PageLayout을 변경할 수 있기 때문에 HomeLayout에서 PageLayout을 사용하지 않고
    // screen.tsx에 PageLayout을 사용하도록 하였습니다.
    <Layout
      pathname="/"
      topbarProps={{
        text: "",
        variant: "icon2",
        leftSVG: <p className="typo-title1 text-white">리드업</p>,
        rightSVG: renderTopbarRightButton(),
      }}
    >
      <section className="flex flex-col w-full h-[calc(100vh-140px)] p-4 gap-4 bg-background overflow-y-auto">
        <p className="typo-title1 text-white">환영합니다!</p>
        <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push(PATH.BOOKS.ROOT)}
        >
          책 목록 보기
        </button>
        <div className="flex flex-col gap-4 w-full">
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
          <p className="typo-title1 text-white">환영합니다!</p>
          <p className="typo-body1 text-gray-60">리드업에서 독서의 즐거움을 느껴보세요.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(PATH.BOOKS.ROOT)}
          >
            책 목록 보기
          </button>
        </div>
      </section>
    </Layout>
  );
}
