import type { Config } from "tailwindcss";

const config = {
  // presets: [require('@readup/ui/tailwind.config')],
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;

export default config;
