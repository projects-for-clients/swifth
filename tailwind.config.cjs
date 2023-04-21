/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': '#40AD6B',
        'color-primary-dark': '#338A56',
        'color-primary-dark-2': '#1A452B',
        'color-primary-light': '#8CCEA6',

        'color-green-light': '#40AD6B',
        'color-green-light-1': '#D9EFE1',

        'color-tertiary': '#372768',

        'color-white': '#fff',
        'color-black': '#000',
        'color-dark': '#0c1018bf',
        'color-dark-1': '#0e2043cc',
        'color-dark-2': '#0E2043',
        'color-dark-3': '#182130',

        'color-grey': '#D2D4D8',
        'color-grey-1': '#d2d4d84d',
        'color-grey-2': '#D9EFE1',

        'color-grey-3': '#4B5463',
        'color-grey-4': '#787F8A',

        'color-purple-light': '#9D8DCE',
        'color-purple-light-1': '#EEEBF6',
        'color-purple-light-2': '#DED9EF',
        'color-purple-1': '#5c41ad',
        'color-purple-2': '#7d67bd',
        'color-purple': '#4A348A',

        'color-red-light': '#C7A1A1',
        'color-red-light-1': '#FDE9E9',
        'color-red-light-2': '#FEF4F4',
        'color-red-light-3': '#F9C9C9',

        'color-orange': '#FAC772',
      },
      gridTemplateColumns: {
        '60-auto': '60% auto',
        '1_1.2': '1fr 1.2fr',
        '1_2-1': '1.2fr 1fr',
        'max-auto': 'max-content auto',
      },
    },
    plugins: [process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}],
  },
};
