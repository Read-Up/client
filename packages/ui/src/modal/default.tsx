import * as React from "react";
import { Button } from "../button";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "contained";
  open?: boolean;
  title?: string;
  subtext?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  variant = "text",
  open,
  title,
  subtext,
  onClose,
  onConfirm,
  confirmText = "Positive",
  cancelText = "Negative",
  ...props
}) => {
  return (
    open && (
      <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" {...props}>
        <div className="relative w-[337px] h-[178px] bg-white rounded-[12px] shadow-lg p-6 text-center">
          <h2 className="typo-title1 text-gray-20 font-bold">{title}</h2>
          <p className="typo-title3 text-gray-20 mt-2">{subtext}</p>
          <div className="absolute bottom-0 left-0 w-full h-15 flex flex-row items-center justify-center">
            {variant === "text" ? (
              <>
                <button onClick={onClose} className="w-1/2 text-gray-30">
                  {cancelText}
                </button>
                <button onClick={onConfirm} className="w-1/2 text-primary">
                  {confirmText}
                </button>
              </>
            ) : (
              <div className="w-full px-5 flex flex-row items-center justify-center gap-5">
                <Button variant="outline" size="full" onClick={onClose}>
                  {cancelText}
                </Button>
                <Button variant="default" size="full" onClick={onConfirm}>
                  {confirmText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export { Modal };
