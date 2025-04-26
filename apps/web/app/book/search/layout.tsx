import Layout from "@/_components/shared/layout";
import { PATH } from "@/_constant/routes";

export default function BookSearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout
      top={false}
      pathname={PATH.BOOK.SEARCH}
      topbarProps={{
        text: "마이페이지",
      }}
    >
      {children}
    </Layout>
  );
}
