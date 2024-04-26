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
        sans: ["var(--font-raleway)"],
        mcqueen: ["var(--font-mcqueen)"],
      },
      fontSize: {
        sm: "0.8rem",
        base: ["16px", "1.5rem"],
        xl: ["1.25rem", "1.6rem"],
        "2xl": ["1.563rem", "1.9rem"],
        "3xl": ["1.953rem", "2rem"],
        "4xl": ["2.441rem", "2.441rem"],
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [],
};
