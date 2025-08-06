"use client";

import { CloseSVG } from "@readup/icons";
import { Button, TextBox } from "@readup/ui/atoms";
import { Drawer, Topbar } from "@readup/ui/molecules";
import { useEffect, useState } from "react";
import BookFindDrawer from "./find-drawer";
import { BookAddRequestFormValues } from "@/_types/books/types";
import { useForm } from "react-hook-form";

interface BookAddRequestDrawerProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function BookAddRequestDrawer({ isOpen, onCloseAction }: BookAddRequestDrawerProps) {
  const [isbnDrawerOpen, setIsbnDrawerOpen] = useState(false);
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookAddRequestFormValues>();

  const closeDrawer = () => {
    setIsbnDrawerOpen(false);
  };

  const onSubmit = (data: BookAddRequestFormValues) => {
    console.log("요청 데이터:", data);
    // 실제 API 호출 로직을 여기에 추가
    setStep(2);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter 키 입력 시 폼 제출 방지
    }
  };

  useEffect(() => {
    // Drawer가 열릴 때, 닉네임을 자동으로 입력하는 로직 api 호출
    const fetchNickname = async () => {
      return "사용자 닉네임"; // 실제 API 호출로 변경 필요
    };
    fetchNickname()
      .then((nickname) => {
        // 닉네임을 자동으로 입력
        if (nickname) {
          setValue("nickname", nickname);
        }
      })
      .catch((error) => {
        console.error("닉네임을 가져오는 중 오류 발생:", error);
      });
  }, [setValue]);

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        onCloseAction(); // 2초 후 Drawer 닫기
      }, 2000);
    }
  }, [step, onCloseAction]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => {}}
      direction="top"
      size="h-full"
      overlayOpacity="bg-black/30"
      className="bg-background gap-2 text-white h-screen pt-0 pb-10"
    >
      {step === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 relative h-screen">
          <Topbar
            rightSVG={<CloseSVG tabIndex={-1} />}
            onRightClick={onCloseAction}
            className="bg-background w-full px-0"
            variant="close"
          />
          <p className="typo-title2">책 추가하기</p>
          <p className="typo-title3 mt-5">닉네임</p>
          <TextBox
            variant="textbox"
            className="w-full h-[40px] typo-body text-gray-90"
            placeholder="사용자의 닉네임이 자동으로 입력됩니다."
            disabled
            {...register("nickname", { required: true })}
          />
          <div className="h-5" />
          <p className="typo-title3">이메일</p>
          <TextBox
            variant="textbox"
            className="w-full h-[40px] typo-body text-gray-90"
            placeholder="이메일 주소를 입력해주세요."
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            })}
            onKeyDown={handleKeyDown}
            onClear={() => setValue("email", "")}
          />
          {errors.email ? <p className="h-5 typo-body text-error">{errors.email.message}</p> : <div className="h-5" />}
          <p className="typo-title3">책 제목</p>
          <TextBox
            variant="textbox"
            className="w-full h-[40px] typo-body text-gray-90"
            placeholder="책 제목을 입력해주세요."
            {...register("title", { required: true })}
            onKeyDown={handleKeyDown}
            onClear={() => setValue("title", "")}
          />
          {errors.title ? <p className="h-5 typo-body text-error">책 제목을 입력해주세요.</p> : <div className="h-5" />}
          <div className="flex flex-row items-center justify-between">
            <p className="typo-title3">ISBN</p>
            <p className="typo-body underline" onClick={() => setIsbnDrawerOpen(true)}>
              ISBN 찾는 방법
            </p>
          </div>
          <TextBox
            variant="textbox"
            className="w-full h-[40px] typo-body text-gray-90"
            placeholder="ISBN을 입력해주세요."
            {...register("isbn", {
              required: true,
              pattern: {
                value: /^[0-9]+$/,
                message: "숫자만 입력해주세요.",
              },
            })}
            onKeyDown={handleKeyDown}
            onClear={() => setValue("isbn", "")}
          />
          {errors.isbn ? (
            errors.isbn.type === "required" ? (
              <p className="h-5 typo-body text-error">ISBN을 입력해주세요.</p>
            ) : (
              <p className="h-5 typo-body text-error">{errors.isbn.message}</p>
            )
          ) : (
            <div className="h-5" />
          )}
          {/* 하단 고정 영역 */}
          <div className="grow" />
          <Button
            // type="button"
            type="submit"
            variant="filled"
            className="w-full"
          >
            요청하기
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center h-full typo-title1 text-white">
          <p>책 요청이 완료되었습니다.</p>
          <p>등록 후 이메일을 통해 결과를</p>
          <p>안내드리겠습니다.</p>
        </div>
      )}
      <BookFindDrawer isOpen={isbnDrawerOpen} onCloseAction={closeDrawer} className="z-100" />
    </Drawer>
  );
}
