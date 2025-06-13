// import { apiVersion, url } from "@/app/globals";
// import { HttpResponse, http } from "msw";

// 목업 데이터 생성을 위한 헬퍼 함수
// const createMockDiary = (id: number) => ({
//   publicDiaryId: id,
//   diaryId: id + 8,
//   characterImageUrl: "/minion1.png",
//   nickname: "todak",
//   publicContent: "blah blah",
//   webtoonImageUrls: ["/minion1.png", "/minion2.png", "/minion3.png", "/minion4.png"],
//   bgmUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
//   createdDate: "2024-09-21",
//   reactionCount: {
//     like: 0,
//     surprised: 0,
//     empathize: 1,
//     cheering: 0,
//   },
//   myReaction: ["like", "cheering"],
// });

export const feedMockups = [
  // 일기장 불러오기 (무한 스크롤)
  // http.get(url + apiVersion + "/diary/public", () => {
  //   return HttpResponse.json({
  //     diaries: [5, 4, 3, 2, 1].map(createMockDiary),
  //     after: 1,
  //     isEnd: false,
  //   });
  // }),
  // // 일기장 반응 이벤트
  // http.post(url + apiVersion + "/diary/public/reaction", () => {
  //   return new HttpResponse(null, { status: 204 });
  // }),
  // // 일기장 공개 업로드
  // http.post(url + apiVersion + "/diary/public", () => {
  //   return new HttpResponse("created", { status: 201 });
  // }),
  // // 공개 일기장 삭제
  // http.delete(url + apiVersion + "/diary/public", () => {
  //   return new HttpResponse(null, { status: 204 });
  // }),
  // // 나의 공개 일기 불러오기(무한 스크롤)
  // http.get(url + apiVersion + "/diary/my/shared", () => {
  //   return HttpResponse.json({
  //     sharedDiaries: [
  //       {
  //         publicDiaryId: 13, // public diary,
  //         webtoonImageUrl: "/minion2.png", // diary
  //         createdDate: "2024-09-21", // public diary
  //       },
  //       {
  //         publicDiaryId: 12, // public diary,
  //         webtoonImageUrl: "/minion3.png", // diary
  //         createdDate: "2024-09-20", // public diary
  //       },
  //       {
  //         publicDiaryId: 11, // public diary,
  //         webtoonImageUrl: "/minion4.png", // diary
  //         createdDate: "2024-09-19", // public diary
  //       },
  //       {
  //         publicDiaryId: 10, // public diary,
  //         webtoonImageUrl: "/minion4.png", // diary
  //         createdDate: "2024-09-19", // public diary
  //       },
  //       {
  //         publicDiaryId: 9, // public diary,
  //         webtoonImageUrl: "/minion4.png", // diary
  //         createdDate: "2024-09-19", // public diary
  //       },
  //       {
  //         publicDiaryId: 8, // public diary,
  //         webtoonImageUrl: "/minion4.png", // diary
  //         createdDate: "2024-09-19", // public diary
  //       },
  //     ], // 총 12개 데이터 전달
  //     after: 8,
  //   });
  // }),
  // // 나의 공개 일기 상세 조회
  // http.get(url + apiVersion + "/diary/my/shared/detail", () => {
  //   return HttpResponse.json({
  //     publicDiaryId: 3, // public diary
  //     webtoonImageUrls: [
  //       "/minion1.png",
  //       "/minion2.png",
  //       "/minion3.png",
  //       "/minion4.png",
  //     ],
  //     publicContent: "this is public String content", // public diary
  //     bgmUrl:
  //       "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
  //     reactionCount: {
  //       // reaction
  //       like: 4,
  //       surprised: 3,
  //       empathize: 3,
  //       cheering: 6,
  //     },
  //     myReaction: ["like", "cheering"], // reaction
  //     diaryCreatedDate: "2024-10-31", // diary
  //   });
  // }),
];
