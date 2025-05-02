import { z } from "zod";

// 응답 스키마 정의
const randomNicknameResponseSchema = z.object({
  success: z.boolean(),
  data: z.string(),
  message: z.string(),
});

// 타입 추출
type RandomNicknameResponse = z.infer<typeof randomNicknameResponseSchema>;

export { randomNicknameResponseSchema };
export type { RandomNicknameResponse };
