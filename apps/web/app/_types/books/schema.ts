import { z } from "zod";

// --- 1) 각 책 항목 스키마 ---
export const BookItemSchema = z.object({
  bookId: z.number(),
  title: z.string(),
  author: z.string(),
  publisher: z.string(),
  isbn: z.string(),
  titleUrl: z.string().url().or(z.literal("")), // 빈 문자열도 허용
});
export type BookItem = z.infer<typeof BookItemSchema>;

// --- 2) 페이징 정보 스키마 ---
export const PageInfoSchema = z.object({
  size: z.number(),
  number: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});
export type PageInfo = z.infer<typeof PageInfoSchema>;

// --- 3) data.content + data.page 스키마 ---
export const BooksDataSchema = z.object({
  content: z.array(BookItemSchema),
  page: PageInfoSchema,
});
export type BooksData = z.infer<typeof BooksDataSchema>;

// --- 4) 최상위 응답 스키마 ---
export const BooksResponseSchema = z.object({
  success: z.boolean(),
  data: BooksDataSchema,
  message: z.string(),
});
export type BooksResponse = z.infer<typeof BooksResponseSchema>;
