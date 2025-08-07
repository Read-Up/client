"use client";

import { PencilSVG } from "@readup/icons";
import { Button, TextBox } from "@readup/ui/atoms";
import { Drawer } from "@readup/ui/molecules";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ProfileScreen() {
  const [nickname, setNickname] = useState("nickname"); // 기존 닉네임을 가져와야 함
  const [changedNickname, setChangedNickname] = useState(nickname); // 변경된 닉네임을 저장하기 위한 상태
  const email = "example@google.com"; // 이메일은 고정값으로 설정 (유저 정보 가져오기 필요)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditNickname, setIsEditNickname] = useState(false); // 닉네임 수정 모달 상태
  const [isChanged, setIsChanged] = useState(false); // 프로필 이미지 변경 여부 상태

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setProfileImage(objectUrl);
    setIsChanged(true);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const openEditNickname = () => {
    setIsEditNickname(true);
    setChangedNickname(nickname);
  };

  const closeEditNickname = () => {
    setIsEditNickname(false);
    setChangedNickname(nickname);
  };

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col p-4 pb-10 gap-2.5 relative">
      {/* 프로필 이미지 */}
      <div className="w-[90px] h-[90px] self-center m-8 flex relative overflow-hidden">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필"
            className="w-full h-full object-cover rounded-full"
            width={90}
            height={90}
          />
        ) : (
          <div className="w-full h-full flex-center bg-surface text-white text-sm rounded-full">No Image</div>
        )}

        {/* 이미지 업로드 버튼 */}
        <button
          type="button"
          onClick={handleEditClick}
          className="absolute w-[24px] h-[24px] rounded-full bg-primary bottom-0 right-0 flex-center"
        >
          <PencilSVG size="md" />
        </button>

        {/* 숨겨진 파일 업로더 */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>
      <p className="typo-body text-white">닉네임</p>
      <TextBox
        variant="searchbox"
        placeholder="닉네임"
        value={nickname}
        isBorder={false}
        icon={<PencilSVG />}
        onButtonClick={openEditNickname}
        readOnly
      />
      <p className="typo-body text-white">Email</p>
      <TextBox variant="searchbox" value={email} isButton={false} isBorder={false} readOnly />

      {/* 하단 버튼 */}
      <div className="grow" />
      <Button className="typo-title2" variant="filled" disabled={!isChanged} onClick={() => {}}>
        수정하기
      </Button>
      <Drawer
        isOpen={isEditNickname}
        onClose={closeEditNickname}
        className="flex flex-col gap-2 pb-10"
        size="h-[300px]"
        direction="bottom"
      >
        <>
          <p className="typo-title3 text-white mt-2">닉네임을 변경해주세요</p>
          <p className="typo-body text-gray-70">공백없이 2~12글자로 입력해주세요</p>
          <TextBox
            className="mt-2"
            variant="textbox"
            placeholder="닉네임"
            value={changedNickname}
            onChange={(e) => {
              setChangedNickname(e.target.value);
            }}
            icon={<p className="typo-body text-gray-60 whitespace-nowrap">{`${changedNickname.length} / 12`}</p>}
          />
          <div className="grow" />
          <Button
            className="typo-title2"
            variant="filled"
            disabled={changedNickname === nickname || changedNickname.length < 2 || changedNickname.length > 12}
            onClick={() => {
              setNickname(changedNickname);
              setIsEditNickname(false);
            }}
          >
            완료
          </Button>
        </>
      </Drawer>
    </div>
  );
}
