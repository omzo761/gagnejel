/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gagnejel: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          yellow: {
            500: '#f59e0b',
            600: '#d97706',
          },
          orange: {
            500: '#f97316',
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #10b981, #059669)',
        'gradient-secondary': 'linear-gradient(to right, #f59e0b, #f97316)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
