/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#3b82f6",
        "secondary-gray": "#6b7280",
        "light-gray": "#f3f4f6",
        "dark-gray": "#1f2937",
        "success-green": "#10b981",
        "error-red": "#ef4444",
      },
    },
  },
  plugins: [],
};
