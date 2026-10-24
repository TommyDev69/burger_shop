/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app.html', './src/**/*.{js,jsx}', './template-pages/**/*.html'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    container: {
      center: true,
      padding: '15px',
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
      },
    },
    extend: {
      colors: {
        burger: {
          orange: '#fbaf32',
          green: '#719a0a',
          charcoal: '#454545',
          muted: '#757575',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        display: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};