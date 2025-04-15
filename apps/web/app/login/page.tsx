"use client";

import { useSearchParams } from "next/navigation";
import LoginScreen from "./screen";
import React from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [error]);

  return <LoginScreen error={showError} />;
}
