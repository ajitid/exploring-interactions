import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    /*
    you can use `font-[400]` instead rather specifying weights here
    fontWeight: {
      normal: 400,
    },
    */
    fontFamily: {
      sans: ["Manrope", ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      // colors
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".flex-center": {
          "align-items": "center",
          "justify-content": "center",
        },
      });
    }),
  ],
};
