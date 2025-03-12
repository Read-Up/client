import type { Config } from 'tailwindcss';

const config = {
  presets: [require('@repo/ui/tailwind.config')],
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        border: '#EEEEEE',
        primary: {
          DEFAULT: '#016FD8',
          foreground: '#FFFFFF',
        },
      },
      boxShadow: {
        a_red: 'inset 0 -10px #ff6600',
      },
    },
  },
} satisfies Config;

export default config;
