// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#FACC15',
        accent: '#10B981',
      },
      fontFamily: {
        signika: ['"Signika Negative"', 'sans-serif']
      }
    },
  },
  plugins: [],
}