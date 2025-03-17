import { Button } from "@repo/ui/button";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="h-full flex-center flex-col gap-5">
        <Button >일반사이즈</Button>
        <Button variant='disabled' >일반사이즈</Button>
        <Button variant='default' size='sm' >작은사이즈</Button>
        <Button variant='default' size='lg' >큰사이즈</Button>
      </div>
    </main>
  );
}
