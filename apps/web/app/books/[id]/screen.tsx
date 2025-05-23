"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BaseApi } from "@/_server/main/instance";
import { BookItem } from "@/_types/books/schema";
import END_POINT from "@/_constant/end-point";
import Image from "next/image";

export default function BookDetailScreen() {
  const { id } = useParams<{ id: string }>();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery<BookItem | null>({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const res = await BaseApi.get(END_POINT.BOOK.DETAIL(id)).json<{ data: BookItem }>();
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div style={{ color: "#fff", padding: 32 }}>로딩중...</div>;
  }
  if (error) {
    return <div style={{ color: "#fff", padding: 32 }}>책 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!book) {
    return <div style={{ color: "#fff", padding: 32 }}>책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ background: "#0f1720", minHeight: "100vh", color: "#fff" }}>
      {/* 상단 바 */}
      <header
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #222",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 20 }}>책 정보</span>
      </header>
      {/* 표지 및 기본 정보 */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 24 }}>
        <Image
          src={`https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${book.isbn}.jpg`}
          alt="책 표지"
          width={181}
          height={275}
          style={{ borderRadius: 8, objectFit: "cover" }}
        />
        <h1 style={{ margin: "24px 0 8px 0", fontSize: 20, fontWeight: 600, textAlign: "center" }}>{book.title}</h1>
        <div style={{ fontSize: 12, color: "#95999d", marginBottom: 2 }}>
          저자명 <span style={{ color: "#fff" }}>{book.author}</span>
        </div>
        <div style={{ fontSize: 12, color: "#95999d", marginBottom: 2 }}>
          출판사 <span style={{ color: "#fff" }}>{book.publisher}</span>
        </div>
        <div style={{ fontSize: 12, color: "#95999d", marginBottom: 2 }}>
          ISBN <span style={{ color: "#fff" }}>{book.isbn}</span>
        </div>
      </section>
      {/* 하단 네비게이션 바 (샘플) */}
      <footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          background: "#1e2a38",
          height: 90,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#fff", textAlign: "center" }}>
          <div>📚</div>
          <div style={{ fontSize: 14 }}>내 서재</div>
        </div>
        <div style={{ color: "#fff", textAlign: "center" }}>
          <div>🏠</div>
          <div style={{ fontSize: 14 }}>홈</div>
        </div>
        <div style={{ color: "#fff", textAlign: "center" }}>
          <div>👤</div>
          <div style={{ fontSize: 14 }}>마이페이지</div>
        </div>
      </footer>
    </div>
  );
}
