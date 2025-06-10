"use client";

import { BangSVG } from "@readup/icons";
import { useAddBookChapterStore } from "../_stores/add-book-chapter";
import { Button } from "@readup/ui/atoms";
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useForm } from "react-hook-form";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import AddChapterItem from "../_components/add-chapter-item";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@/_constant/routes";

export default function BookAddChapterScreen() {
  const router = useRouter();
  const {
    bookChapter,
    isbn,
    addBookChapter,
    reorderBookChapters,
    editBookChapter,
    validateChapters,
    deleteBookChapter,
  } = useAddBookChapterStore();
  const { control } = useForm();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 500, tolerance: 5 } }));
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = bookChapter.findIndex((c) => c.chapterId === active.id);
      const newIndex = bookChapter.findIndex((c) => c.chapterId === over?.id);
      const newChapters = arrayMove(bookChapter, oldIndex, newIndex);
      reorderBookChapters(newChapters);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleAddBookChapter = () => {
    addBookChapter();
    setTimeout(handleScroll, 100);
  };

  const handleComplete = () => {
    console.log("입력 완료", bookChapter);
    validateChapters();
    const hasError = bookChapter.some((chapter) => chapter.error);
    if (!hasError) {
      router.push(`${PATH.BOOKS.ADD.ROOT}`);
    }
  };

  const handleOnClear = (chapterId: number) => {
    const chapterIndex = bookChapter.findIndex((c) => c.chapterId === chapterId);
    if (chapterIndex === -1) {
      return;
    }
    const prevChapter = bookChapter[chapterIndex - 1];

    if (bookChapter.length > 1) {
      deleteBookChapter(chapterId);
      if (prevChapter) {
        inputRefs.current[prevChapter.chapterId]?.focus();
      }
    }
  };

  useEffect(() => {
    if (!isbn) {
      console.warn("ISBN이 설정되지 않았습니다. 책 정보를 불러올 수 없습니다. 향후 /books로 이동할 예정입니다.");
      return;
    }
  }, [isbn]);

  return (
    <form className="flex flex-col w-full h-[calc(100vh-150px)] gap-2 text-on-primary px-4 relative">
      {/* 상단 고정 영역 */}
      <div className="flex-none pt-4 pb-2">
        <h2 className="typo-title2">목차 입력하기</h2>
        <div className="flex flex-row items-center">
          <BangSVG size="md" fill="#7A7F85" />
          <p className="typo-footnote text-gray-50">숫자를 드래그하여 순서를 변경할 수 있어요</p>
        </div>
      </div>

      {/* 목차 입력 영역 */}
      <div className="flex-1 overflow-y-auto mt-4 flex flex-col gap-3 items-center" ref={scrollRef}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={bookChapter.map((c) => c.chapterId)} strategy={verticalListSortingStrategy}>
            {bookChapter.map((chapter, index) => (
              <AddChapterItem
                key={chapter.chapterId}
                chapterId={chapter.chapterId}
                index={index + 1}
                control={control}
                defaultValue={chapter.chapterName}
                onChange={(value) => editBookChapter(chapter.chapterId, value)}
                variant={chapter.error ? "error_chapterbox" : "chapterbox"}
                onClear={() => handleOnClear(chapter.chapterId)}
                inputRef={(el) => (inputRefs.current[chapter.chapterId] = el)}
              />
            ))}
            <div
              className="w-6 h-6 bg-primary rounded-full text-2xl leading-none text-white flex items-center justify-center cursor-pointer"
              onClick={handleAddBookChapter}
            >
              +
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* 하단 고정 영역 */}
      <div className="flex-none">
        <Button
          type="button"
          variant="filled"
          className="fixed bottom-10 left-4 right-4"
          onClick={handleComplete}
          disabled={bookChapter.filter((chapter) => chapter.error).length > 0}
        >
          입력완료
        </Button>
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-background flex items-center justify-center" />
      </div>
    </form>
  );
}
