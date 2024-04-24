/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#2F5637",
        "light-green": "#4D7A4C",
        red: "#D61919",
        yellow: "#F8CA29",
        "dark-grey": "#AEA485",
        "light-grey": "#F5F3EB",
      },
      fontFamily: {
        mcqueen: ["var(--font-mcqueen)"],
        raleway: ["var(--font-raleway)"],
      },
    },
  },
  plugins: [],
};
