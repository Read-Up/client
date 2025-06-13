"use client";
import { useEffect } from "react";
import HomeScreen from "./screen";
import initMocks from "./mocks";

export default function Home() {
  useEffect(() => {
    initMocks();
  }, []);
  return <HomeScreen />;
}
