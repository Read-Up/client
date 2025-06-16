import { authMockups } from "../domain/auth";
import { diaryMockups } from "../domain/diary";
import { feedMockups } from "../domain/feed";

export const handlers = [...authMockups, ...feedMockups, ...diaryMockups];
