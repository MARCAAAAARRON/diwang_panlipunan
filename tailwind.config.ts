import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        page: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "input-border": "var(--color-input-border)",
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          large: "var(--color-primary-large)",
        },
        accent: "var(--color-accent)",
        highlight: "var(--color-highlight)",
        link: "var(--color-link)",
        error: "var(--color-error)",
        topic: {
          edukasyon: "var(--topic-edukasyon)",
          kalusugan: "var(--topic-kalusugan)",
          ekonomiya: "var(--topic-ekonomiya)",
          karapatan: "var(--topic-karapatan)",
          kapaligiran: "var(--topic-kapaligiran)",
          teknolohiya: "var(--topic-teknolohiya)",
          pamahalaan: "var(--topic-pamahalaan)",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif-4)", "Georgia", "serif"],
        sans: ["var(--font-public-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
      },
      boxShadow: {
        none: "none",
      },
      maxWidth: {
        reading: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
