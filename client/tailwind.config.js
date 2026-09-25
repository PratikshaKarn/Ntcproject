/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Yeh line sabse zaroori hai
  ],
  theme: {
    extend: {
      // Yeh aapke custom "pro-level" colors hain
      colors: {
        'deep-blue': '#003366',
        'bright-green': '#00CC99',
        'light-blue-text': '#a9d4ff',
        'light-bg': '#f7f9fa',
        'charcoal': '#111317',
        'charcoal-light': '#1b1e24',
        'charcoal-card': '#1f232b',
        'site-orange': '#d5772f',
        'teal-accent': '#14b8a6',
        'teal-accent-dark': '#0f8f86',
        'cyan-glow': '#22d3ee',
        // Admin dashboard palette (ported from ANBuildWork)
        brand: {
          50: '#f8f1fc',
          100: '#eee0f7',
          400: '#71339a',
          500: '#400269',
          600: '#350256',
          700: '#2b0145',
          800: '#210035',
        },
        leaf: {
          50: '#f0fdf4',
          500: '#16a34a',
          600: '#15803d',
        },
        paper: '#f8f8fa',
        ink: {
          900: '#211a22',
          700: '#4b424d',
          400: '#8b828d',
        },
      },
      // Yeh naya font hai
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(64, 2, 105, 0.06), 0 1px 0 rgba(64, 2, 105, 0.04)',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}