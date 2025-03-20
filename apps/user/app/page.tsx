import { Button } from "@repo/ui/button";
import { TextBox } from "@repo/ui/textbox/default";
import Image, { type ImageProps } from "next/image";
import React from "react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="h-full flex-center flex-col gap-5 p-5">
        {Buttons()}
        {TextBoxes()}
      </div>
    </main>
  );
}

const Buttons = () => {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold text-white w-full ">Buttons</h1>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/filled</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button >Default</Button>
          <Button variant='pressed' >Pressed</Button>
          <Button variant='disabled' >Disabled</Button>
          <Button variant='secondary' >Secondary</Button>
          {/* <Button variant='disabled' >일반사이즈</Button> */}
          {/* <Button variant='default' size='sm' >작은사이즈</Button> */}
          {/* <Button variant='default' size='lg' >큰사이즈</Button> */}
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/outlined</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button variant='outline' >Default</Button>
          <Button variant='disabled_outline' >Disabled</Button>
          <Button variant='secondary_outline' >Secondary</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/textonly</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button variant='text' >Default</Button>
          <Button variant='text_disabled' >Disabled</Button>
          <Button variant='text_connected' >Connected</Button>
          <Button variant='text_secondary' >Secondary</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/small</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button size='sm' >Default</Button>
          <Button size='sm' variant='outline' >Outlined</Button>
          <Button size='sm' variant='disabled' >Text</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/supporting</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button size='supporting' >Default</Button>
          <Button size='supporting' variant='outline' >Outlined</Button>
          <Button size='supporting' variant='disabled' >Text</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/supporting</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button size='supporting' >Default</Button>
          <Button size='supporting' variant='outline' >Outlined</Button>
          <Button size='supporting' variant='disabled' >Text</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/full</h1>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <Button size='full' >확인</Button>
          <Button size='full' variant='outline' >확인</Button>
          <Button size='full' variant='disabled' >확인</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

const TextBoxes = () => {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold text-white w-full ">TextBoxes</h1>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">searchbox</h1>
        <TextBox placeholder="검색어를 입력해주세요." variant='searchbox' />
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">textbox</h1>
        <TextBox placeholder="검색어를 입력해주세요." variant='searchbox' />
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">questionbox</h1>
        <TextBox placeholder="검색어를 입력해주세요." variant='searchbox' />
      </div>
    </React.Fragment>
  )
}
