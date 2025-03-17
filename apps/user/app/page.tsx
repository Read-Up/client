import { Button } from "@repo/ui/button";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="h-full flex-center">
        <span className="text-5xl">ㅗㅑㅗㅑㅗㅑ</span>
        <Button >테스트</Button>
      </div>
    </main>
  );
}
