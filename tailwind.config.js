/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        scribbly: ['"Spicy Rice"', 'cursive'],
      },
      colors: {
        scribblyYellow: '#FCD997',
        scribblyBrown: '#6F3D1B',
      },
    },
  },
  plugins: [],
};
