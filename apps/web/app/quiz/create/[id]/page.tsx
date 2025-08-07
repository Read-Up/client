import { notFound } from "next/navigation";
import { getBaseApi } from "@/_server/main/get-instance";
import { END_POINT } from "@/_constant/end-point";
import { BookDetail } from "@/_types/books/schema";
import QuizCreateScreen from "./screen";

type PageParams = Promise<{ id: string }>;

export default async function QuizCreatePage({ params }: { params: PageParams }) {
  const { id } = await params;

  try {
    const res = await getBaseApi().get(END_POINT.BOOKS.DETAIL(id)).json<{ data: BookDetail }>();
    const book = res.data;
    console.log("Fetched book:", book);

    return <QuizCreateScreen book={book} />;
  } catch {
    // 서버에서 에러가 발생했거나 book을 찾을 수 없을 경우
    return notFound();
  }
}
