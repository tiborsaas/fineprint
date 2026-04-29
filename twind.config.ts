import { Options } from "twind";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      colors: {
        cream: "#faf9f7",
        charcoal: "#1a1a1a",
        muted: "#999",
        accent: "#c8a96e",
      },
      letterSpacing: {
        widest: "0.4em",
        wider: "0.25em",
        wide: "0.15em",
      },
    },
  },
} as Options;
