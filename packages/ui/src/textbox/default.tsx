import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { PiCaretUpDownBold } from "react-icons/pi";

const textBoxVariants = cva("w-full p-2 text-on-primary transition focus:outline-none focus:ring-none", {
  variants: {
    variant: {
      searchbox: "px-3 placeholder-gray-400",
      textbox: "focus:ring-none px-3 placeholder-primary_variant",
      error: "focus:border-none focus:ring-error px-3 placeholder-error",
      questionbox:
        "h-40 focus:border-primary focus:ring-primary p-3  resize-none placeholder-[white-space:pre-wrap] placeholder-primary_variant",
      chapterbox: "p-3 placeholder-primary_variant",
      error_chapterbox: "p-3 placeholder-error text-error",
    },
  },
  defaultVariants: {
    variant: "searchbox",
  },
});

const formVariants = cva("w-full flex items-center rounded-[6px] bg-surface", {
  variants: {
    variant: {
      searchbox: "focus:border-primary focus:ring-primary !border-1 !border-gray-400",
      textbox: "focus:border-primary focus:ring-primary !border-1 !border-primary_variant",
      error: "focus:border-error focus:ring-error !border-1 !border-error",
      questionbox: "h-40 items-start focus:border-primary focus:ring-primary !border-1 !border-black",
      chapterbox: "focus:border-primary focus:ring-primary !border-1 !border-primary_variant",
      error_chapterbox: "focus:border-error focus:ring-error !border-1 !border-error",
    },
  },
  defaultVariants: {
    variant: "searchbox",
  },
});

const indexVariants = cva(
  "w-[30px] h-[30px] border-2 rounded-[6px] border-primary_variant text-primary_variant text-[14px] font-bold flex-center items-center",
  {
    variants: {
      variant: {
        chapterbox: "border-primary_variant text-primary_variant",
        error_chapterbox: "border-error text-error",
      },
    },
    defaultVariants: {
      variant: "chapterbox",
    },
  },
);

export interface TextBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "onSubmit">,
    VariantProps<typeof textBoxVariants> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  index?: number; // 챕터박스의 인덱스
  change?: boolean; // 챕터박스에서 순서 변경 가능 여부
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
}

const TextBox = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextBoxProps>(
  ({ className, value, onChange, onSubmit, placeholder, onClear, index, change, variant, ...props }, ref) => {
    const closeVariants = ["textbox", "error", "chapterbox", "error_chapterbox"];
    return (
      <div className="w-full flex flex-center items-center gap-[10px]">
        {(variant === "chapterbox" || variant === "error_chapterbox") && (
          <span className={cn(indexVariants({ className, variant }))}>
            {/* {error ? '!' : index} */}
            {variant === "error_chapterbox" && "!"}
            {change && <PiCaretUpDownBold size={20} />}
            {variant === "chapterbox" && !change && <span>{index}</span>}
          </span>
        )}
        <form onSubmit={onSubmit} className={cn(formVariants({ className, variant }))}>
          {/* variant가 'questionbox'이면 textarea, 아니면 input */}
          {variant === "questionbox" ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value}
              onChange={onChange}
              placeholder={placeholder || ""}
              className={cn(textBoxVariants({ className, variant }))}
              rows={5}
              {...props}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              value={value}
              onChange={onChange}
              placeholder={placeholder || ""}
              className={cn(textBoxVariants({ className, variant }))}
              {...props}
            />
          )}

          {/* 'questionbox'에서는 버튼 없음 */}
          {variant !== "questionbox" && (
            <button
              type="button"
              className="px-3 text-gray-400 cursor-pointer"
              onClick={() => {
                if (variant && closeVariants.includes(variant)) {
                  onClear?.();
                }
              }}
            >
              {variant === "searchbox" && <CiSearch size={24} />}
              {variant && closeVariants.includes(variant) && <IoIosCloseCircle size={24} />}
            </button>
          )}
        </form>
      </div>
    );
  },
);

TextBox.displayName = "TextBox";

export { TextBox, textBoxVariants };
