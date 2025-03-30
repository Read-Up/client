import { theme, TypeOfTypography } from "@readup/tokens";
import { promises as fs } from "fs";
import path from "path";

const includeKeys = ["color", "typography"];

const processTypography = (typographyObj: Record<string, TypeOfTypography["h1"]>): string[] => {
  const lines: string[] = [];
  for (const [typoKey, styles] of Object.entries(typographyObj)) {
    const fontSize = styles.fontSize + "px";
    const lineHeight = styles.lineHeight + "%";
    const fontWeight = styles.fontWeight;
    lines.push(`--text-${typoKey}: ${fontSize};`);
    lines.push(`--leading-${typoKey}: ${lineHeight};`);
    lines.push(`--font-weight-${typoKey}: ${fontWeight};`);
  }
  return lines;
};

type ThemeValue = string | number | Record<string, unknown>;

const collectCssVariables = (obj: Record<string, ThemeValue> | null, prefix = "--"): string[] => {
  if (obj == null) return [];
  const lines: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (prefix === "--" && !includeKeys.includes(key)) continue;

    if (key === "typography" && typeof value === "object" && value !== null) {
      lines.push(...processTypography(value as Record<string, TypeOfTypography["h1"]>));
    } else if (typeof value === "object" && value !== null) {
      lines.push(...collectCssVariables(value as Record<string, ThemeValue>, `${prefix}${key}-`));
    } else {
      lines.push(`${prefix}${key}: ${value};`);
    }
  }
  return lines;
};

/**
 * 주어진 객체를 CSS 변수 문자열로 변환하는 함수
 */
const toCssVariables = (obj: Record<string, ThemeValue>, prefix = "--"): string => {
  return collectCssVariables(obj, prefix).join("\n");
};

(async () => {
  try {
    const css = `@theme {\n${toCssVariables(theme)}\n}`;
    const outDir = path.resolve("src/styles");
    await fs.mkdir(outDir, { recursive: true });
    const filePath = path.join(outDir, "theme.css");
    await fs.writeFile(filePath, css, "utf-8");
    console.log("🚀 theme.css 파일이 성공적으로 생성되었습니다!");
  } catch (error) {
    console.log("❌ theme.css 생성 중 오류가 발생했습니다:", error);
  }
})();
