/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "../../lib1/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Spacing (space, margin, padding)
    { pattern: /m-(\d|auto)/ },
    { pattern: /p-(\d|auto)/ },
    { pattern: /mt-(\d)/ },
    { pattern: /pt-(\d)/ },
    { pattern: /mr-(\d)/ },
    { pattern: /pr-(\d)/ },
    { pattern: /mb-(\d)/ },
    { pattern: /pb-(\d)/ },
    { pattern: /ml-(\d)/ },
    { pattern: /pl-(\d)/ },
    { pattern: /mx-(\d)/ },
    { pattern: /px-(\d)/ },
    { pattern: /my-(\d)/ },
    { pattern: /py-(\d)/ },

    // Colors
    { pattern: /text-(\w+(-\d{1,3})?)/ },
    { pattern: /bg-(\w+(-\d{1,3})?)/ },

    // Borders and shadows
    { pattern: /border-(\d)/ },
    { pattern: /rounded-(sm|md|lg|full)/ },
    { pattern: /shadow-(sm|md|lg|xl|2xl|inner)/ },

    // Responsive prefixes
    { pattern: /(sm|md|lg|xl|2xl):.+/ },
  ],
}