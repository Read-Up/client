/**
 * BookSearchLoadingSkeleton
 * 책 검색 결과 로딩 스켈레톤 컴포넌트
 * @description 책 검색 결과가 로딩 중일 때 표시되는 스켈레톤 UI 컴포넌트입니다.
 * @param {boolean} isLoading - 로딩 상태
 */
export default function BookSearchLoadingSkeleton({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <div className="space-y-4">
        <div className="h-8 bg-overlay-16dp rounded animate-pulse w-20" />
        <div className="h-10 bg-overlay-16dp rounded animate-pulse w-full" />
        <div className="h-5 bg-gray-700 rounded animate-pulse w-1/3" />
        <div className="flex flex-row gap-4">
          <div className="h-40 bg-overlay-16dp rounded animate-pulse w-1/3" />
          <div className="flex flex-col gap-2 w-2/3">
            <div className="h-5 bg-overlay-16dp rounded animate-pulse w-1/2" />
            <div className="h-5 bg-overlay-16dp rounded animate-pulse w-full" />
            <div className="h-5 bg-overlay-16dp rounded animate-pulse w-full" />
            <div className="h-5 bg-overlay-16dp rounded animate-pulse w-1/4" />
          </div>
        </div>
      </div>
    )
  );
}
