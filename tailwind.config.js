/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "synthwave",
      "halloween",
      "dim",
      "luxury",
      "night",
      "retro",
      "cyberpunk",
      "valentine",
      "aqua",
    ],
  },
};
