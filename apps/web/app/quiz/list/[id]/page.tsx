import QuizListLayout from "@/quiz/_components/quiz-list-layout";
import QuizListScreen from "./screen";
import { notFound } from "next/navigation";
import { getBaseApi } from "@/_server/main/get-instance";
import { END_POINT } from "@/_constant/end-point";
import { BookDetail } from "@/_types/books/schema";

type PageParams = Promise<{ id: string }>;

export default async function QuizListPage({ params }: { params: PageParams }) {
  const { id } = await params;

  try {
    const res = await getBaseApi().get(END_POINT.BOOKS.DETAIL(id)).json<{ data: BookDetail }>();
    const book = res.data;
    console.log("Fetched book:", book);

    return (
      <QuizListLayout title="퀴즈 목록">
        <QuizListScreen book={book} />
      </QuizListLayout>
    );
  } catch {
    // 서버에서 에러가 발생했거나 book을 찾을 수 없을 경우
    return notFound();
  }
}
