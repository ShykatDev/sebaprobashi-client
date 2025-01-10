/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      zIndex: {
        '100': '100',
      },
      colors: {
        primary: "#000576",
        // background: "#E8E6DE",
        background: "#ffffff",
      },
    },
  },
  plugins: [],
};
