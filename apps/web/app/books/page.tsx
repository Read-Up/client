import { BooksResponse, BooksResponseSchema } from "@/_types/books/schema";
import BookSearchScreen from "./screen";
import { BaseApi } from "@/_server/main/instance";
import { END_POINT } from "@/_constant/end-point";

export default async function BookSearchPage() {
  const data = await BaseApi.get(END_POINT.BOOK.DEFAULT).json<BooksResponse>();
  const books = BooksResponseSchema.parse(data).data.content;

  return <BookSearchScreen initialBooks={books} />;
}
