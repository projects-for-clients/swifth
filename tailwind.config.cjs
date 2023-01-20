/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': '#40AD6B',
        'color-primary-dark': '#338A56',

        'color-tertiary': '#372768',

        'color-white': '#fff',
        'color-black': '#000',
        'color-dark': '#0c1018bf',

        'color-grey': '#D2D4D8',
        'color-grey-1': '#d2d4d84d',
        'color-grey-2': '#D9EFE1',
        'color-grey-3': '#4B5463',

        'color-purple-light': '#9D8DCE',
        'color-purple-light-1': '#EEEBF6',
        'color-purple': '#4A348A',

        'color-red-light': '#C7A1A1',
        'color-red-light-1': '#FDE9E9',
      },
    },
    plugins: [],
  },
};
