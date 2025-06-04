"use client";

import { BookDetail, BookDetailResponse, BooksResponse } from "@/_types/books/schema";
import { ISBNFormValues } from "@/_types/books/types";
import { Button, TextBox } from "@readup/ui/atoms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookFindDrawer from "./_components/find-drawer";
import BookSearchLoadingSkeleton from "./_components/search-loading-skeleton";
import { BaseApi } from "@/_client/main";
import { END_POINT } from "@/_constant/end-point";
import { BookSearchResult } from "@readup/ui/organisms";
import { Toast } from "@readup/ui/atoms/toast";
import BookAddRequestDrawer from "./_components/request-drawer";
import BookAddNotIncludeChapterModal from "./_components/add-not-include-chapter-modal";

export default function BookAddScreen() {
  const { register, handleSubmit, watch } = useForm<ISBNFormValues>();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestDrawerOpen, setRequestDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  /**
   * useQuery 훅을 사용하여 책 상세 정보를 가져옵니다.
   * searchQuery가 설정되면 해당 ISBN으로 책 정보를 조회합니다.
   * 로딩 중에는 로딩 스켈레톤을 표시하고, 에러가 발생하면 에러 메시지를 표시합니다.
   * 성공적으로 데이터를 가져오면 책 상세 정보를 표시합니다.
   */
  const {
    data: bookData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<BookDetail>({
    queryKey: ["book", searchQuery],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 딜레이 추가 (로딩 효과를 위해)

      // searchQuery를 Number로 변환하여 API 호출
      if (!searchQuery || isNaN(Number(searchQuery))) {
        throw new Error("Invalid ISBN format");
      }
      // API 호출
      const data = await BaseApi.get(
        END_POINT.BOOKS.DEFAULT_ISBN(searchQuery ? Number(searchQuery) : 0),
      ).json<BooksResponse>();
      console.log("Fetched books:", data.data);
      if (!data.data || data.data.content.length === 0) {
        throw new Error("No book found for the given ISBN");
      }

      const bookId = data.data.content[0]?.bookId;
      if (!bookId) {
        throw new Error("No book found for the given ISBN");
      }

      const bookDetailData = await BaseApi.get(END_POINT.BOOKS.DETAIL(bookId)).json<BookDetailResponse>();
      console.log("Fetched book detail:", bookDetailData.data);
      if (!bookDetailData.data) {
        throw new Error("No book detail found for the given book ID");
      }
      return bookDetailData.data;
    },
    enabled: !!searchQuery, // searchQuery가 설정될 때만 실행
    retry: false,
  });

  const isbnValue = watch("isbn");

  /**
   * 토글 함수: Drawer의 열림/닫힘 상태를 토글합니다.
   * @returns {void}
   */
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * Drawer를 닫는 함수: Drawer의 열림 상태를 false로 설정합니다.
   * @returns {void}
   */
  const closeDrawer = () => {
    setIsOpen(false);
  };

  /**
   * 요청 Drawer를 여는 함수: 요청 Drawer의 열림 상태를 true로 설정합니다.
   * @returns {void}
   */
  const openRequestDrawer = () => {
    setRequestDrawerOpen(true);
  };

  /**
   * 요청 Drawer를 닫는 함수: 요청 Drawer의 열림 상태를 false로 설정하고, /books로 이동합니다.
   * @returns {void}
   */
  const closeRequestDrawer = () => {
    setRequestDrawerOpen(false);
    // /books로 이동
    window.location.href = "/books";
  };

  /**
   * 모달을 닫는 함수: 모달의 열림 상태를 false로 설정합니다.
   * @returns {void}
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * 폼 제출 함수: ISBN 값을 검색 쿼리로 설정합니다.
   * @param {ISBNFormValues} data - 폼에서 입력된 ISBN 값
   * @returns {void}
   */
  const onSubmit = (data: ISBNFormValues) => {
    setSearchQuery(data.isbn); // 검색 트리거
  };

  /**
   * 키보드 이벤트 핸들러: Enter 키 입력 시 폼을 제출합니다.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - 키보드 이벤트 객체
   * @returns {void}
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    },
    [handleSubmit],
  );

  /**
   * 책 추가 함수: ISBN과 챕터 여부에 따라 모달을 띄우거나 책 추가 완료 페이지로 이동합니다.
   * @param {string | number} isbn - 책의 ISBN
   * @param {boolean} isChapter - 책이 챕터를 포함하는지 여부
   * @returns {void}
   */
  const handleAddBook = (isbn: string | number, isChapter: boolean) => {
    if (!isChapter) {
      // 모달 창을 띄워서 목차 입력 여부를 묻는 로직 추가
      console.log("책 추가 요청:", isbn);
      setModalOpen(true);
    } else {
      // /book/add/complete?isbn={isbn}으로 이동
      window.location.href = `/books/add/complete?isbn=${isbn}`;
    }
  };

  // ISBN을 모두 지웠을 때 상태 초기화
  useEffect(() => {
    if (isbnValue === "") {
      queryClient.removeQueries({ queryKey: ["book"] });
      setSearchQuery(null); // 상태도 같이 초기화
    }
  }, [isbnValue, queryClient]);

  return (
    <Fragment>
      <div className="flex flex-col gap-4 w-full px-4 text-white">
        {!isLoading && (
          <Fragment>
            <div className="flex flex-row items-center justify-between">
              <p className="typo-title2">책 추가하기</p>
              <Button variant="text_only" textOption="connected" className="p-0" onClick={toggleDrawer}>
                ISBN 찾는방법
              </Button>
            </div>
            <TextBox
              variant="searchbox"
              placeholder="ISBN을 입력해주세요"
              {...register("isbn", {
                required: "ISBN을 입력해주세요.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "숫자만 입력해주세요.",
                },
              })}
              onKeyDown={handleKeyDown}
              onButtonClick={handleSubmit(onSubmit)}
            />
            {!isSuccess && !isError && (
              <p className="typo-footnote text-primary" onClick={toggleDrawer}>
                ‘-’ 없이 숫자만 입력해주세요.
              </p>
            )}
          </Fragment>
        )}

        {/* 결과 영역 */}

        {/* 로딩 스켈레톤 컴포넌트 */}
        <BookSearchLoadingSkeleton isLoading={isLoading} />

        {isSuccess && bookData && (
          <div className=" w-full relative">
            <div className="flex flex-col gap-4 w-full pb-30 text-white">
              <p className="typo-footnote">이 책을 찾으시나요?</p>
              <BookSearchResult
                id={bookData.bookId}
                image={`https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${bookData.isbn}.jpg`}
                title={bookData.title}
                author={bookData.author}
                publisher={bookData.publisher}
                isbn={bookData.isbn}
                href={`/books/${bookData.bookId}`}
                showBookmark={false} // 북마크 기능은 현재 사용하지 않음
              />
              <p className="typo-title3">목차</p>
              {bookData.chapterList.length === 0 ? (
                <div className="typo-body text-gray-90 bg-surface w-full h-[200px] p-4 rounded-lg flex flex-col gap-1 justify-center text-center">
                  <p>목차 정보가 제공되지 않는 책이에요.</p>
                  <p>목차를 직접 입력하도록 할까요?</p>
                  <p className="underline cursor-pointer mt-5" onClick={() => {}}>
                    목차 직접 입력하기
                  </p>
                </div>
              ) : (
                <TextBox
                  variant="questionbox"
                  className="w-full h-[200px] overflow-y-auto typo-body text-gray-90"
                  value={bookData.chapterList
                    .map((chapter) => `CHAPTER ${chapter.chapterOrder} ${chapter.chapterName} 페이지 추후반영`)
                    .join("\n")}
                  readOnly
                  isBorder={false}
                  isButton={false}
                />
              )}
            </div>

            {/* 하단 고정 영역 */}
            <Button
              variant="filled"
              className="fixed bottom-10 left-4 right-4"
              onClick={() => handleAddBook(bookData.isbn, bookData.chapterList.length > 0)}
            >
              추가하기
            </Button>
            <div className="fixed bottom-0 left-0 right-0 h-10 bg-background flex items-center justify-center" />
          </div>
        )}
        {isError && (
          <>
            <p className="typo-title3 text-center text-white fixed top-1/3 left-0 right-0">
              아쉽지만, 검색하신 책 정보가 없어요.
            </p>
            {/* 하단 고정 영역 */}
            <Toast
              isOpen={true}
              className="text-secondary bottom-25 whitespace-nowrap"
              text="대신에, 저희에게 요청해주세요!"
            />
            <Button variant="filled" className="fixed bottom-10 left-4 right-4" onClick={openRequestDrawer}>
              요청하기
            </Button>
            <div className="fixed bottom-0 left-0 right-0 h-10 bg-background flex items-center justify-center" />
          </>
        )}
      </div>

      {/* Drawer 컴포넌트 */}
      <BookFindDrawer isOpen={isOpen} onCloseAction={closeDrawer} />
      <BookAddRequestDrawer isOpen={requestDrawerOpen} onCloseAction={closeRequestDrawer} />

      {/* 모달 컴포넌트 */}
      <BookAddNotIncludeChapterModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={() => handleAddBook(isbnValue, false)}
      />
    </Fragment>
  );
}
