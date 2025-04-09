import Layout from "@/_components/shared/layout";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <Layout pathname="/library">{children}</Layout>;
}
