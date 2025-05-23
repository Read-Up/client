// src/stores/bookStore.ts
import { create } from "zustand";
import { BookItem, BooksResponseSchema, PageInfo } from "@/_types/books/schema";
import { BaseApi } from "@/_server/main/instance";

interface BookState {
  // --- 상태 ---
  books: BookItem[]; // 전체 책 목록
  pageInfo: PageInfo | null; // 페이징 정보
  searchQuery: string; // 검색어
  loading: boolean; // 데이터 로딩 중 여부
  error: string | null; // 에러 메시지

  // --- 액션 ---
  fetchBooks: (page?: number) => Promise<void>; // 책 목록 불러오기
  setSearchQuery: (q: string) => void; // 검색어 설정
  setBooks: (books: BookItem[]) => void; // 책 목록 설정
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  pageInfo: null,
  searchQuery: "",
  loading: false,
  error: null,
  setBooks: (books: BookItem[]) => {
    set({ books });
  },

  // 책 목록을 서버에서 가져와 상태에 저장
  fetchBooks: async (page = 0) => {
    set({ loading: true, error: null });
    try {
      const raw = await BaseApi.get("api/public/books", { searchParams: { page } }).json();
      // 런타임 검증
      const parsed = BooksResponseSchema.parse(raw);
      set({
        books: parsed.data.content,
        pageInfo: parsed.data.page,
        loading: false,
      });
    } catch (err: unknown) {
      console.error(err);
      set({
        error: err instanceof Error ? err.message : String(err),
        loading: false,
      });
    }
  },

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
  },
}));

interface BookUIState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useBookUIStore = create<BookUIState>((set) => ({
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
