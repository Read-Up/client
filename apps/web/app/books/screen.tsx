"use client";

import { ScanSVG } from "@readup/icons";
import { Button, Divider, TextBox } from "@readup/ui/atoms";
import { useState, ChangeEvent, useCallback } from "react";
import { BookSearchResult } from "@readup/ui/organisms";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BookItem } from "@/_types/books/schema";
import type { BooksResponse } from "@/_types/books/schema";
import { BaseApi } from "@/_server/main/instance";
import { END_POINT } from "@/_constant/end-point";
import { useRouter } from "next/navigation";
import { PATH } from "@/_constant/routes";

export default function BookSearchScreen({ initialBooks }: { initialBooks: BookItem[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleAddBookClick = () => {
    // Navigate to the book addition page
    router.push(PATH.BOOKS.ADD);
  };

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const data = await BaseApi.get(END_POINT.BOOKS.DEFAULT).json<BooksResponse>();
      return data.data.content ?? [];
    },
    initialData: initialBooks,
    refetchOnWindowFocus: true,
  });

  const fuzzyFiltered = searchQuery.trim()
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          book.publisher.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : books;

  const submittedFiltered = submittedQuery.trim()
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(submittedQuery.trim().toLowerCase()) ||
          book.author.toLowerCase().includes(submittedQuery.trim().toLowerCase()) ||
          book.publisher.toLowerCase().includes(submittedQuery.trim().toLowerCase()),
      )
    : books;

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  }, []);

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        e.preventDefault();
        setSubmittedQuery(searchQuery.trim());
        setIsTyping(false);
      }
    },
    [searchQuery],
  );

  const handleButtonSearch = () => {
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
      setIsTyping(false);
    }
  };

  const showFuzzy = isTyping && searchQuery.trim();
  const showSubmitted = !isTyping && submittedQuery.trim();

  return (
    <main className="h-screen overflow-y-auto flex flex-col mx-4">
      <div className="flex mt-7 items-center justify-center gap-3.5">
        <TextBox
          placeholder="검색어를 입력해주세요."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
        />
        <button onClick={handleButtonSearch}>
          <ScanSVG size="xl" />
        </button>
      </div>

      <div className={`flex-1 flex ${!searchQuery && !submittedQuery ? "items-center justify-center" : "items-start"}`}>
        <div className="flex flex-col gap-3.5 items-center text-gray-60 w-full">
          {/* 초기 안내 */}
          {!searchQuery && !submittedQuery && (
            <div className="text-center">
              <p className="mb-2">원하는 책을 찾아드릴게요!</p>
              <p>간단한 키워드를 알려주세요.</p>
            </div>
          )}

          {/* 실시간 fuzzy 검색 결과 */}
          {showFuzzy && (
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="flex gap-2 items-center mt-4">
                <p className="text-title3 flex-1">찾는 책이 없으신가요?</p>
                <Button variant="filled" onClick={handleAddBookClick}>
                  책 추가
                </Button>
              </div>
              <Divider />
              {fuzzyFiltered.length === 0 && <div className="text-center">검색 결과가 없습니다.</div>}
              {fuzzyFiltered.map((book) => (
                <Link href={`/books/${book.bookId}`} key={book.bookId}>
                  <div className="p-2 cursor-pointer">{book.title}</div>
                </Link>
              ))}
            </div>
          )}

          {/* 검색 확정 결과 */}
          {showSubmitted && (
            <div className="flex flex-col gap-3.5 overflow-y-scroll w-full max-w-md">
              {isLoading && <p>로딩중...</p>}
              {error && <p className="text-red-500">{String(error)}</p>}
              {!isLoading && !error && submittedFiltered.length === 0 && <p>검색 결과가 없습니다.</p>}
              {!isLoading && !error && submittedFiltered.length > 0 && (
                <>
                  <div className="flex gap-2 items-center p-3">
                    <p className="text-title3 flex-1">찾는 책이 없으신가요?</p>
                    <Button variant="filled" onClick={handleAddBookClick}>
                      책 추가
                    </Button>
                  </div>
                  <Divider />
                  {submittedFiltered.map((book) => (
                    <BookSearchResult
                      key={book.bookId}
                      id={book.bookId}
                      title={book.title}
                      author={book.author}
                      publisher={book.publisher}
                      image={`https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${book.isbn}.jpg`}
                      bookmark={false}
                      href={`/books/${book.bookId}`}
                      linkComponent={Link}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
