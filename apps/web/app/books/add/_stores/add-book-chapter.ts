import { BookChapter, BookDetail } from "@/_types/books/schema";
import { create } from "zustand";

interface AddBookChapter extends BookChapter {
  error: boolean;
}

interface AddBookChapterState {
  // State
  bookChapter: AddBookChapter[];
  nextChapterId: number;
  isbn: string | null;

  // Actions
  // Methods to manage book chapters
  setBookChapter: (chapters: BookDetail) => void;
  resetBookChapter: () => void;
  addBookChapter: () => void;
  editBookChapter: (chapterId: number, chapterName: string) => void;
  deleteBookChapter: (chapterId: number) => void;
  reorderBookChapters: (chapters: AddBookChapter[]) => void;
  validateChapters: () => void;

  // Methods to manage ISBN
  setIsbn: (isbn: string | null) => void;
}

export const useAddBookChapterStore = create<AddBookChapterState>((set) => ({
  bookChapter: [],
  nextChapterId: 1,
  isbn: null,

  setBookChapter: (bookDetail: BookDetail) => {
    const chapters = bookDetail.chapterList || [];
    const initialChapter: AddBookChapter[] = chapters.map((chapter) => ({
      ...chapter,
      error: false,
    }));
    const maxId = Math.max(0, ...chapters.map((c) => c.chapterId));
    set({ bookChapter: initialChapter, nextChapterId: maxId + 1 });
  },

  resetBookChapter: () =>
    set({
      bookChapter: [{ chapterId: 0, chapterOrder: 1, chapterName: "", error: false }],
      nextChapterId: 1,
    }),

  addBookChapter: () =>
    set((state) => {
      const newChapter = {
        chapterId: state.nextChapterId,
        chapterOrder: state.bookChapter.length + 1,
        chapterName: "",
        error: false,
      };
      return {
        bookChapter: [...state.bookChapter, newChapter],
        nextChapterId: state.nextChapterId + 1,
      };
    }),

  editBookChapter: (chapterId, chapterName) =>
    set((state) => ({
      bookChapter: state.bookChapter.map((chapter) =>
        chapter.chapterId === chapterId ? { ...chapter, chapterName, error: false } : chapter,
      ),
    })),

  deleteBookChapter: (chapterId) =>
    set((state) => {
      const filtered = state.bookChapter.filter((c) => c.chapterId !== chapterId);
      const reordered = filtered.map((chapter, i) => ({
        ...chapter,
        chapterOrder: i + 1,
      }));
      return { bookChapter: reordered };
    }),

  reorderBookChapters: (chapters) =>
    set(() => ({
      bookChapter: chapters.map((c, i) => ({
        ...c,
        chapterOrder: i + 1,
      })),
    })),

  validateChapters: () =>
    set((state) => {
      const updatedChapters = state.bookChapter.map((chapter) => ({
        ...chapter,
        error: chapter.chapterName.trim() === "",
      }));
      return { bookChapter: updatedChapters };
    }),

  setIsbn: (isbn) =>
    set(() => ({
      isbn: isbn ? String(isbn) : null,
    })),
}));
