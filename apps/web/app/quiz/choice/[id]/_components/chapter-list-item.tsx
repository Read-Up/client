interface ChapterListItemProps {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

export default function ChapterListItem({ title, disabled, onClick }: ChapterListItemProps) {
  return (
    <div
      className={`p-3 rounded-md border typo-title3 ${disabled ? "border-gray-40 text-gray-40" : "border-primary cursor-pointer hover:border-2 hover:p-[11px]"}`}
      onClick={disabled ? undefined : onClick}
    >
      {title}
    </div>
  );
}
