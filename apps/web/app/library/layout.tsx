import Layout from "@/_components/shared/layout";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout top={true} bottom={true} pathname="/library" topbarText="">
      {children}
    </Layout>
  );
}
