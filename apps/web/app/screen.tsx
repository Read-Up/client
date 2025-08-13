"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "./_components/shared/shared-layout";
import { UserCircleSVG } from "@readup/icons";
import { useRouter } from "next/navigation";
import { PATH } from "./_constant/routes";
import { MemberAPI } from "./_client/main/member-api";
import { Divider, TextBox } from "@readup/ui/atoms";
import { useDebounce } from "./_hooks";
import { BookAPI } from "./_client/book";
import { BookDetail, BookItem } from "./_types/books/schema";
import { END_POINT } from "./_constant/end-point";
import Image from "next/image";
import { LinearProgress } from "@readup/ui/organisms";
import Slider from "react-slick";

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);
  const sliderRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [recentBooks, setRecentBooks] = useState<BookItem[]>([]);
  const [selectRecentBook, setSelectRecentBook] = useState<BookItem | null>(null);
  const [selectRecentBookDetail, setSelectRecentBookDetail] = useState<BookDetail | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await MemberAPI.getCurrentUser();
        console.log("User data:", response);
        setUser(response); // response가 UserData 타입이라고 가정
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const books = await BookAPI.getBookList();
        console.log("Recent books:", books);
        setRecentBooks(books);
        if (books.length > 0) {
          setSelectRecentBook(books[0] as BookItem);
        }
      } catch (error) {
        console.error("Failed to fetch recent books:", error);
      }
    };

    fetchRecentBooks();
  }, [user]);

  useEffect(() => {
    // console.log("Select Recent Book:", selectRecentBook);
    const fetchBookDetail = async () => {
      if (selectRecentBook) {
        try {
          const bookDetail = await BookAPI.getBookDetail(selectRecentBook.bookId);
          console.log("Fetched book detail:", bookDetail);
          setSelectRecentBookDetail(bookDetail);
          // 추가적인 로직이 필요하다면 여기에 작성
        } catch (error) {
          console.error("Failed to fetch book detail:", error);
        }
      }
    };
    fetchBookDetail();
  }, [selectRecentBook]);

  useEffect(() => {
    if (debouncedQuery) {
      // 여기에 실제 검색 API 호출 또는 쿼리 동작을 수행
      console.log("Debounced search query:", debouncedQuery);
      // 예시: await BookAPI.search(debouncedQuery)
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const root = carouselRef.current;
    if (!root) {
      return;
    }

    const obs = new MutationObserver(() => {
      const ae = document.activeElement as HTMLElement | null;
      if (ae && ae.closest('.slick-slide[aria-hidden="true"]')) {
        ae.blur();
        carouselRef.current?.focus();
      }
    });

    obs.observe(root, { subtree: true, attributes: true, attributeFilter: ["aria-hidden", "tabindex"] });
    return () => obs.disconnect();
  }, []);

  const handleScrollToRecentBook = () => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const children = Array.from(slider.children) as HTMLDivElement[];
    const centerX = window.innerWidth / 2;

    let closestChild: HTMLDivElement | null = null;
    let closestDistance = Infinity;

    for (const child of children) {
      const rect = child.getBoundingClientRect();
      const childCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - childCenterX);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestChild = child;
      }
    }

    if (closestChild) {
      const index = children.indexOf(closestChild);
      if (index !== -1) {
        setSelectRecentBook(recentBooks[index] as BookItem);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    console.log("Scrolling to index:", index);
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const child = slider.children[index] as HTMLDivElement;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      console.log("Scrolled to book:", recentBooks[index]);
      setSelectRecentBook(recentBooks[index] as BookItem);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 여기에 Enter 키 입력 시의 동작을 추가할 수 있습니다.
      console.log("Enter key pressed:", searchQuery);
      // 예시: 검색 API 호출
    }
  };

  const renderTopbarRightButton = () => {
    if (user) {
      const handleProfileClick = () => {
        router.push(PATH.SETTINGS.ROOT);
      };
      return (
        <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
          <p className="typo-body1 text-white">{user.nickname}</p>
          <UserCircleSVG className="w-6 h-6 text-white" />
        </div>
      );
    } else {
      const handleLoginClick = () => {
        router.push(PATH.LOGIN.ROOT);
      };
      return (
        <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleLoginClick}>
          <p className="typo-body1 text-white">로그인 / 회원가입</p>
          <UserCircleSVG className="w-6 h-6 text-white" />
        </div>
      );
    }
  };

  const renderFadeCarousel = () => {
    const stripTabIndexFromSlides = () => {
      document.querySelectorAll<HTMLElement>(".slick-slide[tabindex]").forEach((el) => el.removeAttribute("tabindex"));
    };

    const applyInertToHiddenSlides = () => {
      document.querySelectorAll<HTMLElement>(".slick-slide").forEach((el) => {
        const hidden = el.getAttribute("aria-hidden") === "true";
        if (hidden) {
          el.setAttribute("inert", "");
        } else {
          el.removeAttribute("inert");
        }
      });
    };

    const settings = {
      dots: true,
      // fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
      arrows: false,
      accessibility: false, // 키보드 내비 비활성화
      pauseOnHover: false,
      pauseOnFocus: false,
      // slick 콜백들
      onInit: () => {
        stripTabIndexFromSlides();
        applyInertToHiddenSlides();
      },
      onReInit: () => {
        stripTabIndexFromSlides();
        applyInertToHiddenSlides();
      },
      beforeChange: () => {
        // 전환 직전 포커스가 숨겨질 슬라이드 안에 있으면 강제 해제하고 피난처로 이동
        const ae = document.activeElement as HTMLElement | null;
        if (ae && ae.closest(".slick-slide")) {
          ae.blur();
          carouselRef.current?.focus(); // 슬라이더 바깥의 안전한 곳에 포커스 이동
        }
      },
      afterChange: () => {
        // 전환 후에도 다시 정리 (slick가 aria-hidden 업데이트함)
        stripTabIndexFromSlides();
        applyInertToHiddenSlides();
      },
    } as const;

    return (
      <Slider {...settings}>
        {recentBooks.map((book, idx) => (
          <div key={book.bookId}>
            <div
              tabIndex={-1}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} / ${recentBooks.length}`}
              className="w-full h-full flex flex-col gap-2 items-center justify-center bg-secondary"
            >
              <Image
                src={END_POINT.BOOKS.IMAGE(book.isbn)}
                alt={book.title}
                width={128}
                height={192}
                className="w-32 h-48 object-cover rounded"
              />
              <p className="typo-title3 text-white mt-2">{book.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    // NOTE: 이후 PageLayout을 변경할 수 있기 때문에 HomeLayout에서 PageLayout을 사용하지 않고
    // screen.tsx에 PageLayout을 사용하도록 하였습니다.
    <Layout
      pathname="/"
      topbarProps={{
        text: "",
        variant: "icon2",
        leftSVG: <p className="typo-title1 text-white">리드업</p>,
        rightSVG: renderTopbarRightButton(),
      }}
    >
      <section className="flex flex-col w-full h-[calc(100vh-140px)] p-4 gap-4 bg-background overflow-y-auto">
        {/* 검색창 */}
        <div className="flex mt-7 items-center justify-center gap-3.5">
          <TextBox
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* 사용자 안내 */}
        <div className="flex flex-col w-full gap-2 mt-8 typo-title1 text-white">
          {user ? (
            <>
              <p>{user.nickname}님,</p>
              <p>
                오늘도 <span className="text-error">퀴즈에 참여</span>해
              </p>
              <p>
                <span className="text-error">실력을 업그레이드</span> 해보세요!
              </p>
            </>
          ) : (
            <>
              <p>
                <span className="text-error">로그인 후 퀴즈에 참여</span>해
              </p>
              <p>
                <span className="text-error">실력을 업그레이드</span> 해보세요!
              </p>
            </>
          )}
        </div>

        {/* 가장 최근에 읽은 책 */}
        {user && (
          <div className="flex flex-col w-full gap-4 mt-8">
            <p className="typo-title2 text-primary">가장 최근에 읽은 책</p>
            {/* Image slider */}
            <div
              ref={sliderRef}
              onScroll={handleScrollToRecentBook}
              className="flex flex-row gap-12 relative w-full overflow-x-auto px-[calc(50%-4rem)] snap-x snap-mandatory py-8"
            >
              {recentBooks.map((book, index) => (
                <div
                  key={book.bookId}
                  className="relative flex flex-col items-center snap-center shrink-0 w-32"
                  onClick={() => scrollToIndex(index)}
                >
                  {selectRecentBook?.bookId === book.bookId && (
                    <div className="absolute w-40 h-30 top-1/2 -translate-y-1/2 rounded-full bg-primary blur-2xl" />
                  )}
                  <Image
                    src={END_POINT.BOOKS.IMAGE(book.isbn)}
                    alt={book.title}
                    width={128}
                    height={192}
                    className="w-32 h-48 object-cover rounded z-10"
                  />
                </div>
              ))}
            </div>
            {selectRecentBook && (
              <div className="flex flex-col items-center p-4 bg-surface max-w-120 rounded-md self-center relative gap-4 text-white">
                {/* 말풍선 모양 렌더링 위쪽 경계에 이등변 삼각형을 추가 */}
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-surface"
                  style={{
                    clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                  }}
                />

                {/* 책 제목 및 진행률 표시 */}
                <p className="typo-title3">{selectRecentBook.title}</p>
                <div className="flex flex-col w-full items-end gap-2">
                  <p className="typo-footnote">30.00%</p>
                  <LinearProgress value={30} max={100} />
                </div>

                {/* 챕터 진행 현황 */}
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <p className="typo-body2">진행 현황</p>
                    <p className="typo-footnote">{selectRecentBookDetail?.chapterList.length}챕터</p>
                  </div>
                </div>

                <Divider />
              </div>
            )}
          </div>
        )}
        {/* 인기 퀴즈 TOP 5 */}

        {/* 최근 생성된 퀴즈 */}

        {/* 오늘의 랜덤 퀴즈 */}

        {/* 관심 장르 추천 책 */}

        {/* 내가 만든 퀴즈 요약 */}

        {/* 공지 슬라이드 */}
        <div className="flex flex-col w-full gap-8 mt-8 mb-8" ref={carouselRef} tabIndex={-1}>
          <p className="typo-title2 text-primary">공지사항</p>
          {/* 공지사항 슬라이드 컴포넌트 추가 예정 */}
          {recentBooks.length > 0 && renderFadeCarousel()}
        </div>

        {/* 퀴즈 제작 유도 배너 */}
      </section>
    </Layout>
  );
}
