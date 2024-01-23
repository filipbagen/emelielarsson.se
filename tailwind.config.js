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
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-xl': 'inset 0px 4px 12px 5px rgba(0, 0, 0, 0.20)',
      },
    },
  },
  plugins: [],
};
