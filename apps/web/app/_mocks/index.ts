const initMocks = async () => {
  if (typeof window === "undefined") {
    // 서버 환경에서 mock 서버 시작
    const { server } = await import("./config/server");
    await server.listen();
  } else {
    // 클라이언트 환경에서 mock worker 시작
    const { worker } = await import("./config/browser");
    await worker.start({
      onUnhandledRequest: "bypass", // 핫리로드 시 요청 무시
    });
  }
};

export default initMocks; // default export 대신 named export로 수정
