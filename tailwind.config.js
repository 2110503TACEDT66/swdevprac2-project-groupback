/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      dropShadow: {
        "border": ["1px 1px 0px #ffffff", "-1px -1px 0px #ffffff", "-1px 1px 0px #ffffff", "1px -1px 0px #ffffff",
                  "0px 1px 0px #ffffff", "0px -1px 0px #ffffff", "-1px 0px 0px #ffffff", "1px 0px 0px #ffffff"]
      }
    },
  },
  plugins: [],
}

