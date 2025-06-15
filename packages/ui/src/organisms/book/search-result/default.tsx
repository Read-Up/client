import { BookmarkSVG } from "@readup/icons";
import { color } from "@readup/tokens";
import React from "react";

export interface BookSearchResultProps {
  id: number;
  image: string;
  bookmark?: boolean;
  title: string;
  author: string;
  publisher: string;

  isbn?: string | number; // Optional ISBN for linking to book details
  showBookmark?: boolean; // Optional prop to control bookmark visibility

  onBookmarkToggle?: (id: number, nextValue: boolean) => void;
  onClickDetail?: (id: number) => void;

  // SSR-friendly Link props
  href?: string;
  linkComponent?: React.ComponentType<{ children: React.ReactNode; href: string }>;
}

function BookSearchResult({
  id,
  image,
  title,
  author,
  publisher,
  bookmark,
  onBookmarkToggle,
  onClickDetail,
  isbn,
  href,
  showBookmark = true,
  linkComponent: LinkComponent,
}: BookSearchResultProps) {
  const Content = (
    <div className="flex flex-row gap-[10px] cursor-pointer" onClick={() => onClickDetail?.(id)}>
      <img className="w-[100px] h-[140px] object-cover" src={image} alt={`${title} cover image`} loading="lazy" />
      <div className="flex flex-col w-full relative gap-[10px]">
        {isbn && (
          <div className="flex flex-row gap-2 items-center text-white">
            <p className="typo-footnote">ISBN</p>
            <p className="typo-title3">{isbn}</p>
          </div>
        )}
        <h3 className="typo-title3 text-white">{title}</h3>
        <p className="typo-footnote text-white">
          {author} • {publisher}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex w-full h-[140px] flex-row gap-[10px] relative">
      {LinkComponent && href ? <LinkComponent href={href}>{Content}</LinkComponent> : Content}

      {showBookmark && (
        <button
          className="absolute bottom-0.5 right-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle?.(id, !bookmark);
          }}
        >
          <BookmarkSVG fill={bookmark ? color.primary : "none"} size="xl" />
        </button>
      )}
    </div>
  );
}

export { BookSearchResult };
