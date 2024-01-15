/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#E4DACF',
      secondary: '#D3AAAA',
      white: '#ffffff',
      black: '#343434',
    },
    extend: {
      fontFamily: {
        sans: ['"Wix Madefor Text"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
