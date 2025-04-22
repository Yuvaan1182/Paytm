/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'ping-once': 'ping-once 0.6s ease-out forwards',
      },
      keyframes: {
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
