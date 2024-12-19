/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        'motion-safe': { 'raw': '(prefers-reduced-motion: no-preference)' },
        'motion-reduce': { 'raw': '(prefers-reduced-motion: reduce)' },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slidein: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slidein: 'slidein 1s ease-in 1s infinite reverse both',
      },
    },
  },
  variants: {
    extend: {
      visibility: ["responsive", "hover", "focus", "group-hover"],
      opacity: ['motion-safe', 'motion-reduce'],
      scale: ['motion-safe', 'motion-reduce'],
      blur: ['motion-safe', 'motion-reduce'],
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["ic", "wi", "meteocons", "svg-spinners", "logos", "bx"]),
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']);
    })
  ],
};
