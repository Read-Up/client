import { Control, Controller } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { TextBox } from "@readup/ui/atoms";

interface AddChapterItemProps {
  chapterId: number;
  index: number;
  control: Control;
  defaultValue: string;
  onChange: (value: string) => void;
  variant: "chapterbox" | "error_chapterbox";
  onClear: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
}

export default function AddChapterItem({
  chapterId,
  index,
  control,
  defaultValue,
  onChange,
  variant,
  onClear,
  inputRef,
}: AddChapterItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapterId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} tabIndex={-1}>
      <Controller
        name={`chapter-${chapterId}`}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextBox
            {...field}
            ref={inputRef}
            index={index}
            variant={variant}
            onClear={() => {
              field.onChange("");
              onChange("");
            }}
            placeholder="챕터 제목을 입력해주세요"
            onChange={(e) => {
              field.onChange(e);
              onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              const isBackspace = e.key === "Backspace";
              const isEmpty = field.value === "";
              if (isBackspace && isEmpty) {
                e.preventDefault();
                console.log("챕터 삭제");
                onClear();
              }
            }}
            className="h-10"
          />
        )}
      />
    </div>
  );
}
