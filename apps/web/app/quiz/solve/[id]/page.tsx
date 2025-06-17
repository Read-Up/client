// export const runtime = "nodejs";

import { notFound } from "next/navigation";
import QuizSolveScreen from "./screen";
import { END_POINT } from "@/_constant/end-point";
import { BookDetail } from "@/_types/books/schema";
import { getBaseApi } from "@/_server/main/get-instance";

interface Props {
  params: { id: string };
}

export default async function QuizSolvePage({ params }: Props) {
  const { id } = params;

  try {
    const res = await getBaseApi().get(END_POINT.BOOKS.DETAIL(id)).json<{ data: BookDetail }>();
    const book = res.data;
    console.log("Fetched book:", book);

    return <QuizSolveScreen book={book} />;
  } catch {
    // 서버에서 에러가 발생했거나 book을 찾을 수 없을 경우
    return notFound();
  }
}
