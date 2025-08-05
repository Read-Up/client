import LoginScreen from "./screen";

export default async function Login({ searchParams }: { searchParams: { error?: string; redirect?: string } }) {
  const { error } = await searchParams;

  if (error) {
    console.error("Login error:", error);
  }

  return <LoginScreen />;
}
