import NextHead from "next/head";

export const Head = () => {
  return (
    <NextHead>
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
      />
    </NextHead>
  );
};
