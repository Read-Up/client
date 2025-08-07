import { END_POINT } from "@/_constant/end-point";
import { getClientApi } from "@/_server/main/get-instance";
import { BookDetail, BookItem, BooksResponse } from "@/_types/books/schema";
import { KyInstance } from "ky";

class API {
  API: KyInstance = getClientApi();

  constructor(ky?: KyInstance) {
    if (ky) {
      this.API = ky;
    } else {
      this.API = getClientApi();
    }
  }

  async getBookList(): Promise<BookItem[]> {
    try {
      const response = await this.API.get(END_POINT.BOOKS.DEFAULT, {
        method: "GET",
      });
      const data = await response.json<BooksResponse>();
      return data.data.content ?? [];
    } catch {
      console.error("Failed to fetch book list");
      return [];
    }
  }

  async getBookDetail(id: string | number): Promise<BookDetail | null> {
    try {
      const response = await this.API.get(END_POINT.BOOKS.DETAIL(id), {
        method: "GET",
      });
      const data = await response.json<{ data: BookDetail }>();
      return data.data;
    } catch {
      console.error(`Failed to fetch book detail for ID: ${id}`);
      return null;
    }
  }
}

export const BookAPI = new API(getClientApi());
