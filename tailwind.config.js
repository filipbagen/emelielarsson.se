/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#E4DACF',
      secondary: '#D3AAAA',
      white: '#ffffff',
      black: '#343434',

      primaryDark: '#1f1f1f',
      secondaryDark: '#181818',
    },
    extend: {
      fontFamily: {
        sans: ['"Wix Madefor Text"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 0px 0px 8px 3px rgba(0, 0, 0, 0.10)',
      },
      filter: {
        none: 'none',
      },
    },
  },
  plugins: [],
};
