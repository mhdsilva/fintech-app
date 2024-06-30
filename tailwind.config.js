/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      primary: {
        DEFAULT: "#8100BD",
        foreground: "#FFFFFF",
      },
      gray: {
        DEFAULT: "#F4F4F4",
        foreground: "#333333",
        700: "#9E9E9E",
      },
      white: {
        DEFAULT: "#FFFFFF",
        foreground: "#333333",
      },
      green: {
        DEFAULT: "#008900",
        foreground: "#FFFFFF",
      },
      red: {
        DEFAULT: "#FF0000",
        foreground: "#FFFFFF",
      },
      black: {
        DEFAULT: "#000000",
        foreground: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
