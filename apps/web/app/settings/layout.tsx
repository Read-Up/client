import Layout from "@/_components/shared/layout";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout
      pathname="/settings"
      topbarProps={{
        text: "설정",
      }}
      bottom={false}
      topVariant="icon1"
    >
      {children}
    </Layout>
  );
}
