import { authMockups } from "../domain/auth";
import { diaryMockups } from "../domain/diary";
import { feedMockups } from "../domain/feed";
import { quizMockups } from "../domain/quiz";

export const handlers = [...authMockups, ...feedMockups, ...diaryMockups, ...quizMockups];
