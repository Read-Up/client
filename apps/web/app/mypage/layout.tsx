import Layout from "@/_components/shared/layout";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout top={true} bottom={true} pathname="/mypage" topbarText="마이페이지">
      {children}
    </Layout>
  );
}
