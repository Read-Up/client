import { BooksResponse, BooksResponseSchema } from "@/_types/books/schema";
import BookSearchScreen from "./screen";
import { BaseApi } from "@/_server/main/instance";
import { END_POINT } from "@/_constant/end-point";
import { Suspense } from "react";

export default async function BookSearchPage() {
  const data = await BaseApi.get(END_POINT.BOOKS.DEFAULT).json<BooksResponse>();
  const books = BooksResponseSchema.parse(data).data.content;

  return (
    <Suspense fallback={<div className="text-white flex items-center justify-center h-screen">Loading...</div>}>
      <BookSearchScreen initialBooks={books} />
    </Suspense>
  );
}
