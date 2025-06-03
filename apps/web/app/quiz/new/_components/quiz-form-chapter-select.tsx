"use client";

import { FormControl, FormField, FormItem } from "@readup/ui/atoms/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@readup/ui/atoms/select";
import { useFormContext } from "react-hook-form";
import { QuizCreateFormData } from "../_types/quiz-create";

export default function QuizFormChapterSelect() {
  const form = useFormContext<QuizCreateFormData>();

  return (
    <FormField
      control={form.control}
      name="chapterId"
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem>
          <FormControl>
            <Select {...field} value={value?.toString()} onValueChange={(value: string) => onChange(parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="챕터를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Chapter 1</SelectItem>
                  <SelectItem value="2">Chapter 2</SelectItem>
                  <SelectItem value="3">Chapter 3</SelectItem>
                  <SelectItem value="4">Chapter 4</SelectItem>
                  <SelectItem value="5">Chapter 5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
