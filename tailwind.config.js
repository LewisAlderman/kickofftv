module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...require('tailwindcss/colors')
      },
      spacing: {
        "safe-top": "calc(env(safe-area-inset-top) + 0.5rem)",
        "safe-bottom": "calc(env(safe-area-inset-bottom) + 0.5rem)",
        "safe-left": "calc(env(safe-area-inset-left) + 0.5rem)",
        "safe-right": "calc(env(safe-area-inset-right) + 0.5rem)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    ...(process.env.NODE_ENV === 'development' 
      ? [require('tailwindcss-debug-screens')] : [])
  ],
}
