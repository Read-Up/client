import { z } from "zod";

// 응답 스키마 정의
const randomNicknameResponseSchema = z.object({
  success: z.boolean(),
  data: z.string(),
  message: z.string(),
});

// 타입 추출
type RandomNicknameResponse = z.infer<typeof randomNicknameResponseSchema>;

// code 값 enum 정의
const codeEnum = z.enum(["AGE", "SERVICE", "PRIVACY", "MARKETING"]);

// 단일 약관 항목 스키마
const agreementItemSchema = z.object({
  termsVersionId: z.number(),
  code: codeEnum,
  title: z.string(),
  content: z.string(),
});

// 전체 응답 스키마
const agreementsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(agreementItemSchema),
  message: z.string(),
});

export { randomNicknameResponseSchema, agreementsResponseSchema, agreementItemSchema };
export type { RandomNicknameResponse };

export type AgreementKey = "AGE" | "SERVICE" | "PRIVACY" | "MARKETING";

export interface AgreementItem {
  code: AgreementKey;
  termsVersionId: number;
  title: string;
  content: string;
}
