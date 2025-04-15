/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '200': '200% 200%',
      },
      animation: {
        rainbow: 'rainbowShift 1s linear infinite',
        slideDown: 'slideDown 0.3s ease-out',
      },

      keyframes: {
        rainbowShift: {
          '100%': { backgroundPosition: '100% 50%' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-5px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
