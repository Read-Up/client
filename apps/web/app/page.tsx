'use client';

import { Button } from "@readup/ui/button";
import { TextBox } from "@readup/ui/textbox/default";
import { LinearProgress } from "@readup/ui/progress/linear/default";
import { CircularProgress } from "@readup/ui/progress/circular/default";
import { Modal } from "@readup/ui/modal/default";
// import Image, { type ImageProps } from "next/image";
import React from "react";

// type Props = Omit<ImageProps, "src"> & {
//   srcLight: string;
//   srcDark: string;
// };

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="h-full flex-center flex-col gap-5 p-5">
        {ProgressBar()}
        {Modals()}
      </div>
    </main>
  );
}

function ProgressBar() {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold text-white w-full ">Progress Bar</h1>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3 bg-white">
        <h1 className="text-2xl font-bold text-black">Linear Progress</h1>
        <h2 className="text-base font-bold text-black">Default</h2>
        <LinearProgress value={50} />
        <h2 className="text-base font-bold text-black">Height: 4px</h2>
        <LinearProgress value={70} height={4} />
        <h2 className="text-base font-bold text-black">Height: 8px</h2>
        <LinearProgress value={100} height={8} />
      </div>

      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3 bg-white">
        <h1 className="text-2xl font-bold text-black">Circular Progress</h1>
        <h2 className="text-base font-bold text-black">Default (50px)</h2>
        <CircularProgress value={50} />
        <h2 className="text-base font-bold text-black">Size: 100px</h2>
        <CircularProgress value={70} size={100} />
        <h2 className="text-base font-bold text-black">Size: 200px, Stroke: 10px</h2>
        <CircularProgress value={90} size={200} strokeWidth={10} />
      </div>
    </React.Fragment>
  );
}

function Modals() {
  const [textModalOpen, setTextModalOpen] = React.useState<boolean>(false);
  const [containedModalOpen, setContainedModalOpen] = React.useState<boolean>(false);

  const handleTextModalOpen = () => {
    setTextModalOpen(true);
  };

  const handleContainedModalOpen = () => {
    setContainedModalOpen(true);
  };

  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold text-white w-full">Modals</h1>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button onClick={handleTextModalOpen}>Text</Button>
          <Button onClick={handleContainedModalOpen}>Contained</Button>
          <Modal
            title="타이틀을 입력합니다"
            subtext="서브텍스트를 입력합니다"
            onClose={() => setTextModalOpen(false)}
            onConfirm={() => setTextModalOpen(false)}
            confirmText="확인"
            cancelText="취소"
            open={textModalOpen}
            variant="text"
          />
          <Modal
            title="타이틀을 입력합니다"
            subtext="서브텍스트를 입력합니다"
            onClose={() => setContainedModalOpen(false)}
            onConfirm={() => setContainedModalOpen(false)}
            confirmText="확인"
            cancelText="취소"
            open={containedModalOpen}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
