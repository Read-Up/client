// src/app/actions/bookActions.ts
"use server";

import { BaseApi } from "@/_server/main/instance";
import { BooksResponse } from "@/_types/books/schema";

// src/app/actions/bookActions.ts
export async function fetchBooksServerAction() {
  const response = await BaseApi.get("public/books").json<BooksResponse>();
  return response; // Zod 검증은 선택적으로 추가 가능
}
