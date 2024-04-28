import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["Greycliffcf", "sans-serif"],
      },
      colors: {
        darkblue: "#203840",
        darkblueshade: "#2F4248",
        darkbluehover: "#1b424b",
        customGreen: "#8BC53F",
        customDarkGreen: "#6E9D2F",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-right-image": "url('/assets/images/meditation.jpg')",
        "dashboard-top-image": "url('/assets/images/home-top.jpg')",
      },
      backgroundRepeat: {
        "no-repeat": "no-repeat",
      },
      backgroundSize: {
        cover: "cover",
      },
    },
  },
  plugins: [],
};
export default config;
