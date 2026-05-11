export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Spartan', 'sans-serif'],
      },
      colors: {
        purple: {
          DEFAULT: '#7C5DFA',
          light: '#9277FF',
        },
        navy: {
          DEFAULT: '#1E2139',
          light: '#252945',
        },
        slate: {
          light: '#DFE3FA',
          DEFAULT: '#888EB0',
          dark: '#7E88C3',
        },
        dark: {
          DEFAULT: '#0C0E16',
          light: '#141625',
        },
        red: {
          DEFAULT: '#EC5757',
          light: '#FF9797',
        },
        green: {
          DEFAULT: '#33D69F',
        },
        orange: {
          DEFAULT: '#FF8F00',
        },
        bg: '#F8F8FB',
      },
    },
  },
  plugins: [],
};
