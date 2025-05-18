"use client";

import { CloseSVG } from "@readup/icons";
import { FormControl, FormField, FormItem, FormLabel, TextBox } from "@readup/ui/atoms";
import { Checkbox } from "@readup/ui/atoms/checkbox";
import { useFieldArray, useFormContext } from "react-hook-form";
import { QuizCreateFormData } from "../_types/quiz-create";

interface QuizCreateCardProps {
  index: number;
}

export default function QuizCreateCard({ index }: QuizCreateCardProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuizCreateFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `quizRequestList.${index - 1}.quizOptionRequestList`,
  });

  const questionError = errors.quizRequestList?.[index - 1]?.question?.message;
  const currentQuizOptions = watch(`quizRequestList.${index - 1}.quizOptionRequestList`);
  const hasCorrectAnswer = currentQuizOptions?.some((option) => option.isCorrect);
  const shouldShowError = !hasCorrectAnswer && questionError;

  const handleCheckChange = (checked: boolean, optionIndex: number) => {
    if (!checked) {
      return;
    }

    currentQuizOptions?.forEach((_, idx) => {
      setValue(`quizRequestList.${index - 1}.quizOptionRequestList.${idx}.isCorrect`, false, { shouldValidate: true });
    });

    setValue(`quizRequestList.${index - 1}.quizOptionRequestList.${optionIndex}.isCorrect`, true, {
      shouldValidate: true,
    });
  };

  return (
    <section className="py-5 px-2.5 bg-surface rounded-md flex flex-col gap-5 typo-body">
      <FormField
        control={control}
        name={`quizRequestList.${index - 1}.question`}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={`quiz-content-${index}`} className="font-medium text-foreground">
              {String(index).padStart(2, "0")}
            </FormLabel>
            <FormControl>
              <textarea
                {...field}
                id={`quiz-content-${index}`}
                placeholder="최대 150자까지 작성 가능합니다. 한글, 영문 대·소문자, 숫자, 기호를 입력할 수 있습니다."
                className={`w-full font-body p-2.5 rounded-md bg-[#18222D] placeholder:text-primary_variant text-white resize-none ${
                  questionError ? "border border-error focus:border-error" : ""
                }`}
                rows={6}
              />
            </FormControl>
            {questionError && <p className="mt-1 text-sm text-error">{questionError}</p>}
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">선택지</h3>
          <p className="typo-footnote text-gray-60">답안 작성 후, 정답을 좌측에 표시해주세요.</p>
        </div>
        <div className="flex flex-col gap-2">
          {fields.map((field, optionIndex) => {
            const optionError =
              errors.quizRequestList?.[index - 1]?.quizOptionRequestList?.[optionIndex]?.content?.message;

            return (
              <div key={field.id} className="flex gap-2 items-center w-full">
                <FormField
                  control={control}
                  name={`quizRequestList.${index - 1}.quizOptionRequestList.${optionIndex}.isCorrect`}
                  render={({ field: checkboxField }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={checkboxField.value}
                          onCheckedChange={(checked) => handleCheckChange(checked as boolean, optionIndex)}
                          className={shouldShowError ? "rounded-full border border-error " : ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`quizRequestList.${index - 1}.quizOptionRequestList.${optionIndex}.content`}
                  render={({ field: inputField }) => (
                    <FormItem className="w-full">
                      <div className="flex gap-2 items-center w-full">
                        <FormControl>
                          <input
                            {...inputField}
                            placeholder="답안을 입력하거나, 삭제해주세요."
                            className={`w-full placeholder:text-primary_variant px-3 py-2 rounded-md bg-gradient-to-t from-black/20 to-black/20 bg-surface text-white ${
                              optionError ? "border border-error focus:border-error" : ""
                            }`}
                          />
                        </FormControl>
                        {fields.length > 2 && (
                          <button
                            type="button"
                            onClick={() => remove(optionIndex)}
                            className="w-5 h-5 flex-shrink-0 rounded-full bg-error flex items-center justify-center"
                          >
                            <CloseSVG size="xs" />
                          </button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => append({ content: "", isCorrect: false })}
          className="self-start text-primary_variant hover:text-primary_variant/80"
        >
          추가
        </button>
      </div>

      <FormField
        control={control}
        name={`quizRequestList.${index - 1}.explanation`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-foreground">해설 (선택)</FormLabel>
            <FormControl>
              <TextBox
                variant="textbox"
                {...field}
                placeholder="정답 내용을 책의 몇 페이지에서 찾을 수 있나요?"
                onClear={() => {
                  field.onChange("");
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}
