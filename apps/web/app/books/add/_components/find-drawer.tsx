"use client";

import { Drawer } from "@readup/ui/molecules";

interface BookFindDrawerProps {
  isOpen: boolean;
  onCloseAction: () => void;
  className?: string;
}

export default function BookFindDrawer({ isOpen, onCloseAction, className }: BookFindDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onCloseAction}
      direction="bottom"
      size="h-[360px]"
      overlayOpacity="bg-black/30"
      className={`bg-overlay-16dp gap-6 ${className}`}
    >
      <p className="typo-title2 text-white">ISBN 확인하는 방법</p>
      <div className="flex flex-row items-center justify-between">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="w-[48%] h-[130px] bg-[#d9d9d9] rounded-lg"></div>
        ))}
      </div>
      <p className="typo-body text-white">
        ISBN은 일반적으로 책의 뒷표지 바코드 부분이나 판권지(책의 저작권 정보 페이지)에서 확인할 수 있습니다.
      </p>
    </Drawer>
  );
}
