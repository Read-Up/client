"use client";

import { BookDetail } from "@/_types/books/schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@readup/ui/atoms/select";
import { useEffect, useState } from "react";
import CreateQuizTemplate from "./_components/create-quiz-template";
import { Button } from "@readup/ui/atoms";
import CreateQuizLayout from "@/quiz/_components/create-quiz-layout";
import { Modal } from "@readup/ui/molecules";
import { Toast } from "@readup/ui/atoms/toast";
import { useQuestionStore } from "@/quiz/_store/useQuestionStore";
import { useRouter } from "next/navigation";
import { PATH } from "@/_constant/routes";

interface QuizCreateScreenProps {
  book: BookDetail;
}

export default function QuizCreateScreen({ book }: QuizCreateScreenProps) {
  const router = useRouter();
  const { questions, chapterId, setBook, setChapterId, addQuestion, removeQuestion, reset, validate } =
    useQuestionStore();
  const [isWarningVisible, setIsWarningVisible] = useState<string | null>(null);
  const [noQuestions, setNoQuestions] = useState<boolean>(false);

  const handleChangeChapter = (chapterId: string) => {
    // questions가 비어있지 않으면 경고 메시지 표시
    if (questions.length > 0) {
      console.warn("챕터를 변경할 수 없습니다. 작성 중인 퀴즈가 있습니다.");
      setIsWarningVisible(chapterId);
      return;
    }
    setChapterId(chapterId);
  };

  const handleDismissToast = () => {
    setNoQuestions(false);
  };

  const handleConfirmChangeChapter = () => {
    reset(); // 현재 작성 중인 퀴즈를 초기화
    setChapterId(isWarningVisible || "");
    setIsWarningVisible(null);
  };

  const handleSaveQuiz = () => {
    if (questions.length === 0) {
      setNoQuestions(true);
      return;
    }

    const isValid = validate();

    if (!isValid) {
      return;
    }

    // 검증 통과 후 저장 로직 실행
    console.log("퀴즈 저장", questions);
    router.push(PATH.QUIZ.CREATE.SAVE);
  };

  // 최초 렌더 시 0번째 챕터 선택
  useEffect(() => {
    if (book.chapterList.length > 0 && book.chapterList[0]) {
      setChapterId(book.chapterList[0].chapterId.toString());
      setBook(book);
    }
  }, [book, setChapterId, setBook]);

  return (
    <CreateQuizLayout title="퀴즈 작성하기" onRightClick={handleSaveQuiz}>
      <section className="flex flex-col w-full h-[calc(100vh-50px)] text-white p-4 gap-4">
        {/* 챕터 선택 드롭다운 */}
        <Select value={chapterId} onValueChange={handleChangeChapter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="챕터를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {book.chapterList.map((chapter) => (
                <SelectItem key={chapter.chapterId} value={chapter.chapterId.toString()}>
                  {chapter.chapterName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* 선택된 챕터에 대한 퀴즈 생성 UI */}
        <section className="flex flex-col gap-4 w-full grow overflow-y-auto">
          {questions.map((q, index) => (
            <CreateQuizTemplate
              key={index}
              index={index + 1}
              question={q}
              removeQuestion={() => removeQuestion(q.id)}
            />
          ))}
        </section>
        <Button variant="outline" onClick={addQuestion}>
          퀴즈 추가하기
        </Button>
      </section>

      {/* 경고 메시지 */}
      <Modal
        open={isWarningVisible !== null}
        onClose={() => setIsWarningVisible(null)}
        title="경고"
        subtext="작성 중인 퀴즈가 있습니다. 챕터를 변경하면 현재 작성 중인 퀴즈가 사라집니다."
        cancelText="취소"
        confirmText="변경"
        onConfirm={() => handleConfirmChangeChapter()}
      />

      {/* Toast */}
      <Toast
        text="퀴즈를 작성해주세요."
        textColor="error"
        timeout={3000}
        onDismiss={handleDismissToast}
        isOpen={noQuestions}
      />
    </CreateQuizLayout>
  );
}
