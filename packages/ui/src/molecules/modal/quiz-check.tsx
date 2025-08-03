import * as React from "react";
import { Button } from "../../atoms";
import { ModalProps } from "./default";

const QuizCheckModal: React.FC<ModalProps> = ({
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
  const [subtextOpen, setSubtextOpen] = React.useState(false);

  const handleOnClose = () => {
    setSubtextOpen(false);
    onClose?.();
  };

  const handleOnCancel = () => {
    setSubtextOpen(false);
    onCancel?.();
  };

  const handleOnConfirm = () => {
    setSubtextOpen(false);
    onConfirm?.();
  };

  return (
    open && (
      <div
        onClick={onClose ? handleOnClose : undefined}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        {...props}
      >
        <div className="w-[337px] min-h-[178px] bg-white rounded-[12px] shadow-lg p-6 text-center flex flex-col gap-6">
          <h2 className="typo-title2 text-gray-20 font-bold">{title}</h2>
          {subtext ? (
            <>
              {!subtextOpen ? (
                <div
                  className="w-full h-[100px] bg-gray-90 rounded-md p-2 flex items-center justify-center hover:bg-gray-80 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubtextOpen(true);
                  }}
                >
                  <p className="typo-title3">해설 보기</p>
                </div>
              ) : (
                <div
                  className="w-full h-[100px] bg-gray-90 rounded-md p-2 overflow-y-auto whitespace-pre-line break-words"
                  style={{ wordBreak: "break-word", display: "block" }}
                >
                  {subtext}
                </div>
              )}
            </>
          ) : (
            <p className="typo-body text-gray-20">해설이 제공되지 않는 문제입니다.</p>
          )}
          <div className={"w-full h-15 flex flex-row items-center " + cancelText ? "justify-center" : "justify-end"}>
            {variant === "text" ? (
              <>
                <button onClick={onCancel ? handleOnCancel : handleOnClose} className="w-1/2 text-gray-30">
                  {cancelText}
                </button>
                <button onClick={handleOnConfirm} className="w-1/2 text-primary">
                  {confirmText}
                </button>
              </>
            ) : (
              <div className="w-full px-5 flex flex-row items-center gap-5 justify-end">
                {cancelText && (
                  <Button variant="outline" size="full" onClick={onCancel ? handleOnCancel : handleOnClose}>
                    {cancelText}
                  </Button>
                )}
                <Button variant="filled" size={cancelText ? "full" : "default"} onClick={handleOnConfirm}>
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

export { QuizCheckModal };
