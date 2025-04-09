import { existsSync, promises as fs } from "fs";
import path from "path";

const SVG_DIR = "../icons/src/svg";
const COMPONENT_DIR = "../icons/src/components";

type SvgComponentMap = { [key: string]: string };

const generateSvgComponentMap = async () => {
  const svgFiles = (await fs.readdir(SVG_DIR)).reduce<SvgComponentMap>((map, svgFile) => {
    const componentName =
      path.basename(svgFile, ".svg").replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase()) + "SVG";
    map[componentName] = svgFile;

    return map;
  }, {});

  return svgFiles;
};

const deleteUnusedComponentFiles = async (svgComponentMap: SvgComponentMap) => {
  if (!existsSync(COMPONENT_DIR)) {
    fs.mkdir(COMPONENT_DIR);
    return;
  }

  const componentFiles = await fs.readdir(COMPONENT_DIR);
  const componentFilesToDelete = componentFiles.filter((componentFile) => {
    const componentName = path.basename(componentFile, ".tsx");
    return !(componentName in svgComponentMap);
  });

  await Promise.all(
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

const generateComponentFiles = async (svgComponentMap: SvgComponentMap) => {
  const components: string[] = [];

  for (const [componentName, svgFile] of Object.entries(svgComponentMap)) {
    const baseName = path.basename(svgFile, ".svg");
    const kebabName = `${baseName}.svg.tsx`;
    const componentFilePath = path.resolve(COMPONENT_DIR, kebabName);

    if (existsSync(componentFilePath)) {
      components.push(componentName);
      continue;
    }

    const svgFilePath = path.resolve(SVG_DIR, svgFile);
    const svgContent = (await fs.readFile(svgFilePath)).toString();
    const componentContent = createComponentContent(componentName, svgContent, svgFile);

    await fs.writeFile(componentFilePath, componentContent);
    components.push(componentName);
  }

  return components;
};

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
