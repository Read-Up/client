import * as React from "react";
import { Button } from "../../atoms";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "contained";
  open?: boolean;
  title?: string;
  subtext?: string;
  onClose?: () => void;
  onCancel?: () => void;
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
  onCancel,
  onConfirm,
  confirmText = "Positive",
  cancelText = "Negative",
  ...props
}) => {
  return (
    open && (
      <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" {...props}>
        <div className="w-[337px] min-h-[178px] bg-white rounded-[12px] shadow-lg p-6 text-center flex flex-col gap-6">
          <h2 className="typo-title2 text-gray-20 font-bold">{title}</h2>
          <p className="typo-body text-gray-20">{subtext}</p>
          <div className={"w-full h-15 flex flex-row items-center " + cancelText ? "justify-center" : "justify-end"}>
            {variant === "text" ? (
              <>
                <button onClick={onCancel ? onCancel : onClose} className="w-1/2 text-gray-30">
                  {cancelText}
                </button>
                <button onClick={onConfirm} className="w-1/2 text-primary">
                  {confirmText}
                </button>
              </>
            ) : (
              <div className="w-full px-5 flex flex-row items-center gap-5 justify-end">
                {cancelText && (
                  <Button variant="outline" size="full" onClick={onCancel ? onCancel : onClose}>
                    {cancelText}
                  </Button>
                )}
                <Button variant="filled" size={cancelText ? "full" : "default"} onClick={onConfirm}>
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
