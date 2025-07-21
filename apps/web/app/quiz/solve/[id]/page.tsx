import { notFound } from "next/navigation";
import QuizSolveScreen from "./screen";

type PageParams = Promise<{ id: string }>;

export default async function QuizSolvePage({ params }: { params: PageParams }) {
  const { id } = await params;
  // const lastQuizId = "0"; // 추후 lastQuizId를 받아올 수 있도록 수정 필요

  try {
    return <QuizSolveScreen quizSetId={id} />;
  } catch {
    // 서버에서 에러가 발생했거나 book을 찾을 수 없을 경우
    return notFound();
  }
}
