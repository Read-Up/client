import { Suspense } from "react";
import BookAddCompleteScreen from "./screen";

export default function BookAddCompletePage() {
  return (
    <Suspense fallback={<div className="text-white flex items-center justify-center h-screen">Loading...</div>}>
      <BookAddCompleteScreen />
    </Suspense>
  );
}
