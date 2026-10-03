import forms from '@tailwindcss/forms'

/** NTC-inspired palette. Change the hex values here to re-theme the whole app. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // New NTC-style tokens
        nt: { blue: '#0b4f9c', dark: '#083b75', red: '#e31e24', sky: '#eaf2fb' },
        // Legacy token names re-pointed to the NTC palette so existing pages pick it up
        'deep-blue': '#083b75',
        'bright-green': '#e31e24',
        'light-blue-text': '#cfe3fa',
        'light-bg': '#f2f7fc',
        charcoal: '#082a52',
        'charcoal-light': '#0b3a70',
        'charcoal-card': '#0e468a',
        'site-orange': '#e31e24',
        'teal-accent': '#0b5fb8',
        'teal-accent-dark': '#084a93',
        'cyan-glow': '#5aa9ee',
        brand: {
          50: '#eef5fc',
          100: '#d9e8f8',
          300: '#7fb2e6',
          400: '#0b4f9c',
          500: '#0a4590',
          600: '#083b75',
          700: '#062f5e',
          800: '#04254b',
        },
        leaf: { 50: '#f0fdf4', 500: '#16a34a', 600: '#15803d' },
        paper: '#f2f7fc',
        ink: { 900: '#13233a', 700: '#44546a', 400: '#7a8aa0' },
      },
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
      boxShadow: { card: '0 1px 2px rgba(8, 59, 117, 0.08), 0 1px 0 rgba(8, 59, 117, 0.05)' },
      borderRadius: { card: '10px' },
    },
  },
  plugins: [forms],
}
