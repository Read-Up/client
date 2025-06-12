import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // TypeScript 파일(.ts, .tsx)을 Jest에서 변환 가능하게 설정
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Jest가 테스트할 파일 확장자 지정
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Jest가 테스트할 파일명 패턴
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],

  // E2E 테스트 디렉토리는 Jest에서 제외
  testPathIgnorePatterns: ["<rootDir>/app/__tests__/e2e/"],

  // Testing Library의 matcher(`toBeInTheDocument` 등) 확장
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

export default config;
