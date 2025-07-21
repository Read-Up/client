import { z } from "zod";

// --- 1) 회원 가입 스키마 ---
export const SignupSchema = z.object({
  id: z.number(),
  nickname: z.string(),
});

export type Signup = z.infer<typeof SignupSchema>;

// --- 2) 회원 가입 응답 스키마 ---
export const SignupResponseSchema = z.object({
  success: z.boolean(),
  data: SignupSchema,
  message: z.string(),
});
export type SignupResponse = z.infer<typeof SignupResponseSchema>;
