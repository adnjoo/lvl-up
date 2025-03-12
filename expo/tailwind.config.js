/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'spacegrotesk-regular': 'SpaceGrotesk-Regular',
        'spacegrotesk-medium': 'SpaceGrotesk-Medium',
        'spacegrotesk-bold': 'SpaceGrotesk-Bold',
        'manrope-regular': 'Manrope-Regular',
        'manrope-light': 'Manrope-Light',
      },
    },
  },
  plugins: [],
};
