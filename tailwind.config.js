/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'selector',
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      fontFamily: {
        sourGummy: ['Sour Gummy', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'],
         // 'cursive' fallback in case the font doesn't load
      },
      boxShadow: {
        'custom': '-4.5px 5.5px var(--color-text)',  // Custom shadow definition
      }
    },
  },
  plugins: [],
}

