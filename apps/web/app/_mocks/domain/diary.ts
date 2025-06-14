// import { apiVersion, url } from "@/app/globals";
// import { HttpResponse, http } from "msw";

export const diaryMockups = [
  // // 나의 일기 상세 조회
  // http.get(url + apiVersion + "/diary/my/detail", () => {
  //   return HttpResponse.json({
  //     diaryId: 6,
  //     content: "blah blah",
  //     // webtoonImageUrls: [
  //     //   "/minion1.png",
  //     //   "/minion2.png",
  //     //   "/minion3.png",
  //     //   "/minion4.png",
  //     // ],
  //     webtoonImageUrls: ["", "/minion2.png", "/minion3.png", "/minion4.png"],
  //     bgmUrl:
  //       "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
  //     // bgmUrl: "",
  //     reactionCount: {
  //       like: 0,
  //       surprised: 0,
  //       empathize: 1,
  //       cheering: 0,
  //     },
  //     aiComment: "good good",
  //     emotion: "JOY",
  //     date: "2024-10-17",
  //   });
  // }),
  // // 연월 일기 작성 현황 확인
  // http.get(url + apiVersion + "/diary/my", () => {
  //   return HttpResponse.json({
  //     diaryIndexes: [
  //       {
  //         diaryId: 6,
  //         date: "2024-10-17",
  //       },
  //       {
  //         diaryId: 5,
  //         date: "2024-10-20",
  //       },
  //     ],
  //   });
  // }),
  // // 나의 일기 작성
  // http.post(url + apiVersion + "/diary/my", () => {
  //   return HttpResponse.json({
  //     comment:
  //       "이 편지는 영국으로부터 시작되었다. 100명의 다른사람에게 전달되었다.이 편지는 영국으로부터 시작되었다. 100명의 다른사람에게 전달되었다.이 편지는 영국으로부터 시작되었다. 100명의 다른사람에게 전달되었다.이 편지는 영국으로부터 시작되었다. 100명의 다른사람에게 전달되었다.이 편지는 영국으로부터 시작되었다. 100명의 다른사람에게 전달되었다.",
  //   });
  // }),
  // // 일기장 삭제
  // http.delete(url + apiVersion + "/diary/my/1", () => {
  //   return new HttpResponse("ok", { status: 200 });
  // }),
];
