import type { Config } from "tailwindcss";

const config = {
  // presets: [require('@readup/ui/tailwind.config')],
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      fontSize: {
        head1: ["28px", { lineHeight: "140%", fontWeight: "700" }], // bold
        head2: ["24px", { lineHeight: "140%", fontWeight: "700" }],
        title1: ["20px", { lineHeight: "140%", fontWeight: "600" }], // semi
        title2: ["18px", { lineHeight: "140%", fontWeight: "600" }],
        title3: ["16px", { lineHeight: "140%", fontWeight: "500" }], // medium
        body: ["14px", { lineHeight: "140%", fontWeight: "400" }],
        footnote: ["12px", { lineHeight: "140%", fontWeight: "400" }],
      },
    },
  },
} satisfies Config;

export default config;
