import { existsSync, promises as fs } from "fs";
import path from "path";

const SCRIPT_DIR = __dirname;
const SVG_DIR = path.resolve(SCRIPT_DIR, "../svg");
const COMPONENT_DIR = path.resolve(SCRIPT_DIR, "../components");

type SvgComponentMap = { [key: string]: string };

/**
 * SVG 디렉토리에서 SVG 파일을 읽어 컴포넌트 이름과 파일 경로를 매핑하는 객체를 생성합니다.
 * @returns {Promise<SvgComponentMap>} 컴포넌트 이름과 SVG 파일 경로를 매핑한 객체
 */
const generateSvgComponentMap = async () => {
  // SVG 디렉토리가 존재하지 않으면 예외 발생
  if (!existsSync(SVG_DIR)) {
    throw new Error(`SVG directory does not exist: ${SVG_DIR}`);
  }

  // SVG 디렉토리에서 .svg 파일을 읽어 컴포넌트 이름과 파일 경로를 매핑하는 객체 생성
  // 파일 이름에서 하이픈(-)을 제거하고 첫 글자를 대문자로 변환하여 컴포넌트 이름 생성
  // 예: share-line-2.svg -> ShareLine2SVG
  const svgFiles = (await fs.readdir(SVG_DIR)).reduce<SvgComponentMap>((map, svgFile) => {
    const componentName =
      path.basename(svgFile, ".svg").replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase()) + "SVG";
    map[componentName] = svgFile;

    return map;
  }, {});

  return svgFiles;
};

/**
 * 컴포넌트 디렉토리에서 사용되지 않는 컴포넌트 파일을 삭제합니다.
 * @param svgComponentMap - SVG 파일과 컴포넌트 이름을 매핑한 객체
 */
const deleteUnusedComponentFiles = async (svgComponentMap: SvgComponentMap) => {
  // 컴포넌트 디렉토리가 존재하지 않으면 생성하고 종료
  if (!existsSync(COMPONENT_DIR)) {
    fs.mkdir(COMPONENT_DIR);
    return;
  }

  // 컴포넌트 디렉토리에서 .tsx 파일만 필터링
  const componentFiles = await fs.readdir(COMPONENT_DIR);

  // svgComponentMap에서 value 값들을 추출하여 컴포넌트 이름과 비교
  const usedSvgFileNames = new Set(Object.values(svgComponentMap));

  // 사용되지 않는 컴포넌트 파일을 필터링
  const componentFilesToDelete = componentFiles.filter((componentFile) => {
    const componentName = path.basename(componentFile, ".tsx");
    return !usedSvgFileNames.has(componentName);
  });

  // 삭제할 컴포넌트 파일 경로를 생성
  await Promise.all(
    // componentFilesToDelete를 순회하며 파일 삭제
    componentFilesToDelete.map((file) => {
      const componentFilePath = path.resolve(COMPONENT_DIR, file);
      return fs.unlink(componentFilePath);
    }),
  );
};

const extractSvgAttributes = (svgContent: string) => {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/g);
  return {
    viewBox: viewBoxMatch ? viewBoxMatch[0] : "viewBox = 0 0 24 24",
  };
};

const transformAttributeNames = (content: string) => {
  return content.replace(/<([a-zA-Z]+)([^>]+)>/g, (_, tagName, attributes) => {
    const transformedAttributes = attributes.replace(
      /(\s)([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)+)(?==)/g,
      (_: string, space: string, attrName: string) => {
        return space + attrName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      },
    );
    return `<${tagName}${transformedAttributes}>`;
  });
};

/**
 * SVG 파일 내용을 읽어 컴포넌트 내용을 생성합니다.
 * @param componentName - 생성할 컴포넌트 이름
 * @param svgContent - SVG 파일 내용
 * @param svgFile - SVG 파일 경로
 * @returns {string} - 생성된 컴포넌트 내용
 */
