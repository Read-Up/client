import { theme, TypeOfTypography } from "@readup/tokens";
import { promises as fs } from "fs";
import path from "path";

const CONFIG = {
  includeKeys: ["color", "typography", "zIndex"],
  outputDir: "src/styles",
  outputFile: "theme.css",
};

const utils = {
  toKebabCase: (str: string): string => {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  },
};

type ThemeValue = string | number | Record<string, unknown>;

const processTypography = (typographyObj: Record<string, TypeOfTypography["h1"]>): string[] => {
  return Object.entries(typographyObj).flatMap(([typoKey, styles]) => [
    `--text-${typoKey}: ${styles.fontSize}px;`,
    `--leading-${typoKey}: ${styles.lineHeight}%;`,
    `--font-weight-${typoKey}: ${styles.fontWeight};`,
  ]);
};

const processZIndex = (zIndexObj: Record<string, number>): string[] => {
  return Object.entries(zIndexObj).map(([key, value]) => `--z-${key}: ${value};`);
};

const collectCssVariables = (obj: Record<string, ThemeValue> | null, prefix = "--"): string[] => {
  if (!obj) return [];

  return Object.entries(obj).flatMap(([key, value]) => {
    // 최상위 레벨에서 지정된 키만 포함
    if (prefix === "--" && !CONFIG.includeKeys.includes(key)) return [];

    const kebabKey = utils.toKebabCase(key);

    // 타입별 특수 처리
    if (key === "typography" && typeof value === "object" && value !== null) {
      return processTypography(value as Record<string, TypeOfTypography["h1"]>);
    }

    if (key === "zIndex" && typeof value === "object" && value !== null) {
      return processZIndex(value as Record<string, number>);
    }

    if (typeof value === "object" && value !== null) {
      return collectCssVariables(value as Record<string, ThemeValue>, `${prefix}${kebabKey}-`);
    }

    return [`${prefix}${kebabKey}: ${value};`];
  });
};

const toCssVariables = (obj: Record<string, ThemeValue>): string => {
  return collectCssVariables(obj).join("\n");
};

const generateCssFile = async (cssContent: string, outputPath: string): Promise<void> => {
  try {
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(outputPath, cssContent, "utf-8");
    console.log(`🚀 ${path.basename(outputPath)} 파일이 성공적으로 생성되었습니다!`);
  } catch (error) {
    console.error(`❌ ${path.basename(outputPath)} 생성 중 오류가 발생했습니다:`, error);
  }
};

// 메인 실행 함수
const main = async (): Promise<void> => {
  const css = `@theme {\n${toCssVariables(theme)}\n}`;
  const outputPath = path.resolve(CONFIG.outputDir, CONFIG.outputFile);
  await generateCssFile(css, outputPath);
};

// 스크립트 실행
main().catch((error) => {
  console.error("❌ 스크립트 실행 중 오류가 발생했습니다:", error);
  process.exit(1);
});
