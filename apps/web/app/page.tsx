"use client";

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
        {Buttons()}
        {TextBoxes()}
        {ProgressBar()}
        {Modals()}
      </div>
    </main>
  );
}

function Buttons() {
  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold text-white w-full ">Buttons</h1>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/filled</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button onClick={() => console.log("click")}>Default</Button>
          <Button variant="pressed">Pressed</Button>
          <Button variant="disabled">Disabled</Button>
          <Button variant="secondary">Secondary</Button>
          {/* <Button variant='disabled' >일반사이즈</Button> */}
          {/* <Button variant='default' size='sm' >작은사이즈</Button> */}
          {/* <Button variant='default' size='lg' >큰사이즈</Button> */}
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/outlined</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button variant="outline">Default</Button>
          <Button variant="disabled_outline">Disabled</Button>
          <Button variant="secondary_outline">Secondary</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/textonly</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button variant="text">Default</Button>
          <Button variant="text_disabled">Disabled</Button>
          <Button variant="text_connected">Connected</Button>
          <Button variant="text_secondary">Secondary</Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/small</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button size="sm">Default</Button>
          <Button size="sm" variant="outline">
            Outlined
          </Button>
          <Button size="sm" variant="disabled">
            Text
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/supporting</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button size="supporting">Default</Button>
          <Button size="supporting" variant="outline">
            Outlined
          </Button>
          <Button size="supporting" variant="disabled">
            Text
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/supporting</h1>
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <Button size="supporting">Default</Button>
          <Button size="supporting" variant="outline">
            Outlined
          </Button>
          <Button size="supporting" variant="disabled">
            Text
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">button/full</h1>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <Button size="full">확인</Button>
          <Button size="full" variant="outline">
            확인
          </Button>
          <Button size="full" variant="disabled">
            확인
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

function TextBoxes() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [textValue, setTextValue] = React.useState<string>("");
  const [chapterValue, setChapterValue] = React.useState<string>("");

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchValueSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searchValue:", searchValue);
  };

  const handleTextValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };
  const handleTextValueClear = () => {
    setTextValue("");
  };

  const handleChapterValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChapterValue(e.target.value);
  };
  const handleChapterValueClear = () => {
    setChapterValue("");
  };

  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold text-white w-full ">TextBoxes</h1>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">searchbox</h1>
        <TextBox
          placeholder="검색어를 입력해주세요."
          variant="searchbox"
          value={searchValue}
          onChange={handleSearchValueChange}
          onSubmit={handleSearchValueSubmit}
        />
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">textbox</h1>
        <TextBox
          placeholder="안내문구가 입력됩니다."
          variant="textbox"
          value={textValue}
          onChange={handleTextValueChange}
          onClear={handleTextValueClear}
        />
        <TextBox
          placeholder="안내문구가 입력됩니다."
          variant="error"
          value={"오류 발견 시, 텍스트 색상은 ‘on primary’ 유지"}
          onChange={() => {}}
        />
        <TextBox
          className="rounded-full"
          placeholder="안내문구가 입력됩니다."
          variant="textbox"
          value={textValue}
          onChange={handleTextValueChange}
          onClear={handleTextValueClear}
        />
        <TextBox
          className="rounded-full"
          placeholder="안내문구가 입력됩니다."
          variant="error"
          value={"오류 발견 시, 텍스트 색상은 ‘on primary’ 유지"}
          onChange={() => {}}
        />
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">questionbox</h1>
        <TextBox
          placeholder={`최대 255자까지 작성 가능합니다.\n한글, 영문 대·소문자, 숫자를 입력할 수 있습니다.`}
          variant="questionbox"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <TextBox
          placeholder={`최대 255자까지 작성 가능합니다.\n한글, 영문 대·소문자, 숫자를 입력할 수 있습니다.`}
          variant="questionbox"
          value={
            "따스한 햇살이 스며듭니다. 차가운 공기는 어느새 옅은 미풍으로 변해가며, 나뭇가지 끝에는 작은 새싹이 모습을 드러냅니다. 이윽고 나무들은 조금씩 연두빛을 띠기 시작하고, 기다란 가지는 새로운 생명을 향해 뻗어갑니다. 봄은 언제나 그러하듯 천천히, 조용히 다가오지만, 그 변화는 미세하면서도 놀랍도록 분명합니다. 사람들"
          }
          onChange={() => {}}
        />
      </div>
      <div className="w-full flex flex-col p-5 border-dashed border-2 border-[#9747FF] rounded-[5px] gap-3">
        <h1 className="text-2xl font-bold text-white">chapterbox</h1>
        <TextBox
          placeholder="안내문구가 입력됩니다."
          variant="chapterbox"
          value={chapterValue}
          onChange={handleChapterValueChange}
          onClear={handleChapterValueClear}
          index={1}
        />
        <TextBox
          placeholder="안내문구가 입력됩니다."
          variant="chapterbox"
          value="사용자 입력 시"
          onChange={() => {}}
          index={1}
        />
        <TextBox
          placeholder="안내문구가 입력됩니다."
          variant="error_chapterbox"
          value="오류 발견"
          onChange={() => {}}
          index={1}
        />
        <TextBox
          placeholder="안내문구가 입력됩니다."
          variant="chapterbox"
          value="순서 변경 시"
          onChange={() => {}}
          index={1}
          change={true}
        />
      </div>
    </React.Fragment>
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
