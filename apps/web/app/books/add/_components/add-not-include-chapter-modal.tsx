import { Modal } from "@readup/ui/molecules";

interface BookAddNotIncludeChapterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function BookAddNotIncludeChapterModal({
  isOpen,
  onClose,
  onConfirm,
}: BookAddNotIncludeChapterModalProps) {
  return (
    <Modal
      open={isOpen}
      variant="contained"
      onClose={onClose}
      onConfirm={onConfirm}
      title="목차 없이 바로 추가할까요?"
      subtext="목차는 추후에 직접 입력할 수 있습니다"
      confirmText="바로 추가"
      cancelText="뒤로가기"
    />
  );
}