const createComponentContent = (componentName: string, svgContent: string, svgFile: string): string => {
  const iconName = path.basename(svgFile, ".svg");
  const hasStroke = svgContent.includes("stroke=");
  const fillAttributes = (svgContent.match(/fill="([^"]*)"/g) || []).filter((attr) => attr !== 'fill="none"');
  const hasFill = fillAttributes.length;
  const { viewBox } = extractSvgAttributes(svgContent);

  const propsString = `{ className, size = "md", ${viewBox}${hasStroke || hasFill ? ` ${hasStroke ? ', stroke = "#FFF"' : ""}${hasFill ? ', fill = "#FFF"' : ""}` : ""}, ...rest }`;

  const modifiedSvgContent = transformAttributeNames(svgContent)
    .replace(/width="(\d+)"/g, `width={ICON_SIZE_MAP[size]}`)
    .replace(/height="(\d+)"/g, `height={ICON_SIZE_MAP[size]}`)
    .replace(/viewBox="(.*?)"/g, `viewBox={viewBox}`)
    .replace(/<svg([^>]*)fill="[^"]*"([^>]*)>/, "<svg$1$2>")
    .replace(/fill="([^"]+)"/g, `fill={fill}`)
    .replace(/stroke="([^"]+)"/g, `stroke={stroke}`)
    .replace(
      /<svg([^>]*)>/,
      `<svg$1 aria-label="${iconName} icon" fill="none" ref={ref} className={className} {...rest}>`,
    );

  return `
    import { forwardRef } from 'react';

    import type { IconProps } from "../types/icon";
    import { ICON_SIZE_MAP } from "../types/icon";

    const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
      (${propsString}, ref) => {
        return (
          ${modifiedSvgContent}
        );
      }
    );

    ${componentName}.displayName = '${componentName}';
    export default ${componentName};
  `;
};

/**
 * SVG 파일을 읽어 컴포넌트 이름과 파일 경로를 매핑하는 객체를 생성합니다.
 * @returns {Promise<SvgComponentMap>} 컴포넌트 이름과 SVG 파일 경로를 매핑한 객체
 */
const generateComponentFiles = async (svgComponentMap: SvgComponentMap) => {
  const components: string[] = [];

  // svgComponentMap을 순회하며 컴포넌트 파일 생성
  for (const [componentName, svgFile] of Object.entries(svgComponentMap)) {
    // 컴포넌트 파일 경로 생성
    const kebabName = `${svgFile}.tsx`;
    const componentFilePath = path.resolve(COMPONENT_DIR, kebabName);

    // 컴포넌트 파일이 이미 존재하면 생성하지 않고 다음 파일로 넘어감
    if (existsSync(componentFilePath)) {
      components.push(componentName);
      continue;
    }

    // SVG 파일을 읽어 컴포넌트 내용 생성
    const svgFilePath = path.resolve(SVG_DIR, svgFile);
    const svgContent = (await fs.readFile(svgFilePath)).toString();
    const componentContent = createComponentContent(componentName, svgContent, svgFile);

    await fs.writeFile(componentFilePath, componentContent);
    components.push(componentName);
  }

  return components;
};

/**
 * 컴포넌트 파일들을 export하는 파일을 생성합니다.
 * @param components - 생성된 컴포넌트 이름 목록
 * @param svgComponentMap - SVG 파일과 컴포넌트 이름을 매핑한 객체
 */
const generateExportFile = async (components: string[], svgComponentMap: SvgComponentMap) => {
  const EXPORT_FILE_PATH = "../icons/src/components/index.ts";

  const exportFileContent = components
    .map((componentName) => {
      const svgFile = svgComponentMap[componentName]; // ex: share-line-2.svg
      const fileName = `${svgFile}.tsx`.replace(/\.svg\.tsx$/, ".svg"); // => share-line-2.svg
      return `export { default as ${componentName} } from "./${fileName}";`;
    })
    .join("\n");

  const resolvedExportFileContent = `export * from "../types/icon";\n${exportFileContent}`;

  await fs.writeFile(EXPORT_FILE_PATH, resolvedExportFileContent);
};

(async () => {
  try {
    const svgComponentMap = await generateSvgComponentMap();
    await deleteUnusedComponentFiles(svgComponentMap);
    const components = await generateComponentFiles(svgComponentMap);
    await generateExportFile(components, svgComponentMap);
  } catch (error) {
    console.log("Error generating components:", error);
  }
})();
