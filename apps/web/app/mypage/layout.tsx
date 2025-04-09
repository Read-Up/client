import Layout from "@/_components/shared/layout";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout pathname="/mypage" topbarProps={{
      text: "마이페이지",
    }}>
      {children}
    </Layout>
  );
}
