import QuizCreateSaveScreen from "./screen";
import { notFound } from "next/navigation";

export default function QuizCreateSavePage() {
  try {
    return <QuizCreateSaveScreen />;
  } catch {
    return notFound();
  }
}
