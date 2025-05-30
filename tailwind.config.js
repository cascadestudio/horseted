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
        current: "currentColor",
        "dark-green": "#2F5637",
        "light-green": "#4D7A4C",
        "lighter-green": "#EAF3E8",
        red: "#D61919",
        "light-red": "#F9EEEE",
        yellow: "#F8CA29",
        "darker-grey": "#5C5955",
        "dark-yellow": "#D4AB19",
        "light-yellow": "#FFDD2B",
        "lighter-yellow": "#FDF6DF",
        "dark-grey": "#AEA485",
        grey: "#ADA89F",
        "medium-grey": "#5C5955",
        "light-grey": "#F5F3EB",
        "lighter-grey": "#CCC9C0",
        "pale-grey": "#E7E5DC",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "sans-serif"],
        mcqueen: ["var(--font-mcqueen)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      fontSize: {
        sm: ["14px", "16px"],
        base: ["16px", "1.5rem"],
        xl: ["1.25rem", "1.5rem"],
        "2xl": ["1.625rem", "2rem"],
        "3xl": ["2rem", "2.25rem"],
        "4xl": ["2.375rem", "2.625rem"],
        "5xl": ["48px", "48px"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
