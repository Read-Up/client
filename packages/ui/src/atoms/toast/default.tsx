import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib";

const toastVariants = cva("typo-body", {
  variants: {
    textColor: {
      default: "text-primary",
      error: "text-error",
    },
  },
  defaultVariants: {
    textColor: "default",
  },
});

export interface ToastProps extends React.HTMLAttributes<HTMLHRElement>, VariantProps<typeof toastVariants> {
  isOpen: boolean;
  /**
   * @description Toast의 텍스트 색상
   * @default "default"
   */
  textColor?: VariantProps<typeof toastVariants>["textColor"];
  className?: string;
  text: string;
  /**
   * @description 자동으로 사라지게 할 시간 (ms)
   * @default 3000
   */
  timeout?: number;
  /**
   * @description Toast가 사라질 때의 콜백 함수
   * @default () => {}
   */
  onDismiss?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ textColor = "default", className, text, timeout = 3000, isOpen, onDismiss, ...props }, ref) => {
    React.useEffect(() => {
      if (timeout > 0) {
        const timer = setTimeout(() => {
          onDismiss?.();
        }, timeout);
        return () => clearTimeout(timer);
      }
    }, [timeout, onDismiss]);

    if (!isOpen) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "fixed left-1/2 transform -translate-x-1/2 bottom-14.5",
          "inline-block rounded-full p-1 px-4 bg-overlay-16dp w-fit whitespace-normal break-words",
          "z-50",
          toastVariants({ textColor }),
          className,
        )}
        {...props}
      >
        {text}
      </div>
    );
  },
);

Toast.displayName = "Toast";

export { Toast, toastVariants };
