import { authMockups } from "../domain/auth";
import { diaryMockups } from "../domain/diary";
import { feedMockups } from "../domain/feed";
import { memberMockups } from "../domain/member";

export const handlers = [
  ...authMockups,
  ...feedMockups,
  ...memberMockups,
  ...diaryMockups,
];
