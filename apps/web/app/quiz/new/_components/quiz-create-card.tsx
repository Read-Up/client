"use client";

import { FormControl, FormField, FormItem, FormLabel } from "@readup/ui/form";
import { TextBox } from "@readup/ui/textbox";
import { useFormContext } from "react-hook-form";

export default function QuizCreateCard() {
  const { control } = useFormContext();

  return (
    <section className="py-5 px-2.5 bg-surface rounded-md flex flex-col gap-5 typo-body">
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="quiz-content" className="font-medium text-foreground">
              01
            </FormLabel>
            <FormControl>
              <textarea
                {...field}
                id="quiz-content"
                placeholder="최대 150자까지 작성 가능합니다. 한글, 영문 대·소문자, 숫자, 기호를 입력할 수 있습니다."
                className="w-full font-body p-2.5 rounded-md bg-[#18222D] placeholder:text-primary_variant text-white resize-none"
                rows={6}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">선택지</h3>
          <p className="typo-footnote text-gray-60">답안 작성 후, 정답을 좌측에 표시해주세요.</p>
        </div>
        <FormField
          control={control}
          name="choices.0"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextBox {...field} placeholder="선택지 1을 입력해주세요" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="explanation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-foreground">해설 (선택)</FormLabel>
            <FormControl>
              <textarea
                {...field}
                placeholder="정답 내용을 책의 몇 페이지에서 찾을 수 있나요?"
                className="w-full font-body p-2.5 rounded-md bg-[#18222D] placeholder:text-primary_variant text-white resize-none"
                rows={3}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}
