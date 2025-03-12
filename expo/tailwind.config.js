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
      colors: {
        brand: {
          DEFAULT: '#3B82F6',
          background: '#0F172A',
          outline: '#60A5FA',
        },
        neutral: {
          DEFAULT: '#6B21A8',
          background: '#1E1B4B',
          outline: '#A78BFA',
        },
        success: {
          DEFAULT: '#22C55E',
          background: '#DCFCE7',
          outline: '#86EFAC',
        },
        error: {
          DEFAULT: '#DC2626',
          background: '#FEE2E2',
          outline: '#FCA5A5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          background: '#FFF7EB',
          outline: '#FCD34D',
        },
      },
    },
  },
  plugins: [],
};
