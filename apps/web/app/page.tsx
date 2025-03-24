'use client';

import { Button } from "@readup/ui/button";
import { TextBox } from "@readup/ui/textbox/default";
import { LinearProgress } from "@readup/ui/progress/linear/default";
import { CircularProgress } from "@readup/ui/progress/circular/default";
import { Modal } from "@readup/ui/modal/default";
// import Image, { type ImageProps } from "next/image";
import React from "react";

// type Props = Omit<ImageProps, "src"> & {
//   srcLight: string;
//   srcDark: string;
// };

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-4xl font-bold text-white w-full">Home</h1>
    </main>
  );
}
